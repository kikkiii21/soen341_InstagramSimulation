from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', upload_to='profile_pics')

    def __str__(self):
        return str(self.user)

# creates a profile when a user registers
@receiver(post_save, sender=User)
def create_profile(sender, instance,created,**kwargs):
    if created:
        Profile.objects.create(user =instance)

# saves profile when changes are made to user
@receiver(post_save, sender=User)
def save_profile(sender, instance,**kwargs):
    instance.profile.save()


class Follow(models.Model):
    user = models.ForeignKey(User, related_name='follows', on_delete=models.CASCADE)
    # the user you follow
    following = models.ForeignKey(User, on_delete=models.CASCADE)

def get_follows(self):
    follows = Follow.objects.filter(creator=self.user, on_delete=models.CASCADE)
    return follows


# def get_followers(self):
#     followers = Follow.objects.filter(following=self.user, on_delete=models.CASCADE)
#     return followers
