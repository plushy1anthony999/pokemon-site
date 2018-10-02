// USAGE: server.js should require('./routes')
const indexRoute = require('./indexRoute');
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');
const logoutRoute = require('./logoutRoute');
const dashboardRoute = require('./dashboardRoute');
const {http404ErrorRoute, httpErrorRoute} = require('./errorRoute');

module.exports = [ indexRoute, loginRoute, registerRoute, logoutRoute, dashboardRoute, http404ErrorRoute, httpErrorRoute ];