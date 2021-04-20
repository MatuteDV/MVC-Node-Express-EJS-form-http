const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.list);
router.get('/search', productsController.search);

router.get('/create', productsController.create);
router.post('/', productsController.store);

router.get('/edit/:id', productsController.edit);
router.put('/', productsController.update);

router.get('/:id', productsController.detail);
router.delete('/:id', productsController.destroy);


module.exports = router;