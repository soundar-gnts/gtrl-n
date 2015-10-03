/**
 * File Name	:	sequelize.js
 * Description	:	ORM Config File.
 * Author		:	Haris K.A.
 * Date			:	October 03, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 * 
 */

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