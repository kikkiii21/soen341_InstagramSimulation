import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APITestCase
from PIL import Image
import tempfile

from ..models import Post
from ..serializers import PostSerializer


# print(Image.open('baby_kilo.png').format)

class PostingPictureTestCase(APITestCase):
    client = APIClient()

    def setUp(self):
        self.user = User.objects.create(username='jason', email='jason@gmail.com', password='123')
        # self.user_massimo = User.objects.create(username='massimo', email='massimo@gmail.com', password='123')
        # Post.objects.create(caption='Dis cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_jason)
        # Post.objects.create(caption='I like cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_massimo)

        self.token = Token.objects.create(user=self.user)
        self.token = Token.objects.get(user__username='jason')
        # self.token_massimo = Token.objects.create(user=self.user_massimo)
        # self.token_jason = Token.objects.create(user=self.user_jason)



    def test_posting_picture(self):
        img = Image.open('instagram/profile_pics/default_profile.jpg')
        print(img)
        self.data = {
            "caption": "Dis cat",
            "photo": img
        }

        # Log user in
        self.client.force_authenticate(user=self.user)
        # self.client.login(username=self.user.username, password='123')
        self.client.credentials(HTTP_AUTHENTICATION="Token " + self.token.key)

        response = self.client.patch(reverse('post_list'), self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.client.credentials(HTTP_AUTHORIZATION='Token' + self.token_massimo)
        img.close()


    def test_post_photo(self):
        """
        Test trying to add a photo
        """
        # Create an album
        album = AlbumFactory(owner=self.user)

        # Log user in
        self.client.login(username=self.user.username, password='password')

        # Create image
        image = Image.new('RGB', (100, 100))
        tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image.save(tmp_file)

        # Send data
        with open(tmp_file.name, 'rb') as data:
            response = self.client.post(reverse('photo-list'), {'album': 'http://testserver/api/albums/' + album.pk, 'image': data}, format='multipart')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
