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
        pet_seeker = get_object_or_404(PetUser, id=view.kwargs['pet_user_id'])

        if ShelterUser.objects.filter(username=request.user.username).exists() == True:
            shelter_user = ShelterUser.objects.filter(username=request.user.username)[0]

            all_applications = pet_seeker.applications_set.all()

            for application in all_applications:
                if application.pet_listing.shelter.username == shelter_user.username and (application.status == 'pending' or application.status == 'Pending'):
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