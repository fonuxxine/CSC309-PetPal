from django.urls import path
from .views import comments_views, notifications_views, applications_views
from .views import pets_views
urlpatterns = [ 
    path("shelter-listings/<int:shelter_id>/pet/<int:pet_id>/", pets_views.ShelterPetsRetrieveUpdateDestroy.as_view()),
    path("shelter-listings/<int:shelter_id>/", pets_views.ShelterPetsListCreate.as_view()),
    path("pet-listings/<int:pet_id>/", pets_views.UserPetsRetrieve.as_view()),
    path("pet-listings/", pets_views.UserPetsList.as_view()),
    path('reviews/<int:pk>/replies/', comments_views.ShelterCommentReplyCreateView.as_view()),
    path('shelter/<int:pk>/reviews/', comments_views.ShelterCommentListCreateView.as_view()),
    path('applications/<int:pk>/messages/', comments_views.ApplicationCommentListCreateView.as_view()),
    path('user/<int:pk>/notifications/', notifications_views.NotificationListCreateView.as_view()),
    path('notifications/<int:pk>/', notifications_views.NotificationGetDeleteView.as_view()),
    path('pet-listing/<int:pk>/applications/', applications_views.ApplicationCreateListView.as_view()),
    path('applications/<int:pk>/', applications_views.ApplicationGetUpdateView.as_view()),
]
