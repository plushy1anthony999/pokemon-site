// USAGE: server.js should require('./routes')
const indexRoute = require('./index-route');
const loginRoute = require('./login-route');
const registerRoute = require('./register-route');
const logoutRoute = require('./logout-route');
const accountDeleteRoute = require('./account-delete-route');
const dashboardRoute = require('./dashboard-route');
const {http404ErrorRoute, httpErrorRoute} = require('./error-route');

module.exports = [ 
    indexRoute, 
    loginRoute, 
    registerRoute, 
    logoutRoute, 
    dashboardRoute, 
    http404ErrorRoute, 
    httpErrorRoute, 
    accountDeleteRoute 
];