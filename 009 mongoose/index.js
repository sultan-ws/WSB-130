const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const url = 'mongodb+srv://sultankhan:sj1XtNfoMKK1If1T@sultan.luvya.mongodb.net/wsb_130_tmp?retryWrites=true&w=majority&appName=sultan'
mongoose.connect(url)
    .then(() => {
        console.log('connected to database')
    })
    .catch(err => {
        console.log(err.message)
    });

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description: String,
    thumbnail:String,
    images:Array,
    inStock:{
        type:Boolean,
        default:true
    }
});

const Product = mongoose.model('products', productSchema);

const uploads = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        cb( null, req.body.name + Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname) );
    }
})}).fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 10}
]);

app.post('/create-product', uploads, async (req, res)=>{
    try{
        const data = req.body;

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if(req.files.images) data.images = req.files.images.map((image)=> image.filename);
        }

        const dataToSave = new Product(data);
        const response = await dataToSave.save();


        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'internal server error'});
    }
})

app.listen(4800, ()=>{
    console.log('server is running on port 4800')
});