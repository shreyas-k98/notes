from django.db import models

# Create your models here.

class Note(models.Model):
    note_body = models.TextField(null=True, blank=True, db_column='note_body')
    updated_at = models.DateTimeField(auto_now=True, db_column='updated_at')
    created_at = models.DateTimeField(auto_now_add=True, db_column='created_at')
    
    def __str__(self):
        return self.note_body
    
    class Meta:
        db_table = 'Note'