const express = require('express');
const router = express.Router();
const { list, get } = require('../controllers/productController');


router.get('/', list);
router.get('/:slug', get);


module.exports = router;