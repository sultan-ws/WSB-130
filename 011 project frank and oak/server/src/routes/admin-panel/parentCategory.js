const express = require('express');
const { createParentCategory } = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.get('/insert-category', createParentCategory);

module.exports = parentCategoryRouter