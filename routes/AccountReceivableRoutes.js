/**
 * File Name	:	AccountReceivableRoutes.js
 * Description	:	To write Routing middlewares For AccountReceivableRoutes.
 * Author		:	Saranya G.
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
var accountreceivableservice = require('../services/AccountReceivableService.js');

module.exports = function(app, server){
	
	app.post('/getaccountreceivabledetails', accountreceivableservice.getAccountReceivableDetails);
	app.post('/saveaccountreceivables', accountreceivableservice.saveAccountReceivables);
}