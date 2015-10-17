/**
 * @Filename	:	AccountTransactionRoutes.js
 * @Description	:	To write Routing middlewares for Account Transactions related Table.
 * @Author		:	Arun Jeyaraj R	
 * @Date		:	October 17, 2015
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
var accountTransactionsService = require('../services/AccountTransactionsService.js');
module.exports = function(app, server) {
	
	app.post('/getaccounttransdetails', accountTransactionsService.getaccounttransDetails);
	app.post('/saveaccounttrans', accountTransactionsService.saveaccounttrans);
	
}

