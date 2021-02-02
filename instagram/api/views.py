from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .models import UserProfile

# Create your views here.

class UserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


