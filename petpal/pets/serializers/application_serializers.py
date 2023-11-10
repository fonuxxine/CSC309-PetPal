from rest_framework.serializers import ModelSerializer
from ..models import Applications


# might need more than one serializer if you need different fields for different views

class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Applications
        fields = '__all__'


class ApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = Applications
        fields = ['firstname', 'lastname', 'email', 'address', 'pet_listing', 'reason']


class ApplicationUpdateSerializer(ModelSerializer):
    class Meta:
        model = Applications
        fields = ['status']
