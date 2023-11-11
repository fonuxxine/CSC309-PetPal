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

class ShelterCreateView(CreateAPIView):
    serializer_class = ShelterCreateSerializer

class ShelterUpdateView(UpdateAPIView):
    serializer_class = ShelterUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, ShelterUserPermissions]

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class ShelterListView(ListAPIView):
    serializer_class = ShelterUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ShelterUser.objects.all()

class ShelterGetView(RetrieveAPIView):
    serializer_class = ShelterGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])

class ShelterDeleteView(DestroyAPIView):
    serializer_class = ShelterSerializer
    permission_classes = [permissions.IsAuthenticated, ShelterUserPermissions]

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])


class PetUserPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        pet_user = get_object_or_404(PetUser, id=view.kwargs['pet_user_id'])
        if request.user.username == pet_user.username:
            return True
        return False

class PetUserCreateView(CreateAPIView):
    serializer_class = PetUserCreateSerializer

class PetUserUpdateView(UpdateAPIView):
    serializer_class = PetUserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, PetUserPermissions]

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class PetProfilePermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        pet_seeker = get_object_or_404(PetUser, id=view.kwargs['pet_user_id'])

        shelter_user = request.user

        all_applications = shelter_user.applications_set.all()

        if shelter_user.applications_set.filter(status=='pending', pet_seeker.id==applicant) or shelter_user.applications_set.filter(status=='Pending', pet_seeker.id==applicant):
            return True

        return False

class PetUserGetView(RetrieveAPIView):
    serializer_class = PetUserGetSerializer
    permission_classes = [permissions.IsAuthenticated, PetProfilePermissions]

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])

class PetUserDeleteView(DestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated, PetUserPermissions]

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])