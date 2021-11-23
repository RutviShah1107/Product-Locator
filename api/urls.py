from django.urls import path
from .views import transactionList, transaction_detail, arena_detail, transactionCount, userCount, arenaCount, arena_list_or_create

urlpatterns = [
    path('transaction/', transactionList, name="Transaction-List"),
    path('arena/', arena_list_or_create, name="Arena-List"),
    
    path('transaction/count/', transactionCount, name="Transaction-Count"),
    path('user/count/', userCount, name="User-Count"),
    path('arena/count/', arenaCount, name="Arena-Count"),

    path('transaction/<str:pk>/', transaction_detail, name="Transaction"),
    path('arena/<str:pk>/', arena_detail, name="Arena"),
]
