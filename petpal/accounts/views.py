from django.shortcuts import render
from accounts.models import ShelterUser, PetUser
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from . serializers import ShelterCreateSerializer, PetUserCreateSerializer, ShelterUpdateSerializer, PetUserUpdateSerializer, ShelterGetSerializer, PetUserGetSerializer, ShelterSerializer, PetSerializer

# Create your views here.
# TO DO: can combine some views - maybe
class ShelterCreateView(CreateAPIView):
    serializer_class = ShelterCreateSerializer
    # add validation and perform_create?

class PetUserCreateView(CreateAPIView):
    serializer_class = PetUserCreateSerializer
    # add validation and perform_create?

class ShelterUpdateView(UpdateAPIView):
    serializer_class = ShelterUpdateSerializer

    # requires get_object method
    # TO DO: add permissions to make sure only that shelter can edit their own information and logged in 

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class PetUserUpdateView(UpdateAPIView):
    serializer_class = PetUserUpdateSerializer

    # TO DO: add permissions to make sure only logged in and that pet user can update info

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class ShelterListView(ListAPIView):
    serializer_class = ShelterUpdateSerializer

    # TO DO: add permissions for logged in users

    def get_queryset(self):
        return ShelterUser.objects.all()

# get - any user (shelter or seeker) can see the profile of a shelter
# get - shelters can only view pet seeker's profile if they have
# an active application with the shelter

class ShelterGetView(RetrieveAPIView):
    serializer_class = ShelterGetSerializer

    # add permissions for logged in users

    # requires get_object method
    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])


class PetUserGetView(RetrieveAPIView):
    serializer_class = PetUserGetSerializer

    # add permissions where only logged in shelters can view pet seeker profile if they have an active application

    # requires get_object method
    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class ShelterDeleteView(DestroyAPIView):
    serializer_class = ShelterSerializer

    #  requires get_object method

    # add permission where only that shelter can delete their own account
    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class PetUserDeleteView(DestroyAPIView):
    serializer_class = PetSerializer

    # requires get_object method

    # add permission where only that pet seeker user can delete their own account
    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])