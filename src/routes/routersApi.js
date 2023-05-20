const express = require('express');
const router = express.Router();

const Clogin = require('../controllers/api/CLogin.js');
const CInicio = require('../controllers/api/CInicio.js');
const Cproductos = require('../controllers/api/Cproductos.js');
const CResgistro = require('../controllers/api/CRegistro.js');

//Inicio FALTA
router.get('/',Clogin.isAutheticated, CInicio.index);
router.get('/quienesSomos',Clogin.isAutheticated, CInicio.quienesSomos);
router.get('/contactos',Clogin.isAutheticated, CInicio.contactos);

//Registrar
router.get('/registrarse',Clogin.isAutheticated, CInicio.registrarse);
router.post('/registrarse',Clogin.isAutheticated, CResgistro.registrandose);

//Login EN MANTENIMIENTO
router.get('/logout', Clogin.logout); 
router.get('/login', Clogin.login);
router.post('/login', Clogin.Logeado);

//Crud productos
router.get('/productos',Clogin.isAutheticated, Cproductos.listproductos);
router.get('/producto/:Categoria',Clogin.isAutheticated, Cproductos.listproductosBasicoAPI);
router.post('/add',Clogin.isAutheticated, Cproductos.SaveProducto);

// delete 
router.delete('/delete/:IdProducto',Clogin.isAutheticated, Cproductos.delete);

router.get('/update/:IdProducto',Clogin.isAutheticated, Cproductos.edit);
router.put('/update/:IdProducto',Clogin.isAutheticated, Cproductos.update);

module.exports = router;