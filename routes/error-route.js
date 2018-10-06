const url = require('url');

function http404ErrorRoute(req, res, next) {
    const error = new Error('HTTP 404: Resource could\'nt be found');
    error.status = 404;

    // pass to generic Error Handler Route
    next(error);
}

// Generic HTTP Error Handler Route
function httpErrorRoute(err, req, res, next) {
    res.status(err.status || 500).render('error-http', {
        path: url.format({
            protocol: req.protocol,
            host: req.hostname,
            pathname: req.originalUrl
        }),
        errorcode: err.status
    });
}


module.exports = {http404ErrorRoute, httpErrorRoute};