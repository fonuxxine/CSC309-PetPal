from django.db import models
from django.contrib.auth.models import AbstractUser

# import whatever you need to make the custom user
# Create your models here.
class ShelterUser(AbstractUser):
    pass


class PetUser(AbstractUser):
    pass

