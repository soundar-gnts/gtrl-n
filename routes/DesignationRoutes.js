/**
 * @Filename 		: DesignationRoutes.js 
 * @Description 	: To write Business Logic for Designation. 
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

var m_designation_service = require('../services/m_designation_service.js');

module.exports = function(app, server){
	app.post('/getdesigndetails', m_designation_service.getDesignDetails);
	app.post('/savedesigndetails', m_designation_service.saveDesignDetails);
}