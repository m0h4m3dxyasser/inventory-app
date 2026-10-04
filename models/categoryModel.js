const pool = require('../db/pool');
const { route } = require('../routes/gamesRouter');

async function getCategoryGames(category) {
    const { rows } = await pool.query('SELECT * FROM game WHERE genre_name = $1;', [category]);
    return rows;
}

async function deleteCategoryGames(category) {
    const rows = await getCategoryGames(category);

    rows.forEach(async function(game) {
        await pool.query('DELETE FROM platform WHERE game_id = $1;', [game.id]);
    });

    await pool.query('DELETE FROM game WHERE genre_name = $1;', [category]);

    await pool.query('DELETE FROM genre WHERE name = $1;', [category]);
}
module.exports = {
    getCategoryGames,
    deleteCategoryGames
}