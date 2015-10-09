/**
 * File Name	:	ScreenTreeRouts.js
 * Description	:	To write Routing middlewares For Screen Tree.
 * Author		:	Haris K.A.
 * Date			:	October 09, 2015
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

var screenTreeService = require('../services/ScreenTreeService.js');

module.exports = function(app, server){
	
	app.post('/savescreentreedetails', screenTreeService.saveOrUpdateScreenTree);
	app.post('/getscreentreedetails', 	screenTreeService.getScreenTree);
	
}