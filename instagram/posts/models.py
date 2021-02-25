from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
	title = models.CharField(max_length = 150)
	photo = models.ImageField(upload_to = 'images')
	owner = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE, null=True)
	created_at = models.DateTimeField(auto_now_add = True)

	class Meta:
		ordering = ['-created_at']
