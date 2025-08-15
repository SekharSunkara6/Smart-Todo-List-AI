from rest_framework import serializers
from .models import ContextEntry

class ContextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntry
        fields = '__all__'
