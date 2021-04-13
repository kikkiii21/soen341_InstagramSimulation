from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(default='profile_pics/default_profile.jpg', upload_to='profile_pics')

    def __str__(self):
        return str(self.user)

    def get_email(self):
        return self.user.email

    def get_first_name(self):
        return self.user.first_name

    def get_last_name(self):
        return self.user.lasst_name

# creates a profile for each user registered
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# saves profile when there is a change
@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()


class Follow(models.Model):
    user = models.ForeignKey(User, related_name='follows', on_delete=models.CASCADE)
    # the user you follow
    following = models.ForeignKey(User, on_delete=models.CASCADE)


# get all of followees
def get_follows(self):
    follows = Follow.objects.filter(creator=self.user, on_delete=models.CASCADE)
    return follows


# get number of followees
def number_of_follows(self):
    follows = Follow.objects.filter(creator=self.user, on_delete=models.CASCADE)
    return len(follows)
