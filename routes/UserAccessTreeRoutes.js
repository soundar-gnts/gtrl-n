/**
 * File Name	:	UserAccessTreeRoutes.js
 * Description	:	To write Routing middlewares For User Access Tree.
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

var userAccessTreeService = require('../services/UserAccessTreeService.js');

module.exports = function(app, server){
	
	app.post('/saveuseraccesstreedetails', userAccessTreeService.saveOrUpdateUserAccessTree);
	//app.post('/getuseraccesstreedetails', 	userAccessTreeService.getUserAccessTree);
	
}