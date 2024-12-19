const express = require('express');

const app = express();

const middleware = (req, res, cb)=>{
    console.log('middleware called');
    cb();
};

app.get('/', middleware,(req, res)=>{
    res.send('hello world');
})

app.listen(4000, ()=>{
    console.log('server is running on port 4000');
})