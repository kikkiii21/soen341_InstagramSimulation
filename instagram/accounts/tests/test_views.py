import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Profile
from ..serializers import ProfileSerializer
from django.contrib.auth.models import User


# initialize the APIClient app
client = Client()


# test to see if app can return all registered users
class GetAllUsersTest(TestCase):

	def setUp(self):
		User.objects.create(first_name='Casper', last_name='Patel', username='BullDog', email='casper@gmail.com', password='123')
		User.objects.create(first_name='Muffin', last_name='Smith', username='Gradane', email='muffin@gmail.com', password='123')
		User.objects.create(first_name='Kilo', last_name='Connor', username='Fatty', email='fatty@gmail.com', password='123')
		User.objects.create(first_name='Tila', last_name='James', username='Skinny', email='skinny@gmail.com', password='123')

	def test_get_all_profiles(self):
		response = client.get(reverse('list-all-profiles'))
		users = Profile.objects.all()
		serializer = ProfileSerializer(users, many=True)
		self.assertEqual(response.data, serializer.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestSettingsPage(TestCase):

	def setUp(self):
		User.objects.create(first_name='Casper', last_name='Patel', username='BullDog', email='casper@gmail.com', password='123')

	def can_update_first_name(self):
		data = {
			"first_name": "Karen"
		}
		response = self.client.post("updateProfileEndpoint/", data=data)
		test_first_name = Profile.objects.get(user=User.objects.get(username='BullDog'))
		self.assertEqual(email_casper.first_name(), "Karen")
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def can_update_last_name(self):
		data = {
			"first_name": "Li"
		}
		response = self.client.post("updateProfileEndpoint/", data=data)
		test_first_name = Profile.objects.get(user=User.objects.get(username='BullDog'))
		self.assertEqual(email_casper.last_name(), "Li")
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def can_update_email(self):
		data = {
			"first_name": "Li"
		}
		response = self.client.post("updateProfileEndpoint/", data=data)
		test_first_name = Profile.objects.get(user=User.objects.get(username='BullDog'))
		self.assertEqual(email_casper.last_name(), "Li")
		self.assertEqual(response.status_code, status.HTTP_200_OK)