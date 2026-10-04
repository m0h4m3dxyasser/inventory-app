const pool = require('../db/pool');

async function getAllGames() {
    const { rows } = await pool.query('SELECT * FROM game;');
    return rows;
}

async function getGameById(id) {
    const gameResult = await pool.query('SELECT * FROM game WHERE id = $1;', [id]);

    const publisherResult = await pool.query(
        'SELECT * FROM publisher WHERE company_name = $1;',
        [gameResult.rows[0].publisher_name]
    );

    const platformResult = await pool.query(
        'SELECT platform_name FROM platform WHERE game_id = $1;',
        [id]
    );

    return {
        gameData: gameResult.rows[0],
        publisherData: publisherResult.rows[0],
        platforms: platformResult.rows
    };
}

async function insertGame(data) {
    const publisherInfo = [
        data.publisher_name,
        data.founding_date,
        data.headquarters
    ];

    const gameInfo = [
        data.title,
        data.release_date,
        data.description,
        data.genre_name,
        data.publisher_name
    ]

    const platforms = data.platform_name;

    const publisherResults = await pool.query('SELECT * FROM publisher WHERE company_name = $1;', [publisherInfo[0]]);

    const genreResult = await pool.query('SELECT * FROM genre WHERE name = $1;', [data.genre_name]);

    if(!genreResult.rowCount) {
        await pool.query('INSERT INTO genre (name) VALUES ($1);', [data.genre_name]);
    }

    if(!publisherResults.rowCount) {
        await pool.query(
            'INSERT INTO publisher (company_name, founding_date, headquarters) VALUES ($1, $2, $3);',
            publisherInfo
        )
    }

    const gameResults = await pool.query('SELECT * FROM game WHERE title = $1;', [gameInfo[0]]);

    if(!gameResults.rowCount) {
        await pool.query(
            `INSERT INTO game (title, release_date, description, genre_name, publisher_name)
             VALUES ($1, $2, $3, $4, $5);`,
            gameInfo
        );
    }

    platforms.forEach(async function(platform) {
        await pool.query(
            `INSERT INTO platform (platform_name, game_id)
             VALUES ($1, (SELECT id FROM game WHERE title = $2));`,
            [platform, gameInfo[0]]
        );
    });
}

async function updateGame(id, newData) {
    const gameResult = await getGameById(id);

    await pool.query(
        `UPDATE publisher
         SET company_name = $1, founding_date = $2, headquarters = $3
         WHERE company_name = $4;`,
        [newData.publisher_name, newData.founding_date, newData.headquarters, gameResult.publisherData.publisher_name]
    );

    const { rows } = await pool.query(
        `UPDATE game
         SET title = $1, release_date = $2, description = $3, genre_name = $4, publisher_name = $5
         WHERE id = $6
         RETURNING *;`,
        [newData.title, newData.release_date, newData.description, newData.genre_name, newData.publisher_name, id]
    );

    await pool.query('DELETE FROM platform WHERE game_id = $1', [id]);
    
    const platformNames = newData.platform_name;
    if(platformNames) {
        const platformArr = Array.isArray(platformNames) ? platformNames : [platformNames];

        for (const platform of platformArr) {
            await pool.query(
                'INSERT INTO platform (platform_name, game_id) VALUES ($1, $2)',
                [platform, id]
            );
        }
    }

    return rows;
}

async function deleteGame(id) {
    await pool.query('DELETE FROM platform WHERE game_id = $1', [id]);
    await pool.query('DELETE FROM game WHERE id = $1', [id]);
}

module.exports = {
    getAllGames,
    getGameById,
    insertGame,
    updateGame,
    deleteGame
}