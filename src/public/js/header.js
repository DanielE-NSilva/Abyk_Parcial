function mostrar(id) {
    if (id == "Ninguno") {
        $("#estudiante").hide();
        $("#docente").hide();
        $("#registrarB").hide();
    }

    if (id == "estudiante") {
        $("#estudiante").show();
        $("#docente").hide();
        $("#registrarB").show();
    }

    if (id == "docente") {
        $("#estudiante").hide();
        $("#docente").show();
        $("#registrarB").show();
    }
}

function TipoEstudioF(id) {

    if (id != "Hijo") {
        $("#TipoEstudio").hide();
    }
    if (id == "Hijo") {
        $("#TipoEstudio").show();
    }
}