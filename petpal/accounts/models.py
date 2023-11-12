from django.db import models
from django.contrib.auth.models import AbstractUser

# import whatever you need to make the custom user
# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(max_length=120, unique=True)
    password = models.CharField(max_length=120)
    email = models.EmailField(max_length=120, null=False, blank=False)
    location = models.CharField(max_length=120, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='avatars/', null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    

class ShelterUser(CustomUser):
    shelter_name = models.CharField(max_length=120, null=False, blank=False)
    mission_statement = models.CharField(max_length=255, null=False, blank=False)

class PetUser(CustomUser):
    name = models.CharField(max_length=120, null=False, blank=False)
    surname = models.CharField(max_length=120, null=False, blank=False)

