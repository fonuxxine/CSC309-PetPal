from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

class ShelterCreateSerializer(ModelSerializer):

    password = serializers.CharField(style={'input_type': 'password'})
    repeat_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = ShelterUser
        fields = ['username', 'password', 'repeat_password', 'email', 'shelter_name', 'mission_statement']


class PetUserCreateSerializer(ModelSerializer):

    password = serializers.CharField(style={'input_type': 'password'})
    repeat_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = PetUser
        fields = ['username', 'password', 'repeat_password', 'email', 'name', 'surname']


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