function leer(){
   //referencia por pseudoclase
	var nom=document.forms["formulario"].elements[0].value;
//Referencia por id
	var clave=document.getElementById("pass").value;
	//Referencia por Etiquetea
	var carrera1=document.getElementsByTagName("select")[0].value;
	
	//referencia por name
	var gen=document.getElementsByName("genero");
	var g,i;

	for(i=0;i<gen.lenght;i++)
	{
		if(gen[i].checked)
			g=gen[i].value;

	}

	//Referencia por id
	var ok=document.getElementById("casilla").checked;
	
	document.getElementById("resultado").innerHTML=
	"\<br>tu nombre es:" +nom+
	"\<br>Tu password:" +clave+
	"\<br>tu carrera es":+carrera1+
	"\<br>Tu género es: "+g+
	"\<br> Aceptación de los acuerdos: "+ok;


}