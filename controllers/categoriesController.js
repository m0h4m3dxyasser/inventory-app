const { getCategoryGames, deleteCategoryGames } = require('../models/categoryModel');

async function renderCategory(req, res) {
    const category = req.params.category.split('-').map(category => category[0].toUpperCase() + category.slice(1)).join('-');
    const games = await getCategoryGames(category);
    res.render('categoryView', {
        title: `${category} Games`,
        games,
        category
    });
}

async function handleCategoryDeletion(req, res, next) {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        const category = req.params.category.split('-').map(category => category[0].toUpperCase() + category.slice(1)).join('-');
        await deleteCategoryGames(category);
        res.redirect('/');
    } else {
        const err = new Error('Access Forbidden')
        err.status = 403;
        next(err);
    }
}

module.exports = {
    renderCategory,
    handleCategoryDeletion
}