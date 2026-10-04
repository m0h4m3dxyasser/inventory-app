const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');
const gamesRouter = require('./routes/gamesRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const { handle404, handleError } = require('./controllers/errorController');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use('/games', gamesRouter);

app.use('/categories', categoriesRouter);

app.use(handle404);

app.use(handleError);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});