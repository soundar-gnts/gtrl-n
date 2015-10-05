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

var m_manufacturer_service = require('../services/m_manufacturer_service.js');

module.exports = function(app, server){
	app.post('/getmanufactdetails', m_manufacturer_service.getmanufactDetails);
	app.post('/savemanufacdetails', m_manufacturer_service.saveManufacDetails);
}