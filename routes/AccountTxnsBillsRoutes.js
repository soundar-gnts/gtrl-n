/**
 * @Filename	:	AccountTxnsBillsRoutes.js
 * @Description	:	To write Routing middlewares for Account Txns Bills Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 23, 2015
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
var accountTxnsBillsService = require('../services/AccountTxnsBillsService.js');
module.exports = function(app, server) {
	
	app.post('/getaccounttxnsbillsdetails', accountTxnsBillsService.getAccountTxnsBillsDetails);
	app.post('/saveaccounttxnsbills', accountTxnsBillsService.saveAccountTxnsBills);
	app.post('/deleteaccounttxnsbill', accountTxnsBillsService.deleteAccountTxnsBill);
	
}

