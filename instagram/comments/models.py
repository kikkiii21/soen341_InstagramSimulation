from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


# Create your models here.
class Comment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(max_length=300, blank=False)
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.comment)

    def get_comment_author(self):
        return self.comment + ' is written by ' + self.author.username + "."

    def get_comment(self):
        return self.user.comment