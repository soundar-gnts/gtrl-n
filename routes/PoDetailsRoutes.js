/**
 * File Name	:	PoDetailsRoutes.js
 * Description	:	To write Routing middlewares For Purchase order details.
 * Author		:	Haris K.A.
 * Date			:	October 10, 2015
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

var poService = require('../services/PoDetailsService.js');

module.exports = function(app, server){
	
	app.post('/savepodatadetails',		poService.saveOrUpdatePoDetails);
	app.post('/getpodatadetails', 		poService.getPoDetails);
	app.post('/deletepodatadetails', 	poService.deletePoDetails);
	
}