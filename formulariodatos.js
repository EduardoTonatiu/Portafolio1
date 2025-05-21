function leer() {
    // Referencia por pseudoclase
    var nom = document.forms["formulario"].elements[0].value;
    // Referencia por id
    var clave = document.getElementById("pass").value;
    // Referencia por etiqueta
    var carrera1 = document.getElementsByTagName("select")[0].value;
    
    // Referencia por name
    var gen = document.getElementsByName("genero");
    var g = "";

    for (var i = 0; i < gen.length; i++) { // Corregido "length"
        if (gen[i].checked) {
            g = gen[i].value;
            break; // Romper el bucle al encontrar el seleccionado
        }
    }

    // Referencia por id
    var ok = document.getElementById("casilla").checked;
    
    document.getElementById("resultado").innerHTML =
        "<br>Tu nombre es: " + nom +
        "<br>Tu password: " + clave +
        "<br>Tu carrera es: " + carrera1 +
        "<br>Tu género es: " + g +
        "<br>Aceptación de los acuerdos: " + ok;
}
