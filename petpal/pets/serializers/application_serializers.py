from rest_framework.serializers import ModelSerializer
from ..models import Applications

# might need more than one serializer if you need different fields for different views

class ApplicationSerializer(ModelSerializer):
    pass