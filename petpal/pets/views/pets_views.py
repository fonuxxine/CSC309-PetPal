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
from rest_framework.pagination import PageNumberPagination

class PetsResultsPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 9

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
    pagination_class = PetsResultsPagination

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
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(status__in=querylist)
        else:
            queryset = queryset.filter(status="AV")

        query = params.getlist("type")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(type__in=querylist)

        query = params.getlist("breed")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(breed__in=querylist)

        query = params.getlist("age")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(age__in=querylist)

        query = params.getlist("sort")
        if query != []:
            sortList = []
            for q in query:
                sortList = sortList + list(q.split(","))
        else:
            sortList = ["name"]

        query = params.getlist("order")
        if query != []:
            orderList = []
            for q in query:
                orderList = orderList + list(q.split(","))
            for i in range(min(len(orderList), len(sortList))):
                if orderList[i] == "DESC":
                    sortList[i] = "-" + sortList[i]

        return queryset.order_by(*sortList)


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
    pagination_class = PetsResultsPagination

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
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(status__in=querylist)
        else:
            queryset = queryset.filter(status="AV")

        query = params.getlist("shelter")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            shelterList = []
            for name in querylist:
                shelters = ShelterUser.objects.all().filter(
                    Q(shelter_name=name) | Q(username=name)
                )
                for shelter in shelters:
                    shelterList.append(shelter)
            queryset = queryset.filter(shelter__in=shelterList)

        query = params.getlist("type")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(type__in=querylist)

        query = params.getlist("breed")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(breed__in=querylist)

        query = params.getlist("age")
        if query != []:
            querylist = []
            for q in query:
                querylist = querylist + list(q.split(","))
            queryset = queryset.filter(age__in=querylist)

        query = params.getlist("sort")
        if query != []:
            sortList = []
            for q in query:
                sortList = sortList + list(q.split(","))
        else:
            sortList = ["name"]

        query = params.getlist("order")
        if query != []:
            orderList = []
            for q in query:
                orderList = orderList + list(q.split(","))
            for i in range(min(len(orderList), len(sortList))):
                if orderList[i] == "DESC":
                    sortList[i] = "-" + sortList[i]

        return queryset.order_by(*sortList)


class UserPetsRetrieve(RetrieveAPIView):
    serializer_class = PetSerializer

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs["pet_id"])
