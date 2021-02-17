from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length = 50)
    picture = models.ImageField(upload_to='images/', blank = True)
    description = models.CharField(max_length = 200)
    date = models.DateField(default = timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title