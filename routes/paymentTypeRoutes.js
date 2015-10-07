/**
 * File Name	:	paymentTypeRoutes.js
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

var paymentTypeService = require('../services/m_payment_type_service.js');

module.exports = function(app, server){
	app.post('/addpaymenttype', 	paymentTypeService.saveOrUpdatePymentType);
	app.post('/getallpaymenttype', 	paymentTypeService.getAllPymentType);
	app.post('/getpaymenttype', 	paymentTypeService.getOnePymentType);
	app.post('/deletepaymenttype', 	paymentTypeService.deletePymentType);
	app.post('/statuspymenttype', 	paymentTypeService.inactiveOrActivePymentType);
	app.post('/demo', 	paymentTypeService.demo);
}