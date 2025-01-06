const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategory');
const multer = require('multer');

const adminPanelRouter = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();


adminPanelRouter.use('/parent-category', multer().none(), parentCategoryRouter);

module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter
}