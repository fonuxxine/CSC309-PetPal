from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from accounts.models import ShelterUser, CustomUser, PetUser
from application import Application

class ShelterComment(models.Model):
    shelter = models.ForeignKey(ShelterUser, on_delete=models.CASCADE)
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    time_created = models.DateTimeField(auto_now=True)
    

class ApplicationComment(models.Model):
    message = models.TextField()
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now=True)