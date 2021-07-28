const express = require('express');
const path = require('path');   //Unir directorios
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');



const app = express();
/*
var multer = require('multer');
app.use(express.static("public"));
app.post("/updateImage/add",multer({ dest: './public/uploads/'}).single('img') ,contentUpdate.addImage);
*/


// Importando rutas
const customerRoutes = require('./routes/customer');

// Configuracion
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares se ejecuta antes de las peticiones de los usuario
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'valentina05',
    port: 3306,
    database: 'abyk'
}, 'single'));
    //Entender lo que escriban en las vistas
app.use(express.urlencoded({extended: false}));


//routes Peticiones posibles -Secciones-
app.use('/', customerRoutes);


// static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// CONEXION A MONGODB

//const config = require("./server/config");

//database
//require ('./server/database');

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
