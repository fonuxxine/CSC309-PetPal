from django.urls import path
from . import views

urlpatterns = [ 
    path("pet-listings/manage/<int:shelter_id>/pet/<int:pet_id>", views.UserPetsRetrieve.as_view()),
    path("pet-listings/manage/<int:shelter_id>/pet/", views.ShelterPetsCreate.as_view()),
    path("pet-listings/manage/<int:shelter_id>", views.UserPetsList.as_view()),
    path("pet-listings/<int:pet_id>", views.ShelterPetsList.as_view()),
    path("pet-listings/", views.ShelterPetsRetrieveUpdateDestroy.as_view()),
]