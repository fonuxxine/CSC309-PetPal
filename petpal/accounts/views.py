from django.shortcuts import render
from accounts.models import ShelterUser, PetUser
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, get_object_or_404
from . serializers import ShelterCreateSerializer, PetUserCreateSerializer, ShelterUpdateSerializer, PetUserUpdateSerializer

# Create your views here.
class ShelterCreateView(CreateAPIView):
    serializer_class = ShelterCreateSerializer

class PetUserCreateView(CreateAPIView):
    serializer_class = PetUserCreateSerializer

class ShelterUpdateView(UpdateAPIView):
    serializer_class = ShelterUpdateSerializer

    #     * Requires get_object method
    # also make sure only that shelter can edit their own information

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class PetUserUpdateView(UpdateAPIView):
    serializer_class = PetUserUpdateSerializer

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class ShelterListView(ListAPIView):
    serializer_class = ShelterUpdateSerializer

    def get_queryset(self):
        return ShelterUser.objects.all()