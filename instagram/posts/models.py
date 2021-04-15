from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Post(models.Model):
    caption = models.CharField(max_length=150)
    photo = models.ImageField(upload_to='media')
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def get_post_caption(self):
        return self.caption + ' belongs to ' + self.author.username + '.'

    def get_photo(self):
        return self.photo
