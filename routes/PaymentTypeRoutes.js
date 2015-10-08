/**
 * File Name	:	PaymentTypeRoutes.js
 * Description	:	To write Routing middlewares For Payment type.
 * Author		:	Haris K.A.
 * Date			:	October 06, 2015
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

var paymentTypeService = require('../services/PaymentTypeService.js');

module.exports = function(app, server){
	
	app.post('/savepaymenttypedetails', 	paymentTypeService.saveOrUpdatePymentType);
	app.post('/getpaymenttypedetails', 		paymentTypeService.getPymentType);
	
}