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
        return
    }
    console.log('Conectado a la base de datos MYsql')
})

module.exports = conexion;