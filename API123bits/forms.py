from django import forms
from app123bits.models import Juego, Usuario

class FormJuegoNuevo(forms.ModelForm):
    class Meta:
        model = Juego
        fields = ('codigo','nombre', 'consola',
                  'valor', 'estado')

class FormUsuario(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('usuario', 'contrasena') 