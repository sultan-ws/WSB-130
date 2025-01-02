const express = require('express');
const productRouter = require('./src/routes/productRoutes');
require('dotenv').config();
require('./src/db/config');

const app = express();

app.use('/product-files', express.static('./files'));

app.use('/products', productRouter);

app.listen(process.env.PORT, ()=>{
    console.log('server is running on port 4800')
});