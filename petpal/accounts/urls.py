from django.urls import path
from . import views

urlpatterns = [ 
    path("shelter/", views.ShelterListCreateView.as_view()),
    path("pet-user/", views.PetUserCreateView.as_view()),
    path("shelter/<int:shelter_id>/", views.ShelterUpdateDestroyView.as_view()),
    path("pet-user/<int:pet_user_id>/", views.PetUserDestoryUpdateView.as_view()),
    path("shelter/<int:shelter_id>/profile/", views.ShelterGetView.as_view()),
    path("pet-user/<int:pet_user_id>/profile/", views.PetUserGetView.as_view()),
]