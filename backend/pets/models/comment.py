from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from accounts.models import ShelterUser, CustomUser, PetUser
from .application import Applications

class ShelterComment(models.Model):
    shelter = models.ForeignKey(ShelterUser, on_delete=models.CASCADE, related_name='received_reviews')
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_reviews')
    message = models.TextField()
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    time_created = models.DateTimeField(auto_now=True)
    
class ShelterCommentResponse(models.Model):
    message = models.TextField()
    review = models.ForeignKey(ShelterComment, on_delete=models.CASCADE)
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='review_response')
    time_created = models.DateTimeField(auto_now=True)

class ApplicationComment(models.Model):
    message = models.TextField()
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_msg')
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_msg')
    application = models.ForeignKey(Applications, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now=True)