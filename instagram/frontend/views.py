from django.shortcuts import render
from posts.models import Post
from accounts.models import Follow
# Create your views here.


def react(request, *args, **kwargs):
    return render(request, 'frontend/react.html')



def index(request, *args, **kwargs):
    posts = Post.objects.all()
    context = {
        'posts': posts
    }
    return render(request, 'frontend/index.html', context)

def home(request):
    posts = Post.objects.all()
    context = {
        'posts': posts
    }
    return render(request,'frontend/index.html', context)


# def followindex(request, *args, **kwargs):
#     follows = Follow.objects.all()
#     context = {
#         'posts': follows
#     }
#     return render(request, 'frontend/index.html', context)

