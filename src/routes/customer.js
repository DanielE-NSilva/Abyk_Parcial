const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')


// Sin Loguearse
//Inicio
router.get('/', Controller.index);
router.get('/Pruebas', Controller.indexPruebas);



//Login
router.get('/login', Controller.login);
router.post('/login', Controller.Logeado);
//Registrar
router.get('/registrarse', Controller.registrarse);
router.post('/registrandose', Controller.registrandose);

//router.get('/inicioSesion', Controller.IniciarSesion);
//router.post('/inicioSesion', Controller.Bienvenido);

//Logueado
router.get('/carrito', Controller.carrito);

router.get('/quienesSomos', Controller.quienesSomos);




router.post('/antecedentes', Controller.antecedentes);
router.post('/antecedentes/Guardar', Controller.antecedentesGuardar);

router.post('/pasaporte', Controller.pasaporte);
router.post('/pasaporte/Guardar', Controller.pasaporteGuardar);

router.post('/infoFamiliar/Guardar',Controller.infoFamiliarGuardar)

// PRUEBA INFORMACION FAMILIAR

router.get('/infoFamiliar/:NroDocumento', Controller.infoFamilia);

router.post('/add',Controller.save);
router.get('/delete/:id',Controller.delete); //METODO
router.post('/update/:id',Controller.update);
router.get('/update/:id', Controller.edit);

module.exports = router;