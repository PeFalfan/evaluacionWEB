from API123bits.forms import FormUsuario
from app123bits.models import Juego, Usuario
from API123bits.forms import FormJuegoNuevo
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class ListaJuegosView(View):
    def get(self, request):
        listaJuegos = Juego.objects.all()
        return JsonResponse(list(listaJuegos.values()), safe=False)

class DetalleJuegoView(View):
    def get(self, request, id):
        juego = Juego.objects.get(id = id)
        return JsonResponse(model_to_dict(juego))

class EliminarJuegoView(View):
    def delete(self, request, id):
        if request.method =='DELETE':
            try:
                res = Juego.objects.get(id=id)
                res.delete()
                return JsonResponse('OK', safe=False)
            except:
                return JsonResponse('ID NO SE ENCUENTRA REGISTRADO', safe=False)

@csrf_exempt      
def nuevoJuego(request):
    juego = Juego()

    if request.method=="POST":
        nuevoJuego = FormJuegoNuevo(request.POST, instance=juego)
        if nuevoJuego.is_valid():
            nuevoJuego.save()
            return JsonResponse('OK', safe=False)
        else:
            return JsonResponse('Formulario no válido!', safe=False)
    else:
        return JsonResponse('ERROR', safe=False)

@csrf_exempt
def listadoUsuarios(request):
    if request.method == "GET":
        infoUsuarios = Usuario.objects.all()
        return JsonResponse(list(infoUsuarios.values()), safe=False)
    else:
        return JsonResponse('Error de consulta.', safe=False)