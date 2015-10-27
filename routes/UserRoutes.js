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

var userService = require('../services/UserService.js');

module.exports = function(app, server){

	
	app.post('/signup', 		userService.signup);
	app.post('/login', 			userService.login);
	app.post('/getuser',		userService.getUser);
	app.post('/edituser', 		userService.signup);
	app.post('/otpverification',userService.userOTPVerification);
	app.post('/resendotp',		userService.resendOTP);
	app.post('/forgotpassword',	userService.forgotPassword);
	//app.post('/c',	userService.getAllCustomer);
}

