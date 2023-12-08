from django.db import models

class Blog(models.Model):
    shelter = models.ForeignKey("accounts.ShelterUser", on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    photo = models.ImageField(upload_to="blogs/")
    publication_date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
