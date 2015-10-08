/**
 * @Filename 		: CompanyRoutes.js 
 * @Description 	: To write Business Logic for Company. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 *	0.1			7-10-2015		Arun Jeyaraj R		change method type for getcompanydetails
 * 
 */

var companyservice = require('../services/CompanyService.js');

module.exports = function(app, server){
	app.post('/getcompanydetails', companyservice.getcompanyDetails);
	app.post('/savecompanydetails', companyservice.saveCompanyDetails);
}