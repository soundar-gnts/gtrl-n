/**
 * @Filename 		: BrandRoutes.js 
 * @Description 	: To write Business Logic for Brand. 
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

var m_brand_service = require('../services/m_brand_service.js');

module.exports = function(app, server){
	app.post('/getbranddetails', m_brand_service.getBrandDetails);
	app.post('/savebranddetails', m_brand_service.saveBrandDetails);
}