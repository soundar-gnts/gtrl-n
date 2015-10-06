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
var m_slno_gen_service = require('../services/m_slno_gen_service.js');
module.exports = function(app, server) {
	app.post('/getslnogendetails', m_slno_gen_service.getSlnoGenDetails);
	app.post('/saveslnogen', m_slno_gen_service.saveSlnoGen);
}

