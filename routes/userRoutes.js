var m_user_service = require('../services/m_user_service.js');

module.exports = function(app, server){
	app.post('/signup', m_user_service.signup);
	app.post('/addUser', m_user_service.addUser);
}