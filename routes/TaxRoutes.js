/**
 * File Name	:	TaxRoutes.js
 * Description	:	To write Routing middlewares For Tax.
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

var paymentTypeService = require('../services/TaxService.js');

module.exports = function(app, server){
	
	app.post('/savetaxdetails', paymentTypeService.saveOrUpdateTax);
	app.post('/gettaxdetails', 	paymentTypeService.getTax);
	
}