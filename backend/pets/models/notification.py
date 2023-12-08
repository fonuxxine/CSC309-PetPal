from django.db import models
from accounts.models import CustomUser

class Notification(models.Model):
    read = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    link = models.URLField()
    time_created = models.DateTimeField(auto_now=True)