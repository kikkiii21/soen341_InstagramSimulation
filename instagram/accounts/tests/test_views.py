import json
from django.contrib.auth.password_validation import password_changed
from django.http import response

from django.test import TestCase, Client
from ..models import Profile
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

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
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
        # self.client.login(username=self.user.username, password=self.user.password)
        # self.client.force_login(user=self.token.key)
        # self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.client.force_authenticate(user=self.user)

    # def test_profile_list_authenticated(self):
    #     # self.client.login(username='BullDog', password='123')
        
    #     response = self.client.get(self.update_profile_url)
        
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_profile_list_un_authenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.update_profile_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

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
        test_last_name = Profile.objects.get(user=self.user)
        self.assertEqual(test_last_name.get_email(), "email@gmail.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# class BaseAPITestCase(APITestCase):
#     def get_token(self, email=None, password=None, access=True):
#         email = self.email if (email is None) else email
#         password = self.password if (password is None) else password

#         url = reverse("token_create")  # path/url where of API where you get the access token
#         resp = self.client.post(
#             url, {"email": email, "password": password}, format="json"
#         )
#         self.assertEqual(resp.status_code, status.HTTP_200_OK)
#         self.assertTrue("access" in resp.data)
#         self.assertTrue("refresh" in resp.data)
#         token = resp.data["access"] if access else resp.data["refresh"]
#         return token

#     def api_authentication(self, token=None):
#         token = self.token if (token is None) else token
#         self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)


# class RemoteAuthenticatedTest(APITestCase):
#     client = APIClient()

#     def setUp(self):
#         self.username = 'BullDog'
#         self.user = User.objects.create(
#             first_name='Casper', 
#             last_name='Patel', 
#             username='BullDog', 
#             email='casper@gmail.com', 
#             password='123'
#         )
#         self.token = Token.objects.create(user=self.user)
#         self.client = APIClient()
#         self.client.login(username=self.user.username, password=self.user.password)
#         self.client.credentials(HTTP_AUTHORIZATION=self.token.key)
#         # Token.objects.create(user=self.user)
#         # self.api_authentication()
#         super(RemoteAuthenticatedTest, self).setUp()


# class SettingsTestCase(RemoteAuthenticatedTest):

#     def test_can_update_first_name(self):
#         data = {
#             "first_name": "Karen"
#         }
#         # self.client.credentials(HTTP_AUTHORIZATION=BasicAuthentication.authenticate_credentials(self.user, self.user.username, self.user.password))
#         # self.client.cookies.values()

#         # self.client.force_authenticate(user=self.user.username)
#         # self.client.credentials()
#         # self.client.credentials()
#         response = self.client.patch(
#             reverse('auth-update-profile'), 
#             data=data, 
#             format='json', 
#             REMOTE_USER=self.username
#         )
#         test_first_name = Profile.objects.get(user=self.user)
#         # self.assertEqual(test_first_name.get_first_name(), "Karen")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    # def api_authentication(self):
    #     self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    # def test_profile_list_authentication(self):
    #     response = self.client.get(reverse('auth-update-profile'))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_profile_list_un_authentication(self):
    #     self.client.force_authenticate(user=None)
    #     response = self.client.get(reverse('auth-update-profile'))
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_profile_detail_retrieve(self):
    #     response = self.client.get(reverse('auth-update-profile', kwargs={"pk": 1}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data["user"], "Bulldog")


    # def test_can_update_first_name(self):
    #     data = {
    #         "first_name": "Karen"
    #     }
    #     response = self.client.patch(
    #         self.update_profile_url, 
    #         data=data, 
    #         format='json', 
    #         # REMOTE_USER=self.user.username
    #     )
    #     test_first_name = Profile.objects.get(user=self.user)
    #     self.assertEqual(test_first_name.get_first_name(), "Karen")
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)





    # def test_can_update_last_name(self):
    #     data = {
    #             "first_name": "Li"
    #     }
    #     response = self.client.post("updateProfileEndpoint/", data=data)
    #     test_first_name = Profile.objects.get(user=User.objects.get(username='BullDog'))
    #     self.assertEqual(email_casper.last_name(), "Li")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_can_update_email(self):
    #     data = {
    #             "first_name": "Li"
    #     }
    #     response = self.client.post("updateProfileEndpoint/", data=data)
    #     test_first_name = Profile.objects.get(user=User.objects.get(username='BullDog'))
    #     self.assertEqual(email_casper.last_name(), "Li")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_can_update_password(self):
    #     data = {
    #             'old_password': '123',
    #             'password': '1234',
    #             'password2': '1234',
    #     }
    #     response = self.client.post("updateProfileEndpoint/", data=data)
    #     test_password = Profile.objects.get(user=User.objects.get(username='BullDog'))
    #     self.assertEqual(User.objects.get(first_name='Casper').password(), "1234")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
