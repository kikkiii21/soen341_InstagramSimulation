from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


# Create your models here.
class Comment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=300, blank=False)
    owner = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)


	class Meta:
		ordering = ['-created_at']


