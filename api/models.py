from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class TransactionManager(models.Manager):
    def search(self, data, current_user):
        queryset = self.all()
        if not current_user.is_superuser:
            queryset = queryset.filter(user_id=current_user)
        if 'product_id' in data and data['product_id']:
            queryset = queryset.filter(product_id__startswith=data['product_id'])
        if 'location_id' in data and data['location_id']:
            queryset = queryset.filter(location_id__location_id__startswith=data['location_id'])
        if 'user_id' in data and data['user_id']:
            queryset = queryset.filter(user_id__pk__startswith=data['user_id'])
        if 'date' in data and data['date']:
            queryset = queryset.filter(date__gte=data['date'])

        return queryset


class Arena(models.Model):
    location_id = models.CharField(max_length=100, primary_key=True)
    rows = models.IntegerField()
    cols = models.IntegerField()

    def __str__(self):
        return self.location_id

class Transaction(models.Model):
    product_id = models.CharField(max_length=100, primary_key=True)
    location_id = models.ForeignKey(Arena, on_delete=models.CASCADE, related_name='products')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    row = models.IntegerField(null=True)
    col = models.IntegerField(null=True)

    date = models.DateField(auto_now_add=True)

    objects = TransactionManager()

    class Meta:
        unique_together = (('location_id', 'row', 'col'),)

    def __str__(self):
        return self.product_id
