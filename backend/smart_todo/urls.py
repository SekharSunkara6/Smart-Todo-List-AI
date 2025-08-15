from django.http import JsonResponse
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from tasks.views import TaskViewSet, ai_task_suggestions, ai_task_suggestion_for_input
from context.views import ContextEntryViewSet
from categories.views import CategoryViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'context', ContextEntryViewSet)
router.register(r'categories', CategoryViewSet)

def home_view(request):
    return JsonResponse({"message": "Welcome to the Smart Todo List API"})

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/ai/suggestions/', ai_task_suggestions),         # Existing GET endpoint for all tasks
    path('api/ai/suggestion/', ai_task_suggestion_for_input), # New POST endpoint for single task input
]
