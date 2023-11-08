from django.db import models
from django.contrib.auth.models import AbstractUser

# import whatever you need to make the custom user
# Create your models here.
# user generic fields
# username
# first_name
# last_name
# email
# password
# groups
# user_permissions
# is_staff
# is_active
# is_superuser
# last_login
# date_joined

class CustomUser(AbstractUser):
    username = models.CharField(max_length=120)
    password = models.CharField(max_length=120)
    email = models.EmailField(max_length=120, null=False, blank=False)
    

class ShelterUser(CustomUser):
    
    first_name = models.CharField(max_length=120, null=False, blank=False)
    last_name = models.CharField(max_length=120, null=False, blank=False)
    
    last_login = models.DateTimeField(auto_now=True)

class PetUser(CustomUser):
    pass

