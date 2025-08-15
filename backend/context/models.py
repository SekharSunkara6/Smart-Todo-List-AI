from django.db import models

class ContextEntry(models.Model):
    SOURCE_CHOICES = [
        ('whatsapp', 'WhatsApp'),
        ('email', 'Email'),
        ('note', 'Note'),
    ]

    content = models.TextField()
    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    processed_insights = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.source_type} - {self.content[:30]}"
