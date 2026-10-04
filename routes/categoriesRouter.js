const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/:category', categoriesController.renderCategory);

categoriesRouter.post('/:category/delete', categoriesController.handleCategoryDeletion);

module.exports = categoriesRouter;