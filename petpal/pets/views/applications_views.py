from django.utils import timezone
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission, IsAuthenticated

from petpal.accounts.models import ShelterUser, PetUser
from petpal.pets.models import Applications, Pet
from petpal.pets.serializers.application_serializers import ApplicationSerializer, ApplicationCreateSerializer, \
    ApplicationUpdateSerializer


class ShelterPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(request.user, ShelterUser):
            return request.user == obj.pet_listing.shelter
        else:
            return False


class PetUserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(request.user, PetUser):
            return request.user == obj.applicant
        else:
            return False


class ApplicationCreateView(CreateAPIView):
    serializer_class = ApplicationCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        pet_listing = serializer.validated_data['pet_listing']
        if pet_listing.status == 'available':
            serializer.save(applicant=self.request.user)


class ApplicationUpdateView(UpdateAPIView):
    serializer_class = ApplicationUpdateSerializer
    permission_classes = [IsAuthenticated, ShelterPermission, PetUserPermission]

    def perform_update(self, serializer):
        if isinstance(self.request.user, ShelterUser):
            if serializer.instance.status == 'pending' and serializer.validated_data['status'] in ['accepted', 'denied']:
                serializer.instance.status = serializer.validated_data['status']
                serializer.instance.last_modified = timezone.now()
                serializer.save()
        else:
            if (serializer.instance.status in ['pending', 'accepted'] and
                    serializer.validated_data['status'] == 'withdrawn'):
                serializer.instance.status = serializer.validated_data['status']
                serializer.instance.last_modified = timezone.now()
                serializer.save()


class ApplicationListView(ListAPIView):
    serializer_class = ApplicationUpdateSerializer
    permission_classes = [IsAuthenticated, ShelterPermission, PetUserPermission]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        if isinstance(self.request.user, ShelterUser):
            pet_listing = Pet.objects.filter(shelter=self.request.user)
            return (Applications.objects.filter(pet_listing=pet_listing).order_by('creation_time')
                    .order_by('last_modified'))
        else:
            return (Applications.objects.filter(applicant=self.request.user).order_by('creation_time')
                    .order_by('last_modified'))
