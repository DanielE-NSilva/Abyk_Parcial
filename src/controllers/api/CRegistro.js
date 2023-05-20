const CRegistro = {};
const { encrypt, compare } = require('../../helpers/handleBcrypt')
const DatosRegisto = require('../../helpers/Ddb')

CRegistro.registrandose = async (reqPagina, resPagina) => {
  var Datos = [];
  if (reqPagina.body.password == reqPagina.body.Confirmpassword) {
    var DatosRegistroPersona = [reqPagina.body.Correo, await encrypt(reqPagina.body.password)]
    var DatosRegistroCliente = [reqPagina.body.Correo, reqPagina.body.Nombre, reqPagina.body.Apellido];
    reqPagina.getConnection((err, connection) => {
      connection.query('INSERT INTO persona(Correo,Contraseña) value (?,?)', DatosRegistroPersona, (err, res) => {
        if (err) {
          Datos.Usuario = { user: false }
          jsonList = {
            "status": 400,
            "mensaje": "Error I" + err
          }
          resPagina.status(400).json(jsonList);
        } else {
          connection.query('INSERT INTO cliente(Correo,Nombre,Apellido) value (?,?,?)', DatosRegistroCliente, (err, connection) => {
            if (err) {
              jsonList = {
                "status": 400,
                "mensaje": "Error II " + err
              }
              resPagina.status(400).json(jsonList);
            } else
              jsonList = {
                "status": 201,
                "mensaje": "Usuario Registrado correctamente"
              }
            
            resPagina.status(201).json(jsonList);
          });
        }
      });
    });
  } else {
    Datos.Alert = {
      alert: true,
      alertTitle: 'Registro de Cliente',
      alerMessage: 'Constraseña de Confirmacion erronea ',
      alertIcon: 'error',
      showConfirmButton: false,
      time: 5000,
      ruta: '/registrarse',
      Script: 'script'
    }
    respagina.render('registrarse', { data: Datos })
  }
};

module.exports = CRegistro;