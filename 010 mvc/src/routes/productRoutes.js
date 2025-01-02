const express = require('express');
const uploads = require('../middlewares/multer');
const Product = require('../models/product');
const {
    createProduct,
    readProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productControllers');

const productRouter = express.Router();
productRouter.use(uploads);

productRouter.post('/create-product', createProduct);

productRouter.get('/read-products', readProduct);

productRouter.delete('/delete-product/:_id', deleteProduct);

productRouter.put('/update-product/:_id', updateProduct)

module.exports = productRouter;