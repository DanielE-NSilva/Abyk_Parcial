const jwt = require('jsonwebtoken')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { promisify } = require('util')
const conexion = require('../Database/db')
var Datos = [];
//Login

exports.login = (req, respagina) => {
  Datos.Alert = []
  if (req.user)
    Datos.Usuario = req.user
  else
    Datos.Usuario = {user:false}
  console.log(Datos)
  respagina.render('login', { data: Datos });
};

exports.Logeado = async (reqpagina, respagina) => {
  var tabla;
  if(reqpagina.body.admin =='Administrador'){
    tabla=process.env.administrador
  }else if(reqpagina.body.admin =='Cliente'){
    tabla=process.env.cliente
  }
  console.log("Tabla despues de if " +tabla)

  try {
    var DatosLogin = [reqpagina.body.Correo, reqpagina.body.password];
    reqpagina.getConnection((err, connection) => {
      const queryUno = connection.query('SELECT persona.Correo, Contraseña, '+tabla+'.nombre ' +
        'FROM persona JOIN '+tabla+' '+
        'ON persona.Correo=cliente.Correo ' +
        'WHERE persona.Correo = ?', DatosLogin[0], (err, result) => {
          Datos.Alert = {
            alert: true,
            alertTitle: 'Inicio De Seccion ',
            alerMessage: 'CConstraseña, Usuario o Perfil incorrecto ',
            alertIcon: 'error',
            showConfirmButton: false,
            time: 2000,
            ruta: '/login',
            Script: 'script'
          }
          if (err) {
            console.log(err)
            respagina.render('login', { data: Datos })
          } else {
            if (result.length == 0) {
              respagina.render('login', { data: Datos })
            } else {
              if (!compare(reqpagina.body.password, result[0].Contraseña)) {
                respagina.render('login', { data: Datos })
              } else {
                const Correo = result[0].Correo;
                const Nombre = result[0].nombre;
                const token = jwt.sign({ Correo: Correo },
                  process.env.JwtSecreto, {
                  expiresIn: process.env.JwtTiempoExpira
                })

                const cookiesOptions = {
                  expires: new Date(Date.now() + process.env.JwtCookieExpires * 24 * 60 * 60 * 1000),
                  httpOnly: true
                }
                respagina.cookie('jwt', token, cookiesOptions);
                Datos.Alert = {
                  alert: true,
                  alertTitle: 'Inicio de Seccion',
                  alerMessage: 'Bienvenido ' + Nombre + ' ' + Correo,
                  alertIcon: 'success',
                  showConfirmButton: false,
                  time: 2000,
                  ruta: '/',
                  Script: 'script'
                }
                respagina.render('login', { data: Datos })
              }
            }
          }
        });
        console.log(queryUno.sql)
    });
  } catch (error) {
    console.log("Error" + error)
  }
};

exports.isAutheticated = async (reqpagina, res, next) => {
  console.log
  if (reqpagina.cookies.jwt) {
    try {
      console.log("Antes Deco")
      const decodificada =  await promisify(jwt.verify)(reqpagina.cookies.jwt, process.env.JwtSecreto)
      console.log(decodificada)
      conexion.query('SELECT persona.Correo, Contraseña, cliente.nombre ' +
        'FROM persona JOIN cliente ' +
        'ON persona.Correo=cliente.Correo ' +
        'WHERE persona.Correo = ?', [decodificada.Correo], (err, result) => {
          if (!result) { return next() }
          reqpagina.user = {Nombre:result[0].nombre, Perfil: true}
          console.log(result[0].nombre)
          return next()
        });

    } catch (error) {
      console.log(error)
      return
    }
  } else {
    return next()
  }
}

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  Datos.Alert = {
    alert: true,
    alertTitle: 'Inicio De Seccion ',
    alerMessage: 'Constraseña, Usuario o Perfil incorrecto ',
    alertIcon: 'error',
    showConfirmButton: false,
    time: 2000,
    ruta: '/login',
    Script: 'script'
  }
  Datos.Usuario = {user:false}
  console.log(Datos)
  respagina.render('login', { data: Datos });
}