const mysql = require('mysql')
console.log(process.env.Dbroot)
const Datosdb = require('../helpers/Ddb')

const conexion = mysql.createConnection({
    host: Datosdb.DbHost,
    user: Datosdb.DbUser,
    password: Datosdb.DbPassword,
    port: Datosdb.Dbport,
    database: Datosdb.DbDatabase
});

conexion.connect((err) => {
    if (err) {
        console.log('El error de conexion es A ' + err)
        console.log("El host es variable: ", Datosdb.DbHost)
        console.log("El host es env: ", process.env.DbHost)
        console.log("El port es variable: ", Datosdb.Dbport)
        console.log("El port es env: ", process.env.Dbport)
        console.log("El pass es variable: ", Datosdb.DbPassword)
        console.log("El pass es env: ", process.env.DbPassword)
        console.log("El user es variable: ", Datosdb.DbUser)
        console.log("El user es env: ", process.env.DbUser)
        return
    }
    console.log('Conectado a la base de datos MYsql Completa')
})

module.exports = conexion;