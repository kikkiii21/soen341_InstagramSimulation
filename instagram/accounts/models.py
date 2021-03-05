from django.db import models
from django.contrib.auth.models import User


class Connection(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    creator = models.ForeignKey(User, related_name="friendship_creator_set", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="friend_set", on_delete=models.CASCADE)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default ='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', upload_to='profile_pics')
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


    def get_connections(self):
        connections = Connection.objects.filter(creator=self.user, on_delete=models.CASCADE)
        return connections

    def get_followers(self):
        followers = Connection.objects.filter(following=self.user, on_delete=models.CASCADE)
        return followers
