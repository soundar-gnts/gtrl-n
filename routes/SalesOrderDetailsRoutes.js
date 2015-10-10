/**
 * File Name	:	SalesOrderDetailsRoutes.js
 * Description	:	To write Routing middlewares For Sales order details.
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

var soService = require('../services/SalesOrderDetailsService.js');

module.exports = function(app, server){
	
	app.post('/savesalesorderdatadetails',		soService.saveOrUpdateSalesOrderDetails);
	app.post('/getsalesorderdatadetails', 		soService.getSalesOrderDetails);
	app.post('/deletesalesorderdatadetails', 	soService.deleteSalesOrderDetails);
	
}