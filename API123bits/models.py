from django.db import models

# Create your models here.
class Usuario(models.Model):
    usuario = models.CharField(max_length=50, null=False)
    contrasena = models.CharField(max_length=50, null=False)

    def __str__(self) -> str:
        return self.usuario + ' , ' + self.contrasena