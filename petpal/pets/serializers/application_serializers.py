from rest_framework.serializers import (ModelSerializer, DateTimeField, PrimaryKeyRelatedField,
                                        CharField, EmailField)
from ..models import Applications


# might need more than one serializer if you need different fields for different views

class ApplicationSerializer(ModelSerializer):
    applicant = PrimaryKeyRelatedField(read_only=True)
    last_modified = DateTimeField(read_only=True)
    creation_time = DateTimeField(read_only=True)
    status = CharField(read_only=True)

    class Meta:
        model = Applications
        fields = '__all__'


class ApplicationUpdateSerializer(ModelSerializer):

    class Meta:
        model = Applications
        fields = ['status']
