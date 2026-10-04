const { getAllGames } = require('../models/gameModel');

async function renderGamesList(req, res) {
    const games = await getAllGames();
    res.render('games', {title: 'Game Catalog', games});
}

module.exports = {
    renderGamesList
};