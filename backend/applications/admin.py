from django.contrib import admin
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'program', 'created_at']
    list_filter = ['program', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
