from operator import mod
from statistics import mode
from django.db import models

# Create your models here.


class Trade(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='trades', on_delete=models.CASCADE)
    date = models.DateField()
    symbol = models.CharField(max_length=8)
    quantity = models.IntegerField()

    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.name
