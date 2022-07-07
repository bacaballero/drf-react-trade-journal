from logging import raiseExceptions
from multiprocessing import context
from operator import ge
from smtplib import quoteaddr
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from trades.serializers import UserSerializer, TradeSerializer
from trades.models import Trade
from rest_framework.authtoken.models import Token
# Create your views here.


@csrf_exempt
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user, context={'request': request})
    return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_200_OK)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # @action(detail=True, methods=['post'])
    def create(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'user': serializer.data,
            'token': token.key},
            status=status.HTTP_201_CREATED)


class TradeViewSet(viewsets.ModelViewSet):
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer

    '''
    def get_queryset(self):
        return Trade.objects.filter(owner=self.request.user)
    '''

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
