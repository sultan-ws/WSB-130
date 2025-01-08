/* Admin Panel */
// Parent Category
const {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory,
    deleteParentCategories
} = require("./admin-panel/parentCategory");

module.exports = {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory,
    deleteParentCategories
}