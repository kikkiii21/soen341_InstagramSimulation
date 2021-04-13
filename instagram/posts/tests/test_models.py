from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Post


# Test to see if the app returns the right post
class GetPostTest(TestCase):
    def setUp(self):
        user_jason = User.objects.create(username='jason', email='jason@gmail.com', password='123')
        user_massimo = User.objects.create(username='massimo', email='massimo@gmail.com', password='123')
        Post.objects.create(caption='Dis cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_jason)
        Post.objects.create(caption='I like cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_massimo)


    def test_comment(self):
        post_massimo = Post.objects.get(author=User.objects.get(username = 'massimo'))
        post_jason = Post.objects.get(author=User.objects.get(username = 'jason'))
        self.assertEqual(
            post_jason.get_post_caption(), "Dis cat belongs to jason.")
        self.assertEqual(
            post_massimo.get_post_caption(), "I like cat belongs to massimo.")
