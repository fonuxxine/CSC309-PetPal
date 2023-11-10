from django.shortcuts import render
from accounts.models import ShelterUser, PetUser
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from . serializers import ShelterCreateSerializer, PetUserCreateSerializer, ShelterUpdateSerializer, PetUserUpdateSerializer, ShelterGetSerializer, PetUserGetSerializer, ShelterSerializer, PetSerializer
from rest_framework import authentication, permissions

class ShelterUserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        shelter_user = get_object_or_404(ShelterUser, id=view.kwargs['shelter_id'])
        if request.user.username == shelter_user.username:
            return True
        return False

class PetUserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        pet_user = get_object_or_404(PetUser, id=view.kwargs['pet_user_id'])
        if request.user.username == pet_user.username:
            return True
        return False

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
    permission_classes = [permissions.IsAuthenticated, ShelterUserPermissions]

    # requires get_object method
    # TO DO: add permissions to make sure only that shelter can edit their own information and logged in 

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class PetUserUpdateView(UpdateAPIView):
    serializer_class = PetUserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, PetUserPermissions]

    # TO DO: add permissions to make sure only logged in and that pet user can update info

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class ShelterListView(ListAPIView):
    serializer_class = ShelterUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    # is authentification for this needed?

    # TO DO: add permissions for logged in users

    def get_queryset(self):
        return ShelterUser.objects.all()

# get - any user (shelter or seeker) can see the profile of a shelter
# get - shelters can only view pet seeker's profile if they have
# an active application with the shelter

class ShelterGetView(RetrieveAPIView):
    serializer_class = ShelterGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    # add permissions for logged in users

    # requires get_object method
    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])


class PetUserGetView(RetrieveAPIView):
    serializer_class = PetUserGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    # add more authentification

    # add permissions where only logged in shelters can view pet seeker profile if they have an active application

    # requires get_object method
    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class ShelterDeleteView(DestroyAPIView):
    serializer_class = ShelterSerializer
    permission_classes = [permissions.IsAuthenticated, ShelterUserPermissions]
    # problem with deleting - able to delete even though i'm not the user

    #  requires get_object method

    # add permission where only that shelter can delete their own account
    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class PetUserDeleteView(DestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated, PetUserPermissions]
    # there's a problem with deleting - able to delete even though i'm not the user

    # requires get_object method

    # add permission where only that pet seeker user can delete their own account
    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])