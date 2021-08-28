const CRegistro = {};
const {encrypt, compare} = require('../helpers/handleBcrypt')

CRegistro.registrandose = async (req, res) => {
    console.log(req.body);
    if (req.body.password == req.body.Confirmpassword) {
      var DatosRegistroPersona = [req.body.Correo, await encrypt(req.body.password)]
      var DatosRegistroCliente = [req.body.Correo, req.body.Nombre, req.body.Apellido];
      req.getConnection((err, connection) => {
        console.log("Dentro");
        const queryUno = connection.query('INSERT INTO persona(Correo,Contraseña) value (?,?)', DatosRegistroPersona, (err, connection) => {
          console.log("Correcto Guardo en Personas");
        });
        const queryDos = connection.query('INSERT INTO cliente(Correo,Nombre,Apellido) value (?,?,?)', DatosRegistroCliente, (err, connection) => {
            console.log("Correcto Guardo en Cliente");
        });
        console.log(queryUno)
        res.sta
      });
    } else {
      var Registrado = [];
      Registrado.Registrado = "Constraseña Incorrectas";
      res.render('registrarse', { data: Registrado });
    }
  };
  
  module.exports = CRegistro;