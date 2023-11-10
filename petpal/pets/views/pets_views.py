from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from pets.models import *
from ..serializers.pet_serializers import *
from accounts.models import ShelterUser

class ShelterPetsList(ListAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])
        queryset = Pet.objects.all().filter(shelter=shelter)
        status = self.request.query_params.get("status")
        type = self.request.query_params.get("type")
        breed = self.request.query_params.get("breed")
        age = self.request.query_params.get("age")

        if type is not None:
            queryset = queryset.filter(type=type)
        if breed is not None:
            queryset = queryset.filter(breed=breed)
        if status is not None:
            queryset = queryset.filter(status=status)
        if age is not None:
            queryset = queryset.filter(age=age)
        return queryset

class ShelterPetsCreate(CreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs['shelter_id'])
        serializer.save(shelter=shelter)

class ShelterPetsRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs['pet_id'])

class UserPetsList(ListAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        queryset = Pet.objects.all()
        status = self.request.query_params.get("status")
        shelter = self.request.query_params.get("shelter")
        type = self.request.query_params.get("type")
        breed = self.request.query_params.get("breed")
        age = self.request.query_params.get("age")
        sort = self.request.query_params.get("sort")

        if sort == '' or sort is None:
            sort = "name"
        
        if shelter is not None:
            queryset = queryset.filter(shelter=shelter)
        if status is not None:
            queryset = queryset.filter(status=status)
        if type is not None:
            queryset = queryset.filter(type=type)
        if breed is not None:
            queryset = queryset.filter(breed=breed)
        if age is not None:
            queryset = queryset.filter(age=age)
        return queryset.order_by(sort)


class UserPetsRetrieve(RetrieveAPIView):
    serializer_class = PetSerializer

    def get_object(self):
        return get_object_or_404(Pet, id=self.kwargs['pet_id'])
