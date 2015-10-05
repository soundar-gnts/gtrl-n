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
 * 
 * 
 */

var m_company_service = require('../services/m_company_service.js');

module.exports = function(app, server){
	app.get('/getcompanydetails', m_company_service.getcompanyDetails);
	app.post('/savecompanydetails', m_company_service.saveCompanyDetails);
}