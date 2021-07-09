var contenidoPagina = $('div.contenido-general').html();
f_esconder();

function f_esconder(){
    $( "div.contenido-general" ).html("");
}

function f_mostrar(){
    //y escondemos el login
    $('div.login').html("");
    $( "div.contenido-general" ).html(contenidoPagina);
    f_listarDatos();
}

function f_validar(){

    var usuario = $('#in_usuario').val();
    var contrasena = $('#in_pass').val();
    var encontrado = false;

    $.getJSON('http://127.0.0.1:8000/api/login/', function(data){

        var res = data;
        console.log(res);

        res.forEach(element => {
            if(element.usuario == usuario && element.contrasena == contrasena){
                encontrado = true;
            }

        });

        if(encontrado){
            alert('Ingreso OK');
            f_mostrar();
        }else{
            alert('Datos invalidos');
        }

    });
}

//crea la tabla y la agregamos al div correspondiente en el index
function f_listarDatos(){

    contTabla = "";
    var tabla = "<table>";

    $.getJSON('http://127.0.0.1:8000/api/listado/', function(data){
        
        var respuesta = data;

        respuesta.forEach(element => {
            
            if (element.codigo != 0){
                tabla += "<tr>";

                tabla += "<td>"+ "||" + element.id + "||" + "</td>"

                tabla += "<td>"+ "||"+ element.codigo + "||" + "</td>"

                tabla += "<td>"+ "||"+ element.nombre + "||" + "</td>"

                tabla += "<td>"+ "||"+ element.consola + "||" + "</td>"

                tabla += "<td>"+ "||"+ element.valor + "||" + "</td>"

                tabla += "<td>"+ "||"+ element.estado + "||" + "</td>"

                tabla += "</tr>";
            }
        });
        
        tabla += "</table>";
        $( "div.contTabla" ).html(tabla);
    });
}

function f_guardarJuego(){

    console.log("funciona siquiera?");

    var codigoJuego = $('#txt_codigo').val();
    var nombreJuego = $('#txt_nombre').val();
    var consolaJuego = $('#txt_consola').val();
    var valorJuego = $('#txt_valor').val();
    var estadoJuego = $('#txt_estado').val();

    var jsonPOST = {
        codigo: codigoJuego,
        nombre: nombreJuego,
        consola: consolaJuego,
        valor: valorJuego,
        estado: estadoJuego
    };

    $.post("http://127.0.0.1:8000/api/agregar/", jsonPOST, function(data , status){
        
        alert("Data: " + data + "\nStatus" + status);
        
    } );
}

function f_eliminar(){
    var id_eliminar = $('#txt_codigo_eliminar').val();

    $.ajax({
        url: 'http://127.0.0.1:8000/api/eliminar/' + id_eliminar,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(result){
            alert(result+ " Registro Eliminado");
        },
        error: function(msg, error){
            alert(msg, error);
        }
    });
}