from django.urls import path
from . import views

urlpatterns = [ 
    path("shelter/", views.ShelterCreateView.as_view()),
    path("pet-user/", views.PetUserCreateView.as_view()),
    path("shelter/<int:shelter_id>", views.ShelterUpdateView.as_view()),
    path("pet-user/<int:pet_user_id>", views.PetUserUpdateView.as_view()),
    path("shelter/all", views.ShelterListView.as_view()),
]