function handle404(req, res, next) {
    next({status: 404, message: 'Page not found'}); 
}

function handleError(err, req, res, next) {
    const statusCode = err.status || 500;
    const errMsg = err.message || 'Internal Server Error';

    console.error(`[${statusCode}] ${errMsg}`, err.stack);

    res.status(statusCode).render('error', {
        title: `Error ${statusCode}`,
        statusCode,
        errMsg
    });
}

module.exports = {
    handle404,
    handleError
}