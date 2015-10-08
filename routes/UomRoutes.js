/**
 * File Name	:	UomRoutes.js
 * Description	:	To write Routing middlewares For Uom.
 * Author		:	Haris K.A.
 * Date			:	October 07, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 * 
 */

var paymentTypeService = require('../services/UomService.js');

module.exports = function(app, server){
	
	app.post('/saveuomdetails', paymentTypeService.saveOrUpdateUom);
	app.post('/getuomdetails', 	paymentTypeService.getUom);
	
}