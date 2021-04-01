import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Post
from ..serializers import PostSerializer
# from ...accounts.tests.test_views import GetAllUsersTest
from django.contrib.auth.models import User
# from django.contrib.auth import Image
from django.core.files.uploadedfile import SimpleUploadedFile
import io    
# from django.utils.image import Image
import datetime

# Initialize an Image
# fp = io.BytesIO()
# Image.new('test', (1,1)).save(fp, 'png')
# fp.seek(0)
# portrait = SimpleUploadedFile(name=''foo, content=fp.read())

# initialize the APIClient app
client = Client()


class TestPostViews(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(
            first_name='Casper', 
            last_name='Patel', 
            username='BullDog', 
            email='casper@gmail.com', 
            password='123'
        )
        self.client = Client()
        self.post_list_url = reverse('post_list')
        # self.post_new_picture_url = reverse('post')

    def test_get_all_posts_GET(self):
        response = self.client.get(self.post_list_url)
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_post_picture_POST(self):
        response = self.client.post(self.post_list_url, {
            'caption': 'This is a caption',
            'photo': SimpleUploadedFile(
                name='foo.gif', 
                content=b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00'
            ),
            # 'photo': SimpleUploadedFile(name='test_image.jpg', content=open(image_path, 'rb').read(), content_type='image/jpeg')
            # 'author': self.user1,
            # 'created_at': datetime.date.today()
        })
        posts = Post.objects.all()
        # serializer = PostSerializer(posts, many = True)
        # self.assertEqual(response.data, serializer.data)
        self.assertEquals(response.status_code, 302)
        self.assertEquals(Post.objects.first().created_at, datetime.date.today())