const express = require('express');
const {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory,
    deleteParentCategories
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/insert-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readCategories);
parentCategoryRouter.put('/update-status/:_id', updateCategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.post('/delete-categories', deleteParentCategories);

module.exports = parentCategoryRouter;