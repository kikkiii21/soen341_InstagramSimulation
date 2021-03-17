from django.test import TestCase
from ..models import Profile, Follow
from django.contrib.auth.models import User


class UserTest(TestCase):

    def setUp(self):
        User.objects.create(first_name='Casper', last_name='Patel', username='BullDog', email='casper@gmail.com', password='123')
        User.objects.create(first_name='Muffin', last_name='Smith', username='Gradane', email='muffin@gmail.com', password='123')

    def test_profile_email(self):

        email_casper = Profile.objects.get(user=User.objects.get(username='BullDog'))
        email_muffin = Profile.objects.get(user=User.objects.get(username='Gradane'))
        self.assertEqual(
            email_casper.get_email(), "casper@gmail.com is Casper's email address.")
        self.assertEqual(
            email_muffin.get_email(), "muffin@gmail.com is Muffin's email address.")