function renderAuthorizationForm(req, res) {
    res.render('authorizeView', {
            title: 'Authorize Page',
            game_id: req.query.game_id,
            error: ''
    });
}

function handleAuthorization(req, res) {
    if (req.body.password === 'password123') {
        console.log(req.body.password);
        res.set('Authorization', 'administrator');
        res.redirect(`/games/${req.query.game_id}`);
    } else {
        res.render('authorizeView', {
            title: 'Authorize Page',
            error: 'password is wrong!'
        });
    }
}

module.exports = {
    renderAuthorizationForm,
    handleAuthorization
}