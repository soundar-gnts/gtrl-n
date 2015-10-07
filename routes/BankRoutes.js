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

var m_bank_service = require('../services/m_bank_service.js');

module.exports = function(app, server){
	app.post('/getbankdetails', m_bank_service.getBankDetails);
app.post('/getbankbranchdetails', m_bank_service.getBankBranchDetails);

	app.post('/savebankdetails', m_bank_service.saveBankDetails);
}