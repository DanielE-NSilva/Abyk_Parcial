const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')


router.get('/', Controller.index);
router.post('/Bienvenido', Controller.Bienvenido);


router.get('/login', Controller.login);

//router.get('/inicioSesion', Controller.IniciarSesion);
//router.post('/inicioSesion', Controller.Bienvenido);



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