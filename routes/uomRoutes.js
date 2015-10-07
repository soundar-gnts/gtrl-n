/**
 * File Name	:	uomRoutes.js
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

var paymentTypeService = require('../services/m_uom_service.js');

module.exports = function(app, server){
	app.post('/adduom', 	paymentTypeService.saveOrUpdateUom);
	app.post('/getalluom', 	paymentTypeService.getAllUom);
	app.post('/getuom', 	paymentTypeService.getOneUom);
	//app.post('/deleteuom', 	paymentTypeService.deleteUom);
}