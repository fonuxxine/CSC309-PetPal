from rest_framework.serializers import ModelSerializer, DateTimeField, PrimaryKeyRelatedField
from ..models import Pet

# might need more than one serializer if you need different fields for different views

class PetSerializer(ModelSerializer):
    publication_date = DateTimeField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
   
    class Meta:
        model = Pet
        fields = '__all__'
