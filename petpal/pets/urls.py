from django.urls import path
from .views import comments_views, notifications_views, applications_views
from .views import pets_views
urlpatterns = [ 
    path("pet-listings/manage/<int:shelter_id>/pet/<int:pet_id>/", pets_views.ShelterPetsRetrieveUpdateDestroy.as_view()),
    path("pet-listings/manage/<int:shelter_id>/pet/", pets_views.ShelterPetsCreate.as_view()),
    path("pet-listings/manage/<int:shelter_id>/", pets_views.ShelterPetsList.as_view()),
    path("pet-listings/<int:pet_id>/", pets_views.UserPetsRetrieve.as_view()),
    path("pet-listings/", pets_views.UserPetsList.as_view()),
    path('comments/reviews/<int:pk>/review/', comments_views.ShelterCommentCreateView.as_view()),
    path('comments/reviews/<int:pk>/replies/', comments_views.ShelterCommentReplyCreateView.as_view()),
    path('comments/reviews/<int:pk>/', comments_views.ShelterCommentListView.as_view()),
    path('comments/application/<int:pk>/message/', comments_views.ApplicationCommentCreateView.as_view()),
    path('comments/application/<int:pk>/', comments_views.ApplicationCommentListView.as_view()),
    path('notifications/user/<int:pk>/', notifications_views.NotificationListView.as_view()),
    path('notifications/user/<int:pk>/notification/', notifications_views.NotificationCreateView.as_view()),
    path('notifications/<int:pk>/', notifications_views.NotificationGetDeleteView.as_view()),
    path('applications/', applications_views.ApplicationCreateListView.as_view()),
    path('applications/<int:pk>/', applications_views.ApplicationGetUpdateView.as_view()),
]
