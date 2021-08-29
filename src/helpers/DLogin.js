const DatosLogin = {};

var Nombre;
var Apellido;

DatosLogin.IngresandoDato = (Nombre, Apellido) =>{
    this.Nombre =Nombre;
    this.Apellido = Apellido;
};
DatosLogin.getNombre = () =>  {
    return Nombre;
};
DatosLogin.getApellido = () =>  {
    return Apellido;
};

module.exports = DatosLogin;