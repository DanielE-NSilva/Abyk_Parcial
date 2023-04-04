const jwt = require('jsonwebtoken')
const { encrypt, compare } = require('../../helpers/handleBcrypt')
const { promisify } = require('util')
const conexion = require('../../Database/db')
var Datos = [];

//Login
exports.login = (req, respagina) => {
  Datos.Alert = []
  if (req.user)
    Datos.Usuario = req.user
  else
    Datos.Usuario = {user:false}
  respagina.render('login', { data: Datos });
};

exports.Logeado = async (reqpagina, respagina) => {
  var tabla;
  if(reqpagina.body.admin =='Administrador'){
    tabla=process.env.administrador
  }else if(reqpagina.body.admin =='Cliente'){
    tabla=process.env.cliente
  }
  try {
    var DatosLogin = [reqpagina.body.Correo, reqpagina.body.password];
    reqpagina.getConnection((err, connection) => {
      const queryUno = connection.query('SELECT persona.Correo, Perfil, Contraseña, '+tabla+'.nombre ' +
        'FROM persona JOIN '+tabla+' '+
        'ON persona.Correo='+tabla+'.Correo ' +
        'WHERE persona.Correo = ?', DatosLogin[0], async (err, result) => {
          Datos.Alert = {
            alert: true,
            alertTitle: 'Inicio De Seccion ',
            alerMessage: 'Contraseña, Usuario o Perfil incorrecto ',
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
              if ( !(await compare(reqpagina.body.password, result[0].Contraseña))) {
                respagina.render('login', { data: Datos })
              } else {
                const Correo = result[0].Correo;
                var perfil;
                if(result[0].Perfil == 0)
                  perfil = false
                else
                  perfil = true

                const Nombre = result[0].nombre;
                const token = jwt.sign({ Correo:Correo, Perfil:perfil},
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
                Datos.Usuario = {user:false,perfil:false}
                respagina.render('login', { data: Datos })
              }
            }
          }
        });
    });
  } catch (error) {
    console.log("Error" + error)
  }
};

exports.isAutheticated = async (reqpagina, res, next) => {
  if (reqpagina.cookies.jwt) {
    try {
      const decodificada =  await promisify(jwt.verify)(reqpagina.cookies.jwt, process.env.JwtSecreto)
      var tabla;
      if(decodificada.Perfil){
        tabla = process.env.administrador
      }else {
        tabla = process.env.cliente
      }

      const Q = conexion.query('SELECT persona.Correo Contraseña,'+tabla+'.nombre ' +
        'FROM persona JOIN '+tabla+' ' +
        'ON persona.Correo='+tabla+'.Correo ' +
        'WHERE persona.Correo = ?', [decodificada.Correo], (err, result) => {
          if (!result) { return next() }
          if (result.length == 0) {return next()}
          reqpagina.user = {Nombre:result[0].nombre, Perfil: tabla}
   
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

exports.logout = (req, respagina) => {
  respagina.clearCookie('jwt');
  Datos.Alert = {
    alert: true,
    alertTitle: 'Inicio De Seccion ',
    alerMessage: 'Salida de Seccion Correcta ',
    alertIcon: 'success',
    showConfirmButton: false,
    time: 2000,
    ruta: '/login',
    Script: 'script'
  }
  Datos.Usuario = {user:false, perfil:false}
  respagina.render('login', { data: Datos });
}