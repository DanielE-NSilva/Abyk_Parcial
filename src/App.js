const express = require('express')
const path = require('path')   //Unir directorios
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({path:path.join(__dirname,'/env/.env')})
// Importando rutas
const customerRoutes = require('./routes/routers')

const app = express()

// Configuracion de seteamo el puerto, el motor de plantillas y las vistas
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



// Seteamos la variables de entorno 
//dotenv.config({path:'./env/.env'})


// Para utilizar Cookies
app.use(cookieParser())
/*
var multer = require('multer');
app.post("/updateImage/add",multer({ dest: './public/uploads/'}).single('img') ,contentUpdate.addImage)
*/

// middlewares se ejecuta antes de las peticiones de los usuario
app.use(morgan('dev'))
//middlewares para secciones compartidas


app.use(myConnection(mysql, {
    host: process.env.DbHost,
    user: process.env.DbUser,
    password: process.env.DbPassword,
    port: 3306,
    database: process.env.DbDatabase
}, 'single'))
// Nueva forma de conexion de mysql
//Entender lo que escriban en las vistas
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// El directorio public
app.use('/public', express.static(path.join(__dirname, 'public')));

//routes Peticiones posibles -Secciones-
app.use('/', customerRoutes);

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});