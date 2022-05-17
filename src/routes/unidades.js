const express = require('express');
const UnidadesController = require('../controllers/unidadesController');
const router =  express.Router();



router.get('/add', UnidadesController.add); 
router.post('/add', UnidadesController.create);
router.get('/', UnidadesController.list);
router.get('/delete/:id', UnidadesController.destroy);
router.get('/edit/:id', UnidadesController.edit);
router.post('/edit/:id', UnidadesController.update);


module.exports = router;