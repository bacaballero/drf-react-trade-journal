from cmath import log
from django.urls import URLPattern, include, path
from rest_framework import routers
from trades import views
from .views import login, logout, UserAPI

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'trades', views.TradeViewSet, basename='trade')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/login/', login),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', logout),
]
