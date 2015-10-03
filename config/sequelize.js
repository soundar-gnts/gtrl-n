var Sequelize = require('sequelize');
var db = require('../config/dbService.js');

var sequelize = new Sequelize(db.name, db.username, db.password, {
	host: db.host,
	port: db.port,
	logging: console.log,
	define: {
		timestamps: false
	}
	
});
module.exports = sequelize;