const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')


// Sin Loguearse
//Inicio
router.get('/', Controller.index);
router.get('/Pruebas', Controller.indexPruebas);
router.get('/quienesSomos', Controller.quienesSomos);
router.get('/contactos', Controller.contactos);


//Login
router.get('/login', Controller.login);
router.post('/login', Controller.Logeado);

//Registrar
router.get('/registrarse', Controller.registrarse);
router.post('/registrarse', Controller.registrandose);


//Esta Logueado
router.get('/carrito', Controller.carrito);


//Crud productos
router.get('/productos',Controller.list); //METODO
router.post('/add',Controller.save);
router.get('/delete/:IdProducto',Controller.delete); //METODO
router.post('/update/:IdProducto',Controller.update);
router.get('/update/:IdProducto',Controller.edit);




module.exports = router;