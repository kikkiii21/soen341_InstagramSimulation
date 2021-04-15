from ..models import Profile, Follow

from django.conf import settings
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
import tempfile

# Profile Tests
class ProfileUpdateViewTestCase(APITestCase):

    update_profile_url = reverse('auth-update-profile')
    update_photo_url = reverse('auth-update-photo')

    def setUp(self):
        # self.client = APIClient(enforce_csrf_checks=True)
        self.user = User.objects.create_superuser(
            first_name='Casper', 
            last_name='Patel', 
            username='BullDog', 
            email='casper@gmail.com', 
            password='123'
        )
        settings.MEDIA_ROOT = tempfile.mkdtemp()
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    def test_can_update_first_name(self):
        data = {
            "id": 1,
            "user": {
                "id": self.user.pk,
                "username": self.user.username,
                "first_name": "Karen",
                "last_name": self.user.last_name,
                "email": self.user.email,
                "posts": [],
                "comments": [],
                "follows": []
            }
        }
        response = self.client.put(
            self.update_profile_url, 
            data=data, 
            format='json',
        )
        test_first_name = Profile.objects.get(user=self.user)
        self.assertEqual(test_first_name.get_first_name(), "Karen")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_last_name(self):
        data = {
            "id": 1,
            "user": {
                "id": self.user.pk,
                "username": self.user.username,
                "first_name": self.user.first_name,
                "last_name": 'Lopez',
                "email": self.user.email,
                "posts": [],
                "comments": [],
                "follows": []
            }
        }
        response = self.client.put(
            self.update_profile_url, 
            data=data, 
            format='json',
        )
        test_last_name = Profile.objects.get(user=self.user)
        self.assertEqual(test_last_name.get_last_name(), "Lopez")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_email(self):
        data = {
            "id": 1,
            "user": {
                "id": self.user.pk,
                "username": self.user.username,
                "first_name": self.user.first_name,
                "last_name": self.user.last_name,
                "email": 'email@gmail.com',
                "posts": [],
                "comments": [],
                "follows": []
            }
        }
        response = self.client.put(
            self.update_profile_url, 
            data=data, 
            format='json',
        )
        test_email = Profile.objects.get(user=self.user)
        self.assertEqual(test_email.get_email(), "email@gmail.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_change_password(self):
        data = {
            "old_password": "123",
            "password": "giborish123",
            "password2": "giborish123"
        }
        response = self.client.put(
            reverse('auth-change-password', kwargs={"pk": 1}), 
            data=data, 
            format='json',
        )

        # Assert if password change went through successfully
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Can't access password via get method since password is encrypted
        # Loggin back in with new password to test if password was changed successfully
        response = self.client.post(
            reverse('login-user'), # name of login url
            data={
                "username": self.user.username,
                "password": "giborish123" # New password
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ckecks_for_correct_password(self):
        data = {
            "old_password": "123abc", # the worng password
            "password": "giborish123",
            "password2": "giborish123"
        }
        response = self.client.put(
            reverse('auth-change-password', kwargs={"pk": 1}), 
            data=data, 
            format='json',
        )

        # Assert if password didn't go through successfully
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_can_change_profile_picture(self):
        # Upload Image
        image = SimpleUploadedFile(name='test.jpg', # Name it any file name and it will get saved in database
                                   content=open('instagram/profile_pics/default_profile.jpg', 'rb').read(),
                                   content_type='image/jpeg')
        data = {
            "id": 1,
            "photo": image
        }
        response = self.client.put(
            self.update_photo_url,
            data=data,
            format='multipart'
        )
        test_photo = Profile.objects.get(user=self.user)
        self.assertEqual(test_photo.get_photo().name, 'profile_pics/' + image.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Follow Tests
class FollowingUserTestCase(APITestCase):

    url_follow_button = reverse('follow-button')

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.user_casper = User.objects.create_superuser(
            first_name='Casper', 
            last_name='Patel', 
            username='BullDog', 
            email='casper@gmail.com', 
            password='123'
        )
        self.user_muffin = User.objects.create(
            first_name='Muffin', last_name='Smith', 
            username='Gradane', 
            email='muffin@gmail.com', 
            password='123'
        )
        self.token_casper = Token.objects.create(user=self.user_casper)
        self.token_muffin = Token.objects.create(user=self.user_muffin)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user_casper)

    def test_follow_button(self):
        data = {
            "following": self.user_muffin.pk
        }

        response = self.client.post(
            self.url_follow_button,
            data=data,
            format='multipart'
        )
        # pdb.set_trace()
        test_following = Follow.objects.get(user=self.user_casper)
        self.assertEqual(test_following.get_following().pk, 2)  # following user with pk (id) of 2
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)




