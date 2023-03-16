const express = require('express')
const path = require('path')   //Unir directorios
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler');
const multer = require('multer');

// Seteamos la variables de entorno 
dotenv.config({path:path.join(__dirname,'/env/.env')})


// Importando rutas
const customerRoutes = require('./routes/routers')

const app = express()

// Configuracion de seteamo el puerto, el motor de plantillas y las vistas
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Para utilizar Cookies
app.use(cookieParser())

//Imagenes temporales
app.use(
  multer({ dest: path.join(__dirname, './public/upload/temp') }).single(
    'image'
  )
);

// middlewares se ejecuta antes de las peticiones de los usuario
app.use(morgan('dev'))

// Nueva forma de conexion de mysql
app.use(myConnection(mysql, {
    host: process.env.DbHost,
    user: process.env.DbUser,
    password: process.env.DbPassword,
    port: 3306,
    database: process.env.DbDatabase
}, 'single'))

app.use(express.urlencoded({extended: false}))
//Entender lo que escriban en las vistas
app.use(express.json())

// El directorio public
app.use('/public', express.static(path.join(__dirname, 'public')));

//routes Peticiones posibles -Secciones-
app.use('/', customerRoutes);

if ('development' === app.get('env')) {
  app.use(errorHandler());
}

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});