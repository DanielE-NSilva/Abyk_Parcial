const CRegistro = {};
const {encrypt, compare} = require('../helpers/handleBcrypt')
const DRegisto = require('../helpers/DLogin')
CRegistro.registrandose = async (req, res) => {
    console.log(req.body);
    if (req.body.password == req.body.Confirmpassword) {
      var DatosRegistroPersona = [req.body.Correo, await encrypt(req.body.password)]
      var DatosRegistroCliente = [req.body.Correo, req.body.Nombre, req.body.Apellido];
      req.getConnection((err, connection) => {
        console.log("Dentro");
        const queryUno = connection.query('INSERT INTO persona(Correo,Contraseña) value (?,?)', DatosRegistroPersona, (err, res) => {
          if(err != null){
            console.log("Variable err")
            console.log(err.sqlMessage)
            
          }else{
            DRegisto.IngresandoDato(req.body.Nombre,req.body.Apellido)
            console.log("Variable res")
            console.log(res);
            const queryDos = connection.query('INSERT INTO cliente(Correo,Nombre,Apellido) value (?,?,?)', DatosRegistroCliente, (err, connection) => {
              console.log("Correcto Guardo en Cliente");
            });
          }
        });
        res.status(201).send('Usuario creado Correctamente');
        res.render("/")
      });
    } else {
      var Registrado = [];
      Registrado.Registrado = "Constraseña Incorrectas";
      res.render('registrarse', { data: Registrado });
    }
  };
  
  module.exports = CRegistro;