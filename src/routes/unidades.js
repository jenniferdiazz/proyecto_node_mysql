const express = require('express');
const UnidadesController = require('../controllers/unidadesController');
const router =  express.Router();



router.get('/add', UnidadesController.add); 
router.post('/add', UnidadesController.create);
router.get('/', UnidadesController.list);
router.get('/delete/:id', UnidadesController.destroy);


module.exports = router;