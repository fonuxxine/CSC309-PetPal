from django.utils import timezone
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveAPIView, get_object_or_404, \
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission, IsAuthenticated
from accounts.models import ShelterUser, PetUser, CustomUser
from pets.models import Applications, Pet, ApplicationComment
from pets.serializers.application_serializers import ApplicationSerializer, ApplicationUpdateSerializer


class ApplicationPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        shelter = obj.pet_listing.shelter
        applicant = obj.applicant
        if request.user.username == shelter.username or request.user.username == applicant.username:
            return True
        return False


class ApplicationCreateListView(ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated, ApplicationPermission]
    pagination_class = PageNumberPagination
    queryset = Applications.objects.all()

    def perform_create(self, serializer):
        pet_listing = serializer.validated_data['pet_listing']
        pet_seeker = PetUser.objects.filter(username=self.request.user.username)
        if pet_seeker:
            if pet_listing.status == 'AV':
                serializer.save(applicant=pet_seeker[0])

    def get_queryset(self):
        shelter = ShelterUser.objects.filter(username=self.request.user.username)
        if shelter:
            pet_listing = Pet.objects.filter(shelter=shelter[0])
            return (Applications.objects.filter(pet_listing__in=pet_listing).order_by('creation_time')
                    .order_by('last_modified'))
        else:
            pet_seeker = PetUser.objects.filter(username=self.request.user.username)[0]
            return (Applications.objects.filter(applicant=pet_seeker).order_by('creation_time')
                    .order_by('last_modified'))


class ApplicationGetUpdateView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, ApplicationPermission]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ApplicationUpdateSerializer
        return ApplicationSerializer

    def perform_update(self, serializer):
        shelter = ShelterUser.objects.filter(username=self.request.user.username)
        current_shelter = serializer.instance.pet_listing.shelter
        if current_shelter.username == shelter.username:
            if serializer.instance.status == 'pending' and serializer.validated_data['status'] in ['accepted',
                                                                                                   'denied']:
                serializer.save(status=serializer.validated_data['status'], last_modified=timezone.now())
        else:
            if (serializer.instance.status in ['pending', 'accepted'] and
                    serializer.validated_data.get('status') == 'withdrawn'):
                serializer.save(status=serializer.validated_data['status'], last_modified=timezone.now())
        comment = ApplicationComment.objects.filter(application=serializer.instance).order_by('-time_created')
        if comment:
            latest = comment[0]
            if latest.time_created > serializer.instance.last_modified:
                serializer.save(last_modified=latest.time_created)

    def get_object(self):
        return get_object_or_404(Applications, id=self.kwargs['pk'])
