const Product = require("../models/product");
const fs = require('fs');
const path = require('path');

const createProduct = async (req, res)=>{
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
};

const readProduct = async (req, res) => {
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
}

const updateProduct = async (req, res) => {
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
}

const deleteProduct = async( req, res ) => {
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
}

module.exports = {
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct
}