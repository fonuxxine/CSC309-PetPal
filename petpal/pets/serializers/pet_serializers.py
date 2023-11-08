from rest_framework.serializers import ModelSerializer
from ..models import Pet

# might need more than one serializer if you need different fields for different views

class PetSerializer(ModelSerializer):
    pass
