const url = require('url');

module.exports.getErrorMessage = function(req, err, status) {
    const path = url.format({
        protocol: req.protocol,
        host: req.hostname,
        pathname: req.originalUrl
    });
    return `HTTP ${status} Error: "${path}" \n${err.stack}`;
}