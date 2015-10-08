/**
 * @Filename 		: BankRoutes.js 
 * @Description 	: To write Business Logic for BankRoutes. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */

var bankservice = require('../services/BankService.js');

module.exports = function(app, server){
	app.post('/getbankdetails', bankservice.getBankDetails);
	app.post('/getbankbranchdetails', bankservice.getBankBranchDetails);
	app.post('/savebankdetails', bankservice.saveBankDetails);
}