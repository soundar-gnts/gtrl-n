/**
 * @Filename 		: CcyRoutes.js 
 * @Description 	: To write Business Logic for Ccy. 
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

var m_ccy_service = require('../services/m_ccy_service.js');

module.exports = function(app, server){
	app.post('/getccydetails', m_ccy_service.getCcyDetails);
	app.post('/saveccydetails', m_ccy_service.saveCcyDetails);
}