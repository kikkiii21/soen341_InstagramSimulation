from ..models import Comment
from posts.models import Post

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


# Comment Test
class CommentViewTestCase(APITestCase):

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

    def test_can_comment_on_post(self):
        data = {
            "comment": "I like cats",
            "post": 1
        }
        response = self.client.post(
            self.url_comment, 
            data=data, 
            format='json',
        )
        test_comment = Comment.objects.get(author=self.user)
        self.assertEqual(test_comment.get_comment(), "I like cats")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
