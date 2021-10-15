from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'id', 'phone')

admin.site.register(Profile, ProfileAdmin)
