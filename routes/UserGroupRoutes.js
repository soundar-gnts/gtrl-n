/**
 * File Name	:	UserGroupRoutes.js
 * Description	:	To write Routing middlewares For User Group.
 * Author		:	Haris K.A.
 * Date			:	October 08, 2015
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

var userGroupService = require('../services/UserGroupService.js');

module.exports = function(app, server){
	
	app.post('/saveusergroupdetails', 		userGroupService.saveOrUpdateUserGroup);
	app.post('/getusergroupdetails', 		userGroupService.getUserGroup);
	app.post('/getuseraccesstreedetails', 	userGroupService.getUserAccessTree);
	
}