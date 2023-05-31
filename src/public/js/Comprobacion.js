
function EvaluandoAntecedentes () {
    let Encontrado = document.getElementById('Encontrado').value;
    console.log(Encontrado);
    if (Encontrado == "Si"){
        console.log('Encontrado no necesita realizar antecedentes');
        document.getElementById('btn-Antecedentes').setAttribute('disabled','true');
        document.getElementById('btn-Antecedentes').setAttribute('style','background-color: brown;');
    }else{
        console.log('No Encontrado debe hacer la encuesta antecedentes');
        document.getElementById('btn-encuesta').setAttribute('disabled','true');
        document.getElementById('btn-encuesta').setAttribute('style','background-color: chocolate;');
       
        document.getElementById('btn-infofamilia').setAttribute('disabled','true');
        document.getElementById('btn-infofamilia').setAttribute('style','background-color: chocolate;');
    }
}

window.onload = EvaluandoAntecedentes();