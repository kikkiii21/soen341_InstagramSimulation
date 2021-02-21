
from django.shortcuts import render, redirect
from .forms import PostForm
from .models import Post
from django.contrib.auth.decorators import login_required

from rest_framework import generics
from .serializers import PostSerializer

# Create your views here.
@login_required
def new_post(request):
    form = PostForm()
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        # username = form.cleaned_data.get('username')
        if form.is_valid():
            form.save()
        return redirect('home')
    return render(request, 'newpost.html', {'form': form})


def home(request):
    return render(request,'frontend/index.html')


class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer