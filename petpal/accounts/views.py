from django.shortcuts import render
from accounts.models import ShelterUser, PetUser
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from . serializers import ShelterCreateSerializer, PetUserCreateSerializer, ShelterUpdateSerializer, PetUserUpdateSerializer, ShelterGetSerializer, PetUserGetSerializer
from rest_framework import authentication, permissions
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class ShelterUserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        shelter_user = get_object_or_404(ShelterUser, id=view.kwargs['shelter_id'])
        if request.user.username == shelter_user.username:
            return True
        return False


class ShelterListCreateView(ListCreateAPIView):
    serializer_class = ShelterCreateSerializer

    def perform_create(self, serializer):
        p1 = serializer.validated_data.get('password')
        p2 = serializer.validated_data.get('repeat_password')

        if p1 != p2:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        else:
            p2 = serializer.validated_data.pop('repeat_password')
            serializer.validated_data['password'] = make_password(serializer.validated_data.get('password'))
            serializer.save()
    
    def get_queryset(self):
        return ShelterUser.objects.all()


class ShelterGetView(RetrieveAPIView):
    serializer_class = ShelterGetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])


class ShelterUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = ShelterUpdateSerializer
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

    def perform_create(self, serializer):
        p1 = serializer.validated_data.get('password')
        p2 = serializer.validated_data.get('repeat_password')

        if p1 != p2:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        else:
            p2 = serializer.validated_data.pop('repeat_password')
            serializer.validated_data['password'] = make_password(serializer.validated_data.get('password'))
            serializer.save()


class PetProfilePermissions(permissions.BasePermission):
    # a shelter can only see the profile of a pet seeker if the pet seeker has an active application for one of the shelter's pets

    def has_permission(self, request, view):
        # get the pet seeker you want to find applications for
        pet_seeker = get_object_or_404(PetUser, id=view.kwargs['pet_user_id'])

        # if the request user is a shelter
        if isinstance(request.user, ShelterUser):
            shelter_user = request.user

            # get all the applications associated with pet seeker
            all_applications = pet_seeker.applications_set.filter(pet_seeker.id==applicant)

            # get all the pets associated with the request shelter
            all_pets = shelter_user.pet_set.all()

            # go through every application associated with the pet seeker
            for application in all_applications:
                # go through every pet associated with the requesting shelter
                for pet in all_pets:
                    # if the pet in the shelter is the same as the one on the application and status is active, return True
                    if pet.id == application.pet_listing and (application.status=='pending' or application.status=='Pending'):
                        return True

        return False


class PetUserGetView(RetrieveAPIView):
    serializer_class = PetUserGetSerializer
    permission_classes = [permissions.IsAuthenticated, PetProfilePermissions]

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])


class PetUserDestoryUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = PetUserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, PetUserPermissions]

    def get_object(self):
        return get_object_or_404(PetUser, id=self.kwargs['pet_user_id'])