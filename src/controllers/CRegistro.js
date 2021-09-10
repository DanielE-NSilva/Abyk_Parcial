const CRegistro = {};
const { encrypt, compare } = require('../helpers/handleBcrypt')
const DatosRegisto = require('../helpers/Ddb')

CRegistro.registrandose = async (req, respagina) => {
  var Datos = [];
  if (req.body.password == req.body.Confirmpassword) {
    var DatosRegistroPersona = [req.body.Correo, await encrypt(req.body.password)]
    var DatosRegistroCliente = [req.body.Correo, req.body.Nombre, req.body.Apellido];
    req.getConnection((err, connection) => {
      connection.query('INSERT INTO persona(Correo,Contraseña) value (?,?)', DatosRegistroPersona, (err, res) => {
        if (err) {
          Datos.Alert = {
            alert: true,
            alertTitle: 'Registro de Cliente',
            alerMessage: 'Correo electronico Registrado por favor intente nuevamente ',
            alertIcon: 'error',
            showConfirmButton: false,
            time: 5000,
            ruta: '/registrarse',
            Script: 'script'
          }
          Datos.Usuario = { user: false }
          respagina.render('registrarse', { data: Datos })
        } else {
          connection.query('INSERT INTO cliente(Correo,Nombre,Apellido) value (?,?,?)', DatosRegistroCliente, (err, connection) => {
            if (err)
              console.error(err)
            else
              Datos.Alert = {
                alert: true,
                alertTitle: 'Registro de Cliente',
                alerMessage: 'Satisfactorio Registro',
                alertIcon: 'success',
                showConfirmButton: false,
                time: 5000,
                ruta: '/login',
                Script: 'script'
              }
            Datos.Usuario = { user: false }
            respagina.render('registrarse', { data: Datos })
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