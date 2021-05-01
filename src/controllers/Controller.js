//Crear un objeto
const controller = {};

// Sin Loguearse
//Inicio
controller.index = (req, res) => {
  res.render('index');
};
// Pruebas solamente con cabezado y pie de pagina
controller.indexPruebas = (req, res) => {
  res.render('indexDePrueba');
};

//Login
controller.login = (req, res) => {
  var Persona = [];
  Persona.Registrado = null;
  res.render('login', { data: Persona });
};

controller.Logeado = (req, res) => {
  const DatosLogin = [req.body.Correo, req.body.password];
  req.getConnection((err, connection) => {
    console.log("Dentro ");
    DatosLoginConsulta(DatosLogin, connection, res);
  });
};
//Registrar
controller.registrarse = (req, res) => {
  res.render('registrarse');
};
controller.registrandose = (req, res) => {
  res.render('registrarse');
};

//Carrito
controller.carrito = (req, res) => {
  res.render('carrito');
};

//Seccion Hombre
controller.seccionHombre = (req, res) => {
  res.render('seccionHombre');
};

//Quienes Somos
controller.quienesSomos = (req, res) => {
  res.render('quienesSomos');
};
















//Funciones para utilizacion en la respuesta de antecedentes
function DatosLoginConsulta(datosLogin, connection, res) {
  const query = connection.query('SELECT * FROM persona WHERE Correo = ? AND Contraseña= ? ;',
    datosLogin, async (err, Persona) => {
      if (Persona[0] == undefined) {
        console.log("Usuario y Constraseña Incorrecta");
        var Registrado = [];
        Registrado.Registrado = "Usuario o Constraseña Incorrecta";
        res.render('login', { data: Registrado });
      } else {
        //FALTA QUE RENDERICE DONDE DEBE SER
        console.log("Usuario y Constraseña Correcta");
        res.render('login');
      }
    });
}



//Funciones y controladores anteriores 


function DocentesConsulta(datos, connection, res) {
  const query = connection.query('SELECT * FROM docentes where NroDocumentoDocente = ? AND EmailDocente= ? ;',
    datos[0], async (err, Persona) => {
      if (Persona[0] == undefined) {
        res.redirect('/');
      } else {
        const encontrado = await Antecedentes.find({ NroDocumento: datos[0][0] }).countDocuments();
        if (encontrado >= 1) {
          Persona[0].encontrado = 'Si';
        } else {
          Persona[0].encontrado = 'No';
        }

        res.render('Docente', { data: Persona[0] });

      }
    });
}

function EleccionDoE(datos, connection, res) {
  if (datos[1] == "estudiantes") {
    EstudiantesConsulta(datos, connection, res);
  } else {
    if (datos[1] == "docentes") {
      DocentesConsulta(datos, connection, res);
    } else {
      res.redirect('/');
    }
  }
}

controller.Bienvenido = (req, res) => {
  const data = req.body;
  const datos = [[parseInt(data.IDdocumento, 10), data.email], data.TipoDeUsuario];
  req.getConnection((err, connection) => {
    console.log(data);
    EleccionDoE(datos, connection, res);
  });
}

controller.registrar = (req, res) => {
  const data = {};
  res.render('Registrar', { data });
};

controller.antecedentes = (req, res) => {
  const datos = {}
  datos.TipoDeUsuario = req.body.TipoDeUsuario;
  datos.NroDocumento = req.body.IDdocumento;
  datos.EmailEstudiante = req.body.email;
  res.render('Antecedentes', { data: datos });  // 
};

controller.pasaporte = async (req, res) => {
  const datos = {};
  datos.NroDocumento = req.body.IDdocument;
  res.render('Pasaporte', { data: datos });  // 
};

