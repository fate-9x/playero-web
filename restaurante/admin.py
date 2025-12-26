from django.contrib import admin
from .models import Categoria, Plato


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'orden', 'activa', 'created_at')
    list_filter = ('activa', 'created_at')
    search_fields = ('nombre', 'descripcion')
    ordering = ('orden', 'nombre')


@admin.register(Plato)
class PlatoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'disponible', 'destacado', 'created_at')
    list_filter = ('categoria', 'disponible', 'destacado', 'created_at')
    search_fields = ('nombre', 'descripcion')
    list_editable = ('disponible', 'destacado')
    ordering = ('categoria', 'nombre')
    fieldsets = (
        ('Información del Plato', {
            'fields': ('nombre', 'descripcion', 'categoria', 'precio')
        }),
        ('Imagen', {
            'fields': ('imagen',)
        }),
        ('Estado', {
            'fields': ('disponible', 'destacado')
        }),
    )
