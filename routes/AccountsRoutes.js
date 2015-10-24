/**
 * @Filename	:	AccountsRoutes.js
 * @Description	:	To write Routing middlewares for Account related Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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
var accountsService = require('../services/AccountsService.js');
module.exports = function(app, server) {
	
	app.post('/getaccountsdetails', accountsService.getAccountsDetails);
	app.post('/saveaccounts', accountsService.saveAccounts);
	app.post('/deleteaccountdetails', accountsService.deleteAccountDetails);
	app.post('/savevendorcustomertxns', accountsService.saveVendorCustomerTxns);
	
}

