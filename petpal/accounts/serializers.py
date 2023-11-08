from rest_framework.serializers import ModelSerializer
from .models import *

# might need more than one serializer if you need different fields for different views

class UserSerializer(ModelSerializer):
    pass
