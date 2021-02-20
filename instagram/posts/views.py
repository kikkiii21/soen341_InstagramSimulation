
from django.shortcuts import render, redirect
from .forms import PostForm
from django.contrib.auth.decorators import login_required




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
    return render(request, 'posts/newpost.html', {'form': form})


def home(request):
    return render(request,'frontend/index.html')
