const CInicio = {};
//index
CInicio.index = (req, res) => {
  res.render('index');
};

//Contactenos
CInicio.contactos = (req, res) => {
  res.render('contactos');
};

//Quienes Somos
CInicio.quienesSomos = (req, res) => {
  res.render('quienesSomos');
};

//Registrar
CInicio.registrarse = (req, res) => {
  var Persona = [];
  Persona.Registrado = null;
  res.render('registrarse', { data: Persona });
};

CInicio.registrandose = (req, res) => {
  console.log(req.body);
  if (req.body.password == req.body.Confirmpassword) {
    var DatosRegistro = [req.body.Nombre, req.body.Apellido, req.body.Correo, req.body.password];
    req.getConnection((err, connection) => {
      console.log("Dentro");
      DatosRegistroConsulta(DatosRegistro, connection, res);
    });
  } else {
    var Registrado = [];
    Registrado.Registrado = "Constraseña Incorrectas";
    res.render('registrarse', { data: Registrado });
  }
};

module.exports = CInicio;