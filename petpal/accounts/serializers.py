from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

# might need more than one serializer if you need different fields for different views
# TO DO: combine serializers/remove some serializers bc i don't need this much

class ShelterCreateSerializer(ModelSerializer):
    class Meta:
        model = ShelterUser
        fields = ['username', 'password', 'email', 'shelter_name', 'mission_statement']

    def validate_password(self, value):
        return make_password(value)


class PetUserCreateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'password', 'email', 'name', 'surname']

    def validate_password(self, value: str) -> str:
        return make_password(value)


class ShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = ShelterUser
        fields = ['username', 'password', 'email', 'shelter_name', 'mission_statement', 'location', 'profile_pic']

    def validate_password(self, value: str) -> str:
        return make_password(value)


class PetUserUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'password', 'email', 'name', 'surname', 'location', 'profile_pic']
    
    def validate_password(self, value: str) -> str:
        return make_password(value)


class ShelterGetSerializer(ModelSerializer):
    class Meta:
        model = ShelterUser
        fields = ['shelter_name', 'email', 'mission_statement', 'location', 'profile_pic']


class PetUserGetSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'name', 'surname', 'email', 'location', 'profile_pic']


class ShelterSerializer(ModelSerializer):
    class Meta:
        model = ShelterUser
        fields = '__all__'


class PetSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = '__all__'