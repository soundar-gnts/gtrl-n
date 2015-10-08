/**
 * @Filename	:	TxnsTypeRoutes.js
 * @Description	:	To write Routing middlewares For Transaction Type table.
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
var txnsTypeService = require('../services/TxnsTypeService.js');
module.exports = function(app, server) {
	app.post('/gettxnstypedetails', txnsTypeService.getTxnsTypeDetails);
	app.post('/savetxnstype', txnsTypeService.saveTxnsType);
}

