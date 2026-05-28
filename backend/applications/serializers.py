from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'email', 'phone', 'college', 'program', 'created_at']
        read_only_fields = ['id', 'created_at']
