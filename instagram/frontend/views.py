from django.shortcuts import render
from posts.models import Post
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