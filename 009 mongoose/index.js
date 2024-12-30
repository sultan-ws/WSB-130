const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
        const name = req.body.name.split(' ');
        cb( null, name[0] + Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname) );
    }
})}).fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 10}
]);

app.use(uploads);
app.use('/product-files', express.static('./files'));

app.post('/create-product', async (req, res)=>{
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
});

app.get('/read-products', async (req, res) => {
    try{
        const products = await Product.find();
        const filepath = `${req.protocol}://${req.get('host')}/product-files/`;

        const data = products.map((product)=>{
            const preData = product._doc;
            return {
                ...preData,
            thumbnail: filepath + preData.thumbnail,
            images: preData.images.map((image)=> filepath + image)
            }
        }
    );
        res.status(200).json({message: 'success', data, filepath});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'internal server error'});
    }
});

app.delete('/delete-product/:_id', async( req, res ) => {
    try{
        const preData = await Product.findOne(req.params);

        if(!preData) return res.status(404).json({message: 'match not found'});

        const data = await Product.deleteOne( req.params );

        if(preData.thumbnail){
            if(fs.existsSync(`./files/${preData.thumbnail}`)) fs.unlinkSync(`./files/${preData.thumbnail}`);
        };

        if(preData.images){
            preData.images.map((img)=>{
                if(fs.existsSync(`./files/${img}`)) fs.unlinkSync(`./files/${img}`);
            })
        };
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'internal server error'});
    }
});

app.put('/update-product/:_id', async (req, res) => {
    try{
        const preData = await Product.findOne(req.params);
        console.log(preData);
        if(!preData) return res.status(404).json({message: 'no match found'});

        const data = req.body;

        console.log(preData);

        if(req.files){
            if(req.files.thumbnail){
                if(fs.existsSync(`./files/${preData.thumbnail}`)) fs.unlinkSync(`./files/${preData.thumbnail}`);
                data.thumbnail = req.files.thumbnail[0].filename;
            }
            if(req.files.images){
                preData.images.map((img)=>{
                    if(fs.existsSync(`./files/${img}`)) fs.unlinkSync(`./files/${img}`);
                });

                data.images = req.files.images.map((img)=> img.filename);
            }
        };

        const response = await Product.updateOne(
            req.params,
            {
                $set: data
            }
        );

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