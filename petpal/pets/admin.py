from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Pet)
admin.site.register(Applications)
admin.site.register(ShelterComment)
admin.site.register(ShelterCommentResponse)
admin.site.register(ApplicationComment)
admin.site.register(Notification)
admin.site.register(Blog)