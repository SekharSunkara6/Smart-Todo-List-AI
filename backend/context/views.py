from rest_framework import viewsets
from .models import ContextEntry
from .serializers import ContextEntrySerializer

class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all().order_by('-timestamp')
    serializer_class = ContextEntrySerializer
