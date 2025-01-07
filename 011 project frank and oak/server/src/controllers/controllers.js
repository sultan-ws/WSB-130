/* Admin Panel */
// Parent Category
const {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory
} = require("./admin-panel/parentCategory");

module.exports = {
    createParentCategory,
    readCategories,
    updateCategoryStatus,
    deleteParentCategory
}