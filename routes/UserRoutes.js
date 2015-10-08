/**
 * File Name	:	userRoutes.js
 * Description	:	To write Routing middlewares For User.
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

var m_user_service = require('../services/UserService.js');

module.exports = function(app, server){

	app.post('/signup', 	m_user_service.signup);
	app.post('/login', 		m_user_service.login);
	app.post('/getuser',	m_user_service.getUser);
	app.post('/edituser', 	m_user_service.signup);
	
}

