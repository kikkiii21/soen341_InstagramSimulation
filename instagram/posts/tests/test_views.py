import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from PIL import Image
import tempfile

from ..models import Post
from ..serializers import PostSerializer


# print(Image.open('baby_kilo.png').format)

class PostingPictureTestCase(APITestCase):

    def setUp(self):
        self.user_jason = User.objects.create(username='jason', email='jason@gmail.com', password='123')
        # self.user_massimo = User.objects.create(username='massimo', email='massimo@gmail.com', password='123')
        # Post.objects.create(caption='Dis cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_jason)
        # Post.objects.create(caption='I like cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_massimo)
        
        # self.token_massimo = Token.objects.create(user=self.user_massimo)
        # self.token_jason = Token.objects.create(user=self.user_jason)
        img = Image.open('instagram/images/baby_kilo.png')
        print(img)
        self.data = {
            "caption": "Dis cat",
            "photo": img
        }
        img.close()
        

    def test_posting_picture(self):
        # Log user in
        self.client.login(username=self.user_jason.username, password='123')

        
        response = self.client.post('postsEndpoint/', self.data, format='multipart')
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