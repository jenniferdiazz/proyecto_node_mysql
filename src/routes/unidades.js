const express = require('express');
const UnidadesController = require('../controllers/unidadesController');
const router =  express.Router();
const { isLoggedIn } = require('../lib/auth');


router.get('/add', isLoggedIn, UnidadesController.add); 
router.post('/add', isLoggedIn, UnidadesController.create);
router.get('/', isLoggedIn, UnidadesController.list);
router.get('/delete/:id', isLoggedIn, UnidadesController.destroy);
router.get('/edit/:id', isLoggedIn, UnidadesController.edit);
router.post('/edit/:id', isLoggedIn, UnidadesController.update);


module.exports = router;