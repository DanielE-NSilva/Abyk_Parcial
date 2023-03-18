const express = require('express');
const router = express.Router();

const Clogin = require('../controllers/frontend/CLogin');
const CInicio = require('../controllers/frontend/CInicio');
const Cproductos = require('../controllers/frontend/Cproductos');
const CResgistro = require('../controllers/frontend/CRegistro');

//Inicio
router.get('/',Clogin.isAutheticated, CInicio.index);
router.get('/quienesSomos',Clogin.isAutheticated, CInicio.quienesSomos);
router.get('/contactos',Clogin.isAutheticated, CInicio.contactos);

//Registrar
router.get('/registrarse',Clogin.isAutheticated, CInicio.registrarse);
router.post('/registrarse',Clogin.isAutheticated, CResgistro.registrandose);

//Login EN MANTENIMIENTO
router.get('/logout', Clogin.logout); 
router.get('/login', Clogin.login);
router.post('/login',Clogin.Logeado);

//Crud productos
router.get('/productos',Clogin.isAutheticated, Cproductos.listproductos);
router.get('/producto/:Categoria',Clogin.isAutheticated, Cproductos.listproductosBasico);
router.post('/add',Clogin.isAutheticated, Cproductos.SaveProducto);

// delete 
router.get('/delete/:IdProducto',Clogin.isAutheticated, Cproductos.delete);

// cambiar a put el post 
router.get('/update/:IdProducto',Clogin.isAutheticated, Cproductos.edit);
router.post('/update/:IdProducto',Clogin.isAutheticated, Cproductos.update);

module.exports = router;