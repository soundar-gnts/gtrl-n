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

var brandservice = require('../services/BrandService.js');

module.exports = function(app, server){
	app.post('/getbranddetails', brandservice.getBrandDetails);
	app.post('/savebranddetails', brandservice.saveBrandDetails);
}