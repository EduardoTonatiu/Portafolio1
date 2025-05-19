// Captura los elementos del HTML
var botonAgregar = document.getElementById("botonAgregar");
var entradaTarea = document.getElementById("entradaTarea");
var listaTareas = document.getElementById("listaTareas");

// Evento para agregar tareas
botonAgregar.addEventListener("click", function() {
    var textoTarea = entradaTarea.value.trim(); 

     if (textoTarea !== "") { 
        var nuevaTarea = document.createElement("li");
        
 var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Ok";
         botonEliminar.onclick = function() {
          listaTareas.removeChild(nuevaTarea); 
     };

         nuevaTarea.textContent = textoTarea + " "; 
     nuevaTarea.appendChild(botonEliminar); 
         listaTareas.appendChild(nuevaTarea); 

 entradaTarea.value = ""; 
    }
});
