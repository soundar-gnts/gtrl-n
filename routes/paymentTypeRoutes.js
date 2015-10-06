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

var paymentTypeService = require('../services/paymentTypeService.js');

module.exports = function(app, server){
	app.post('/addPaymentType', 	paymentTypeService.saveOrUpdatePymentType);
	app.post('/getAllPaymentType', 	paymentTypeService.getAllPymentType);
	app.post('/getPaymentType', 	paymentTypeService.getOnePymentType);
	app.post('/deletePymentType', 	paymentTypeService.deletePymentType);
	app.post('/statusPymentType', 	paymentTypeService.inactiveOrActivePymentType);
	app.post('/demo', 	paymentTypeService.demo);
}