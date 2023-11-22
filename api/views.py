import json
from .models import Note
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from api.sertalizers import NoteSerializer
# Create your views here.

class Notes(APIView):
    def get(self, request):
        try:
            notes_data = Note.objects.all().order_by('-updated_at')
            if not notes_data:
                return JsonResponse({"error": "No Data Found"})
            notes_data_serialzed = NoteSerializer(notes_data, many=True).data
            return JsonResponse(notes_data_serialzed, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=200)


class SingleNote(APIView):
    def get(self, request):
        try:
            id = request.GET.get('id', None)
            if not id:
                return JsonResponse({'error': 'ID Missing'}, status=200)
            note_data = Note.objects.filter(id=id)
            if not note_data:
                return JsonResponse({'error': 'Note Not Found'}, status=200)
            note_data_serialzed = NoteSerializer(
                note_data.first(), many=False).data
            return JsonResponse(note_data_serialzed, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=200)

    def put(self, request):
        try:
            filter_dict = request.GET.dict()
            update_dict = request.POST.dict()
            note_data = Note.objects.filter(**filter_dict)
            if not note_data:
                return JsonResponse({'error': 'Note Not Found'}, status=200)
            note_data.update(**update_dict)
            note_data.first().save()
            return JsonResponse({'message': 'updated successfully', 'data': NoteSerializer(note_data.first(), many=False).data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=200)

    def delete(self, request):
        try:
            filter_dict = request.GET.dict()
            note_data = Note.objects.filter(**filter_dict)
            if not note_data:
                return JsonResponse({'error': 'Note Not Found'}, status=200)
            note_data.delete()
            return JsonResponse({'message': 'note deleted'}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=200)
        
    def post(self, request):
        try:
            data = request.POST.dict()
            note_body = data.get('note_body', None)
            if not note_body:
                return JsonResponse({'error': 'Note Data Not Found'}, status=200)
            note_object = Note(
                note_body = note_body
            )
            note_object.save()
            return JsonResponse({'message': 'Added successfully', 'data': NoteSerializer(note_object, many=False).data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=200)