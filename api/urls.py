from django.urls import path
from .views import Notes, SingleNote

urlpatterns = [
    path('notes/', Notes.as_view()),
    path('note/', SingleNote.as_view())
]
