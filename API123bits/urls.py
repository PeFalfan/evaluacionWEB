from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import url
from .import views


urlpatterns = [

    path('listado/', views.ListaJuegosView.as_view(), name='listado_juegos' ),
    path('listado/<int:id>', views.DetalleJuegoView.as_view(), name='juego'),
    path('eliminar/<int:id>', csrf_exempt(views.EliminarJuegoView.as_view()), name='eliminar'),
    path('agregar/', views.nuevoJuego),
    path('login/', views.listadoUsuarios),
]