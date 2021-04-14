from django.test import TestCase
from ..models import Comment
from django.contrib.auth.models import User
from accounts.models import Profile
from posts.models import Post

# test to see if app returns specific users' email addresses
class GetCommentTest(TestCase):

    def setUp(self):
        user_jason = User.objects.create(username='jason', email='jason@gmail.com', password='123')
        user_massimo = User.objects.create(username='massimo', email='massimo@gmail.com', password='123')
        post_jason = Post.objects.create(caption='Dis cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_jason)
        post_massimo = Post.objects.create(caption='I like cat', photo='profile_pics/Screen_Shot_2021-01-22_at_1.42.14_P.png', author=user_massimo)
        Comment.objects.create(author=user_jason, comment='Cool cat', post= post_jason)
        Comment.objects.create(author=user_massimo, comment='I like this a lot', post= post_massimo)

    def test_comment(self):

        comment_jason = Comment.objects.get(author=User.objects.get(username = 'jason'))
        comment_massimo = Comment.objects.get(author=User.objects.get(username = 'massimo'))
        self.assertEqual(
            comment_jason.get_comment_author(), "Cool cat is written by jason.")
        self.assertEqual(
            comment_massimo.get_comment_author(), "I like this a lot is written by massimo.")
