from django.db import models
from django.contrib.auth.models import User



# Create your models here.
# class Feed(models.Model):
#     post = models.ForeignKey(Post, on_delete = models.CASCADE)
#     uploaded_by = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
#     created_at = models.DateTimeField(auto_add_now = True)

class Post(models.Model):
	title = models.CharField(max_length = 150)
	photo = models.ImageField(upload_to = 'images')
	owner = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE, null=True)
	created_at = models.DateTimeField(auto_now_add = True)
	# likes = models.IntegerField(null = False, default = 0)

	class Meta:
		ordering = ['created_at']

	# def __str__(self):
	# 	return self.title
