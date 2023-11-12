from django.utils import timezone
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveAPIView, get_object_or_404, \
    ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission, IsAuthenticated

from accounts.models import ShelterUser, PetUser
from pets.models import Applications, Pet
from pets.serializers.application_serializers import ApplicationSerializer


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


class ApplicationCreateListView(ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, ShelterPermission]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        pet_listing = serializer.validated_data['pet_listing']
        if pet_listing.status == 'available':
            serializer.save(applicant=self.request.user)

    def get_queryset(self):
        if isinstance(self.request.user, ShelterUser):
            pet_listing = Pet.objects.filter(shelter=self.request.user)
            return (Applications.objects.filter(pet_listing=pet_listing).order_by('creation_time')
                    .order_by('last_modified'))
        else:
            return (Applications.objects.filter(applicant=self.request.user).order_by('creation_time')
                    .order_by('last_modified'))


class ApplicationGetUpdateView(RetrieveUpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, ShelterPermission, PetUserPermission]

    def perform_update(self, serializer):
        if isinstance(self.request.user, ShelterUser):
            if serializer.instance.status == 'pending' and serializer.validated_data['status'] in ['accepted',
                                                                                                   'denied']:
                serializer.save(status=serializer.validated_data['status'], last_modified=timezone.now())
        else:
            if (serializer.instance.status in ['pending', 'accepted'] and
                    serializer.validated_data['status'] == 'withdrawn'):
                serializer.save(status=serializer.validated_data['status'], last_modified=timezone.now())

    def get_object(self):
        return get_object_or_404(Applications, id=self.kwargs['pk'])

