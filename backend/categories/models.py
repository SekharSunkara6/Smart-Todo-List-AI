from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    usage_frequency = models.IntegerField(default=0)

    def __str__(self):
        return self.name
