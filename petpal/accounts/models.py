from django.db import models
from django.contrib.auth.models import AbstractUser

# import whatever you need to make the custom user
# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(max_length=120)
    password = models.CharField(max_length=120)
    email = models.EmailField(max_length=120, null=False, blank=False)
    location = models.CharFiled(max_length=120, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='avatars/', null=True, blank=True)
    last_login = models.DateTimeField(auto_now=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    

class ShelterUser(CustomUser):
    shelter_name = models.CharField(max_length=120, null=False, blank=False)
    # maybe want a text field for this?
    mission_statement = models.CharField(max_length=255, null=False, blank=False)

class PetUser(CustomUser):
    first_name = models.CharField(max_length=120, null=False, blank=False)
    last_name = models.CharField(max_length=120, null=False, blank=False)

