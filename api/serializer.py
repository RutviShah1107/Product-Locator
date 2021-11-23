from django.contrib.auth import get_user_model
from rest_auth.models import TokenModel
from rest_framework import serializers
from .models import Transaction, Arena

User = get_user_model()

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'is_superuser')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('product_id', 'location_id', 'user_id', 'row', 'col', 'date')

    def validate(self, data):

        if (0 < data['row'] <= data['location_id'].rows) and (0 < data['col'] < data['location_id'].cols):
            return data

        raise serializers.ValidationError("Invalid Row or Column")

class ArenaSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    
    class Meta:
        model = Arena
        depth = 1
        fields = ('location_id', 'rows', 'cols', 'products')

    def get_products(self, instance):
        p = instance.products.all().order_by('row', 'col')
        return TransactionSerializer(p, many=True).data
