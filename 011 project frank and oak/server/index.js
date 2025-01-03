const express = require('express');
const masterRouter = require('./src/app');
require('dotenv').config();
require('./src/db/config');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use('/api', masterRouter);

app.listen( PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

// http://localhost:4400/api/admin-panel/parent-category/insert-category