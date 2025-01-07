const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) => {
    try{
        
        const data = new ParentCategory(req.body);
        const response = await data.save();
        res.status(200).json({message: 'success', data: response});
    }   
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern.name === 1) return res.status(400).json({message: 'category already exist!'});
        res.status(500).json({message:'internal server error'});
    }
};

const readCategories = async(req, res) => {
    try{
        const data = await ParentCategory.find();
        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

const updateCategoryStatus = async(req, res) => {
    try{
       const data = await ParentCategory.updateOne(
        req.params,
        {
            $set:req.body
        }
       );

        res.status(200).json({message:'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const deleteParentCategory = async (req, res) => {
    try{
        const data = await ParentCategory.deleteOne(req.params);
        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}
module.exports = {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory
}