/**
 * File Name	:	PoRoutes.js
 * Description	:	To write Routing middlewares For Purchase order details.
 * Author		:	Haris K.A.
 * Date			:	October 09, 2015
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

var poService = require('../services/PoService.js');

module.exports = function(app, server){
	
	//header tables
	app.post('/savepodetails',			poService.saveOrUpdatePo);
	app.post('/getpodetails', 			poService.getPo);
	app.post('/changepostatus', 		poService.changePoStatus);
	
	//details tables
	app.post('/getpodatadetails', 		poService.getPoDetails);
	
}