const http = require('http');

http.createServer((req, res)=>{
    console.log(req.method);
    if(req.method === 'GET'){
        res.end('hello world');
    }
   
}).listen(4000);