import json
import pdb
from django.conf.urls import include
from django.contrib.auth.password_validation import password_changed
from django.http import response

from django.test import TestCase, Client
from ..models import Profile, Follow
from ..serializers import ProfileSerializer

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import HTTP_HEADER_ENCODING, status
from rest_framework.authtoken.models import Token
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from rest_framework.authentication import BasicAuthentication
from rest_framework.test import APITestCase, APIClient, APIRequestFactory
from PIL import Image
import tempfile


# initialize the APIClient app



# test to see if app can return all registered users
# class GetAllUsersTest(TestCase):

#     def setUp(self):
#         User.objects.create(first_name='Casper', last_name='Patel', username='BullDog', email='casper@gmail.com', password='123')
#         User.objects.create(first_name='Muffin', last_name='Smith', username='Gradane', email='muffin@gmail.com', password='123')
#         User.objects.create(first_name='Kilo', last_name='Connor', username='Fatty', email='fatty@gmail.com', password='123')
#         User.objects.create(first_name='Tila', last_name='James', username='Skinny', email='skinny@gmail.com', password='123')

#     def test_get_all_profiles(self):
#         response = client.get(reverse('list-all-profiles'))
#         users = Profile.objects.all()
#         serializer = ProfileSerializer(users, many=True)
#         self.assertEqual(response.data, serializer.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
class RegisterTestCase(APITestCase):
    def test_registration(self):
        data = {
            'first_name': 'Casper', 'last_name': 'Patel', 'username': 'BullDog', 'email': 'casper@gmail.com', 'password': '123'
        }
        response = self.client.post("/registerEndpoint/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

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
        previous_password = self.user.password
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
                "password": "giborish123"
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_change_profile_picture(self):
        # Create image
        # image = Image.new('RGB', (100, 100))
        # tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        # image.save(tmp_file)
        # # img = Image.open('instagram/profile_pics/default_profile.jpg')
        # print(image)
        # # data = {
        # #     "id": 1,
        # #     "photo": image
        # # }
        # with open(tmp_file.name, 'rb') as data:
        #     response = self.client.put(
        #         self.update_photo_url, 
        #         data={"id": 1, "photo": data}, 
        #         format='multipart',
        #     )
        img = Image.open('instagram/profile_pics/default_profile.jpg')
        data = {
            "id": 1,
            "photo": img
        }
        response = self.client.put(
            self.update_photo_url,
            data=data,
            format='multipart'
        )
        test_photo = Profile.objects.get(user=self.user)
        print(test_photo.get_photo())
        print(img)
        self.assertEqual(test_photo.get_photo(), img)
        # pdb.set_trace()
        self.assertEqual(response.status_code, status.HTTP_200_OK)


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
        self.assertEqual(test_following.get_following().pk, 2) #following user with pk (id) of 2
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)




