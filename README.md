# Proyecto Django - Restaurante Playero

Sistema de gestión para restaurante desarrollado con Django.

## Comandos Básicos

### Activar el entorno virtual
```powershell
.\venv\Scripts\Activate.ps1
```

### Instalar dependencias
```powershell
python -m pip install -r requirements.txt
```

### Crear migraciones (después de modificar modelos)
```powershell
python manage.py makemigrations
```

### Aplicar migraciones
```powershell
python manage.py migrate
```

### Crear un superusuario (para acceder al admin)
```powershell
python manage.py createsuperuser
```

### Ejecutar el servidor de desarrollo
```powershell
python manage.py runserver
```

Luego accede a:
- **Sitio web**: http://127.0.0.1:8000/
- **Panel de administración**: http://127.0.0.1:8000/admin/

### Ejecutar el servidor en un puerto específico
```powershell
python manage.py runserver 8080
```

### Verificar el proyecto
```powershell
python manage.py check
```

## Estructura del Proyecto

```
Playero/
├── manage.py              # Script de gestión de Django
├── requirements.txt       # Dependencias del proyecto
├── playero/              # Configuración del proyecto
│   ├── settings.py       # Configuración
│   ├── urls.py          # URLs principales
│   └── wsgi.py          # Configuración WSGI
└── restaurante/          # Aplicación del restaurante
    ├── models.py         # Modelos de datos
    ├── views.py          # Vistas
    ├── admin.py         # Configuración del admin
    └── urls.py          # URLs de la app
```

## Funcionalidades Implementadas

### Menú del Restaurante
- **Carrusel de platos destacados**: Los platos marcados como "destacados" aparecen en un carrusel en la parte superior
- **Platos por categoría**: Los platos se organizan automáticamente por sus categorías (Pescados, Carnes, Ceviches, Sopas, Bebidas, etc.)
- **Diseño moderno**: Interfaz con fondo oscuro similar al diseño de referencia
- **Responsive**: Adaptado para dispositivos móviles y tablets

### Modelos
- **Categoria**: Categorías de platos con orden de visualización
- **Plato**: Platos con nombre, descripción, precio, imagen, categoría y opción de destacado

## Cómo Usar el Menú

1. **Crear categorías**: Ve al panel de administración y crea categorías (ej: "Pescados", "Carnes", "Ceviches", "Sopas", "Bebidas")
2. **Agregar platos**: Crea platos y asígnales una categoría
3. **Marcar destacados**: Marca la casilla "Destacado" en los platos que quieras mostrar en el carrusel
4. **Subir imágenes**: Agrega imágenes a los platos para mejorar la presentación
5. **Ver el menú**: Accede a http://127.0.0.1:8000/ para ver el menú completo

## Próximos Pasos

1. Agregar más funcionalidades (Pedidos, Reservas, etc.)
2. Mejorar el diseño según necesidades específicas
3. Agregar sistema de autenticación si es necesario
4. Implementar funcionalidades de pedidos online

