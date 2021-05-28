const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')


// Sin Loguearse
//Inicio
router.get('/', Controller.index);
router.get('/Pruebas', Controller.indexPruebas);
router.get('/quienesSomos', Controller.quienesSomos);


//Login
router.get('/login', Controller.login);
router.post('/login', Controller.Logeado);

//Registrar
router.get('/registrarse', Controller.registrarse);
router.post('/registrarse', Controller.registrandose);


//Esta Logueado
router.get('/carrito', Controller.carrito);


//Crud productos
router.get




module.exports = router;