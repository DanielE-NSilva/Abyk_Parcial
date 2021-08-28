const express = require('express');
const router = express.Router();

const Clogin = require('../controllers/CLogin');
const CInicio = require('../controllers/CInicio');
const Ccarrito = require('../controllers/Ccarrito');
const Cproductos = require('../controllers/Cproductos');
const CResgistro = require('../controllers/CRegistro');


//Inicio
router.get('/', CInicio.index);
router.get('/quienesSomos', CInicio.quienesSomos);
router.get('/contactos', CInicio.contactos);
//Registrar
router.get('/registrarse', CInicio.registrarse);
router.post('/registrarse', CResgistro.registrandose);

//Login
router.get('/login', Clogin.login);
router.post('/login', Clogin.Logeado);

//Esta Logueado
router.get('/carrito', Ccarrito.carrito);


//Crud productos
router.get('/productos',Cproductos.list); //METODO
router.post('/add',Cproductos.SaveProducto);
router.get('/delete/:IdProducto',Cproductos.delete); //METODO

router.get('/update/:IdProducto',Cproductos.edit);
router.post('/update/:IdProducto',Cproductos.update);

module.exports = router;
