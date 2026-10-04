const { getGameById, insertGame, updateGame, deleteGame } = require('../models/gameModel');

async function renderGameDetials(req, res) {
    const { gameData, platforms } = await getGameById(req.params.id);
    res.render('gameDetails', {title: 'Game Details', game: gameData, platforms});
}

async function renderGameForm(req, res) {
    if (req.path === '/new') {
        res.render('gameForm', {
            title: 'Add Game',
            action: '/games',
            gameData: {},
            publisherData: {},
            platformsArr: [],
            button: 'Add'
        });
    } else {
        const { gameData, publisherData, platforms } = await getGameById(req.params.id);
        const platformsArr = platforms.map(({ platform_name }) => platform_name);

        res.render('gameForm', {
            title: 'Update Game',
            action: `/games/${req.params.id}`,
            gameData,
            publisherData,
            platformsArr,
            button: 'Update'
        });
    };
}

async function handleNewGameSubmit(req, res) {
    await insertGame(req.body);
    res.redirect('/');
}

async function handleGameUpdate(req, res, next) {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        await updateGame(req.params.id, req.body);
        res.redirect(`/games/${req.params.id}`);
    } else {
        const err = new Error('Access Forbidden')
        err.status = 403;
        next(err);
    }
}

async function handleGameDeletion(req, res, next) {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        await deleteGame(req.params.id);
        res.redirect('/');
    } else {
        const err = new Error('Access Forbidden')
        err.status = 403;
        next(err);
    }
}

module.exports = {
    renderGameDetials,
    renderGameForm,
    handleNewGameSubmit,
    handleGameUpdate,
    handleGameDeletion
};