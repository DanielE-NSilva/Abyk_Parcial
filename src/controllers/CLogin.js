const Clogin = {}
//Login
Clogin.index = (req, res) => {
    res.render('index');
  };
  
  Clogin.login = (req, res) => {
    var Persona = [];
    Persona.Registrado = null;
    res.render('login', { data: Persona });
  };
  
  Clogin.Logeado = (req, res) => {
    var DatosLogin = [req.body.Correo, req.body.password];
    req.getConnection((err, connection) => {
      console.log("Dentro");
      DatosLoginConsulta(DatosLogin, connection, res);
    });
  };

module.exports = Clogin;