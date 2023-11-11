from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
)
from pets.models import *
from ..serializers.pet_serializers import *
from accounts.models import ShelterUser
from rest_framework import permissions
from django.db.models import Q
from rest_framework.pagination import LimitOffsetPagination


class IsShelterLoggedIn(permissions.BasePermission):
    def has_permission(self, request, view):
        shelter_user = get_object_or_404(ShelterUser, id=view.kwargs["shelter_id"])
        if request.user.id == shelter_user.id:
            return True
        return False


class IsPetInShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        pet = get_object_or_404(Pet, id=view.kwargs["pet_id"])
        if request.user.id == pet.shelter.id:
            return True
        return False


class ShelterPetsListCreate(ListCreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelterLoggedIn]
    pagination_class = LimitOffsetPagination

    def perform_create(self, serializer):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs["shelter_id"])
        serializer.save(shelter=shelter)

    def get_queryset(self):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs["shelter_id"])
        queryset = Pet.objects.all().filter(shelter=shelter)
        params = self.request.GET

        query = params.get("search")
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query)
                | Q(description__icontains=query)
                | Q(medical_history__icontains=query)
                | Q(special_requirements__icontains=query)
                | Q(behaviour__icontains=query)
            )

        query = params.getlist("status")
        if query != []:
            queryset = queryset.filter(status__in=query)
        else:
            queryset = queryset.filter(status="AV")

        query = params.getlist("type")
        if query != []:
            queryset = queryset.filter(status__in=query)

        query = params.getlist("breed")
        if query != []:
            queryset = queryset.filter(status__in=query)

        query = params.getlist("age")
        if query != []:
            queryset = queryset.filter(status__in=query)

        sort = params.get("sort", "name")
        desc = params.get("desc")
        if desc:
            sort = "-" + sort

        return queryset.order_by(sort)


class ShelterPetsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsShelterLoggedIn,
        IsPetInShelter,
    ]

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs["pet_id"])


class UserPetsList(ListAPIView):
    serializer_class = PetSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = Pet.objects.all()
        params = self.request.GET

        query = params.get("search")
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query)
                | Q(description__icontains=query)
                | Q(medical_history__icontains=query)
                | Q(special_requirements__icontains=query)
                | Q(behaviour__icontains=query)
            )

        query = params.getlist("status")
        if query != []:
            queryset = queryset.filter(status__in=query)
        else:
            queryset = queryset.filter(status="AV")

        query = params.getlist("shelter")
        if query != []:
            queryset = queryset.filter(status__in=query)

        query = params.getlist("type")
        if query != []:
            queryset = queryset.filter(status__in=query)

        query = params.getlist("breed")
        if query != []:
            queryset = queryset.filter(status__in=query)

        query = params.getlist("age")
        if query != []:
            queryset = queryset.filter(status__in=query)

        sort = params.get("sort")
        desc = params.get("desc")
        if sort and desc:
            sort = "-" + sort
        elif desc:
            sort = "-name"
        elif not sort:
            sort = "name"
        return queryset.order_by(sort)


class UserPetsRetrieve(RetrieveAPIView):
    serializer_class = PetSerializer

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs["pet_id"])
