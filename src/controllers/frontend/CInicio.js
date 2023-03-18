const CInicio = {};
const { encrypt, compare } = require('../../helpers/handleBcrypt')

var Datos = []
//index
CInicio.index = (req, res) => {
  Datos.Alert = []
  if (req.user){
    Datos.Usuario = {user:true, Nombre: req.user.Nombre, perfil:req.user.Perfil}
  } else
    Datos.Usuario = {user:false}
  res.render('index', { data: Datos });
};

//Contactenos
CInicio.contactos = (req, res) => {
  Datos.Alert = []
  if (req.user){
    Datos.Usuario = {user:true, Nombre: req.user.Nombre,perfil:req.user.Perfil}
  } else
    Datos.Usuario = {user:false}
  res.render('contactos', { data: Datos });
};

//Quienes Somos
CInicio.quienesSomos = (req, res) => {
  Datos.Alert = []
  if (req.user){
    Datos.Usuario = {user:true, Nombre: req.user.Nombre,perfil:req.user.Perfil}
  } else
    Datos.Usuario = {user:false}
  res.render('quienesSomos', { data: Datos });
};

//Registrar
CInicio.registrarse = (req, res) => {
  Datos.Alert = []
  if (req.user){
    Datos.Usuario = {user:true, Nombre: req.user.Nombre, perfil:req.user.Perfil}
  } else
    Datos.Usuario = {user:false}
  res.render('registrarse', { data: Datos });
};

module.exports = CInicio;