controller.antecedentesGuardar = async (req, res) => {
  const data = req.body;
  const datosAntecedentes = new Antecedentes({
    NroDocumento: data.NroDocumento,
    Diabetes: data.Diabetes,
    Malnutricion: data.Malnutricion,
    mayorde70: data.ConvivePersonaMayor,
    tabaquismo: data.Tabaquismo,
    E_pulmonares: data.EnfermedadesPulmonares,
    E_renales: data.EnfermedadesRenalesHepaticas,
    E_autoinmunes: data.EnfermedadesAutoimunes,
    prestacionAsistencial: data.ConviveAsistencaSalud,
    TratamientoMedico: data.TratamientoXAntecedentes,
    HipertensionArterial: data.EnfermedadesCardiacas,
    Embarazo: data.EmbarazoA
  });
  const datos = [[data.NroDocumento, data.email], data.TipoDeUsuario];

  await datosAntecedentes.save();

  req.getConnection((err, connection) => {
    EleccionDoE(datos, connection, res);
  });
}

controller.pasaporteGuardar = async (req, res) => {
  const datos = req.body;
  console.log(req);
  const datosPasaporte = new Pasaporte({
    NroDocumento: datos.NroDocumento,
    Tos: datos.Tos,
    DolorGarganta: datos.DolorGarganta,
    Fiebre: datos.Fiebre,
    SecrecionNasal: datos.SecrecionNasal,
    MalestarGeneral: datos.MalestarGeneral,
    Diarrea: datos.Diarrea,
    DisminucionSentidos: datos.DisminucionSentidos,
    DTabaquismo: datos.DTabaquismo,
    DificultadRespiratoria: datos.DificultadRespiratoria,

  });

  await datosPasaporte.save();
  req.body.alert("Texto a mostrar");

  res.redirect('/');
}

controller.sintomas = (req, res) => {
  res.render('sintomas');  // 
};


function InfoFamiliar(data, conn, res) {
  conn.query('SELECT * FROM familia WHERE NroDocumento = ? ;', data.NroDocumento, (err, familia) => {
    if (err) {
      res.json(err);
    }
    familia.NroDocumento = data.NroDocumento;

    res.render('infoFamiliar', {
      data: familia   // LLENAR LOS DATOS DENTRO DE familia
    });
  });
}

//CRUD INFORMACION FAMILIAR
controller.infoFamilia = (req, res) => {  //FUNCION NOMBRE DEL METODO .LIST
  const data = req.params;
  req.getConnection((err, conn) => { // PODER CONECTARSE A MYSQL
    InfoFamiliar(data, conn, res);
  });
};

controller.infoFamiliarGuardar = (req, res) => {
  console.log(req.body);
}

controller.save = (req, res) => { //FUNCION PARA SALVAR 
  const data = req.body; // DATA CONTIENE LOS DATOS DEL FORM

  data.NroDocumento = parseInt(data.NroDocumento, 10);
  req.getConnection(async (err, connection) => {
    const query = await connection.query('INSERT INTO familia set ?', data, (err, familiar) => {
      if (err) {
        res.json(err);
      }
      res.redirect('/infoFamiliar/' + data.NroDocumento)
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM familia WHERE id = ?", [id], (err, rows) => {
      res.render('infoFamiliar_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newFamilia = req.body;
  console.log(newFamilia);
  req.getConnection((err, conn) => {

    console.log('entro');
    conn.query('UPDATE familia set ? where id = ?', [newFamilia, id], (err, rows) => {
      res.redirect('/infoFamiliar/' + newFamilia.NroDocumento)
    });
  });
};


controller.delete = (req, res) => {
  const { id } = req.params;


  req.getConnection((err, connection) => {
    const query = connection.query('Select NroDocumento FROM familia WHERE Id = ?', [id], (err, rows) => {
      const data = rows[0];
      connection.query('DELETE FROM familia WHERE Id = ?', [id], (err, rows) => {
        res.redirect('/infoFamiliar/' + data.NroDocumento);
      });
    });
  });
}


//Exporta el objeto
module.exports = controller;