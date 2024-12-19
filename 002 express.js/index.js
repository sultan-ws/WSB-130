const express = require('express');

const app = express();

app.get('/', (req, res)=>{ res.send('hello') });
app.post('/create-data', (req, res)=>{ res.send('data created') });
app.get('/create-data', (req, res)=>{ res.send('data created with get') });

//query
app.get('/greet', (req, res)=>{ 
    console.log(req.query);
    res.send(`hello ${req.query.name}`)
});

//param
app.get('/param/:firstname?/:lastname?', (req, res)=>{
    console.log(req.params);
    res.send('test param');
})

app.post('/test-body',express.json() ,(req, res)=>{
    console.log(req.body);
    res.send('success');
})

app.listen(4500, ()=>{
    console.log(`server is running on port 4500`);
});

// const data = "{ firstname: 'john', lastname: 'wick', age: '24' }";