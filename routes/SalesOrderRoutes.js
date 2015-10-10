/**
 * File Name	:	SalesOrderRoutes.js
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

var soService = require('../services/SalesOrderService.js');

module.exports = function(app, server){
	
	app.post('/savesalesorderdetails',	soService.saveOrUpdateSalesOrder);
	app.post('/getsalesorderdetails', 	soService.getSalesOrder);
	app.post('/changesalesorderstatus',	soService.cahngeSalesOrderStatus);
	
}