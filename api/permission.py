from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True
       
        return obj.user_id == request.user

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' or request.user.is_superuser:
            return True
       
        return False
