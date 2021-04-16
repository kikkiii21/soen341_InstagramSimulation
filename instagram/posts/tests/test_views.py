from django.contrib.auth.models import User
from django.conf import settings
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
import tempfile

from ..models import Post

#Get photo caption test
class CaptionViewTestCase(APITestCase):

    url_comment = reverse('comment-url')

    def setUp(self):
        self.user = User.objects.create_superuser(
            first_name='Casper', 
            last_name='Patel', 
            username='BullDog', 
            email='casper@gmail.com', 
            password='123'
        )
        self.post = Post.objects.create(
            caption='Dis cat', 
            photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', 
            author=self.user,
        )
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.force_authenticate(user=self.user)

    # test on post caption input
    def test_can_get_caption_on_post(self):
        response = self.client.get(self.url_comment)
        test_caption = Post.objects.get(author=self.user)
        self.assertEqual(test_caption.get_post_caption(), "Dis cat belongs to BullDog.")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# PostPicture Test
class PostingPictureViewTestCase(APITestCase):

    update_photo_url = reverse('post_list')

    def setUp(self):
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

    # test on post picture input
    def test_can_post_picture(self):
        # Upload Image
        image = SimpleUploadedFile(name='test2.jpg', # Name it any file
                                   content=open('instagram/profile_pics/default_profile.jpg', 'rb').read(),
                                   content_type='image/jpeg')
        data = {
            "caption": "This is a cat",
            "photo": image
        }
        response = self.client.post(
            self.update_photo_url,
            data=data,
            format='multipart'
        )
        test_photo = Post.objects.get(author=self.user)
        self.assertEqual(test_photo.get_photo().name, 'media/' + image.name)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
