/**
 * @Filename	:	SerialNoGenRoutes.js
 * @Description	:	To write Routing middlewares For Serial Number Generation.
 * @Author		:	SOUNDAR C
 * @Date		:	October 06, 2015
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
var slnoGenService = require('../services/SlnoGenService.js');
module.exports = function(app, server) {
	app.post('/getslnogendetails', slnoGenService.getSlnoGenDetails);
	app.post('/updatesequenceno', slnoGenService.updateSequenceNo);
}

