/**
 * @Filename 		: ManufacturerRoutes.js 
 * @Description 	: To write Business Logic for Manufacturer. 
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

var manufacturerservice = require('../services/ManufacturerService.js');

module.exports = function(app, server){
	app.post('/getmanufactdetails', manufacturerservice.getmanufactDetails);
	app.post('/savemanufacdetails', manufacturerservice.saveManufacDetails);
}