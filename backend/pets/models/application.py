from django.db import models
from .pet import Pet
from accounts.models import PetUser


class Applications(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('denied', 'Denied'),
        ('withdrawn', 'Withdrawn'),
    ]

    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    pet_listing = models.ForeignKey(Pet, on_delete=models.CASCADE, null=True)
    reason = models.TextField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)
    creation_time = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applicant = models.ForeignKey(PetUser, on_delete=models.CASCADE, null=True)
