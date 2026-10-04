const { Router } = require('express');
const gamesRouter = Router();
const gameController = require('../controllers/gameController');

gamesRouter.get('/new', gameController.renderGameForm);

gamesRouter.get('/:id', gameController.renderGameDetials)

gamesRouter.post('/', gameController.handleNewGameSubmit);

gamesRouter.get('/:id/edit', gameController.renderGameForm);

gamesRouter.post('/:id', gameController.handleGameUpdate);

gamesRouter.post('/:id/delete', gameController.handleGameDeletion);

module.exports = gamesRouter;