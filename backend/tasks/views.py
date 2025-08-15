from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from ai_integration.ai_module import analyze_tasks_with_context
from .models import Task
from .serializers import TaskSerializer
from context.models import ContextEntry

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

@api_view(['GET'])
def ai_task_suggestions(request):
    tasks = Task.objects.all()
    context_entries = ContextEntry.objects.all()

    suggestions = analyze_tasks_with_context(tasks, context_entries)

    for s in suggestions:
        if isinstance(s.get('suggested_deadline'), date):
            s['suggested_deadline'] = s['suggested_deadline'].isoformat()

    return Response({"ai_suggestions": suggestions})

@api_view(['POST'])
def ai_task_suggestion_for_input(request):
    title = request.data.get('title', '')
    description = request.data.get('description', '')

    # Create a temporary Task instance (not saved)
    temp_task = Task(title=title, description=description, category=None)

    context_entries = ContextEntry.objects.all()
    suggestions = analyze_tasks_with_context([temp_task], context_entries)

    if suggestions and isinstance(suggestions[0].get('suggested_deadline'), date):
        suggestions[0]['suggested_deadline'] = suggestions[0]['suggested_deadline'].isoformat()

    return Response({"ai_suggestion": suggestions[0] if suggestions else None})
