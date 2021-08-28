const CInicio = {};
const {encrypt, compare} = require('../helpers/handleBcrypt')

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


module.exports = CInicio;