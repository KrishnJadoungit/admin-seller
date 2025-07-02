const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { verifySeller } = require('../middlewares/authMiddleware');
const { addProduct } = require('../controllers/productController');
const { getSellerProducts } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');

router.post('/seller/add-product', verifySeller, upload.array('images'), addProduct);
router.get('/seller/products', verifySeller, getSellerProducts);
router.delete('/delete-product/:id', verifySeller, deleteProduct);

module.exports = router;
