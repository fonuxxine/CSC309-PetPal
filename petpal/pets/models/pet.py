from django.db import models

# Create your models here.

STATUS_CHOICES = [
    ("AV", "available"),
    ("AD", "adopted"),
    ("PN", "pending"),
    ("WD", "withdrawn")
]

GENDER_CHOICES =[
    ("F", "female"),
    ("M", "male")
]

class Pet(models.Model):
    shelter = models.ForeignKey('accounts.ShelterUser', on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    photo= models.ImageField()
    breed= models.CharField(max_length=120, null=True, blank=True)
    type= models.CharField(max_length=120)
    age= models.IntegerField()
    gender= models.CharField(max_length=1, choices=GENDER_CHOICES)
    size= models.CharField(max_length=120)
    description= models.CharField(max_length=120)
    status= models.CharField(max_length=2, choices=STATUS_CHOICES)
    publication_date = models.DateTimeField(auto_now_add=True)
    medical_history = models.CharField(max_length=120, null=True, blank=True)
    special_requirements = models.CharField(max_length=120, null=True, blank=True)
    behaviour = models.CharField(max_length=120, null=True, blank=True)

