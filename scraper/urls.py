from django.urls import path
from .views import get_random_quote

urlpatterns = [
    path("quote/", get_random_quote),
]
