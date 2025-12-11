from django.shortcuts import render
from .models import Categoria, Plato


def menu(request):
    """Vista principal del menú del restaurante"""
    # Obtener platos destacados para el carrusel
    platos_destacados = Plato.objects.filter(
        destacado=True, 
        disponible=True
    ).select_related('categoria')
    
    # Obtener todas las categorías activas con sus platos disponibles
    categorias = Categoria.objects.filter(
        activa=True
    ).prefetch_related(
        'platos'
    ).order_by('orden', 'nombre')
    
    # Filtrar solo platos disponibles en cada categoría
    for categoria in categorias:
        categoria.platos_disponibles = categoria.platos.filter(disponible=True)
    
    context = {
        'platos_destacados': platos_destacados,
        'categorias': categorias,
    }
    
    return render(request, 'restaurante/menu.html', context)
