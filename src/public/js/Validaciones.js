document.getElementById('email').addEventListener('input', function () {
    campo = document.getElementById('email').value;
    valido = document.getElementById('ValidoEmail');
    Erroneo = document.getElementById('ErroneoEmail');
    emailRegex = /([a-z]{5,10}[0-9]{5} |)(@elpoli.edu.co)$/;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo)) {
        Erroneo.style.display = "none";
        valido.style.display = "block";
    } else {
        document.getElementById('TiposDeUsuario').value = 'Ninguno'; 
        valido.style.display = "none";
        Erroneo.style.display = "block";
        document.getElementById('btn-inicioSesion').setAttribute('disabled','true');
        document.getElementById('btn-inicioSesion').setAttribute('style','background-color: brown;');
    }
});

document.getElementById('IDdocument').addEventListener('input', function () {
    campo = document.getElementById('IDdocument').value;
    valido = document.getElementById('ValidoID');
    Erroneo = document.getElementById('ErroneoID');
    idlRegex = /^\d{10,14}$/;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (idlRegex.test(campo)) {
        Erroneo.style.display = "none";
        valido.style.display = "block";
        document.getElementById('TiposDeUsuario').removeAttribute('disabled');
    } else {
        valido.style.display = "none";
        Erroneo.style.display = "block";
        document.getElementById('TiposDeUsuario').value = 'Ninguno'; 
        document.getElementById('btn-inicioSesion').setAttribute('disabled','true');
        document.getElementById('btn-inicioSesion').setAttribute('style','background-color: brown;');
    }
});

document.getElementById('TiposDeUsuario').addEventListener('input', function () {
    campoemail = document.getElementById('email').value;
    emailRegex = /.*@elpoli.edu.co$/;
    campoIDdocument = document.getElementById('IDdocument').value;
    idlRegex = /^\d{10,14}$/;
    
    if (emailRegex.test(campoemail) || campoIDdocument.test(idlRegex)) {
        console.log('Hola')
        document.getElementById('btn-inicioSesion').removeAttribute('style');
        document.getElementById('btn-inicioSesion').removeAttribute('disabled');
    } else {
        document.getElementById('btn-inicioSesion').setAttribute('disabled','true')
        document.getElementById('btn-inicioSesion').setAttribute('style','background-color: brown;');
    }
});

