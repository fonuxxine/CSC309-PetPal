from rest_framework.serializers import ModelSerializer
from ..models import ShelterComment, ApplicationComment

# might need more than one serializer if you need different fields for different views

class AppCommentSerializer(ModelSerializer):
    pass

class ShelterCommentSerializer(ModelSerializer):
    pass