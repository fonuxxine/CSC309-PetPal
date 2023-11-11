from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

# might need more than one serializer if you need different fields for different views
# TO DO: combine serializers/remove some serializers bc i don't need this much

class ShelterCreateSerializer(ModelSerializer):

    # repeat_password = serializers.CharField(max_length=120, read_only=True)

    class Meta:
        model = ShelterUser
        
        fields = ['username', 'password', 'email', 'shelter_name', 'mission_statement']
    
    # def validate(self, data):

    #     if data.get('password') != data.get('repeat_password'):
    #         raise serializers.ValidationError("Passwords do not match")
        
    #     return data
    
    # def create(self, validated_data):
    #     repeat_pass = validated_data.pop('repeat_password', tuple())
    #     created_shelter = ShelterUser.objects.create(**validated_data)

    #     return created_shelter



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
    # add validate password here too

class PetUserUpdateSerializer(ModelSerializer):
    class Meta:
        model = PetUser
        fields = ['username', 'password', 'email', 'name', 'surname', 'location', 'profile_pic']
    # add validate password here too

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