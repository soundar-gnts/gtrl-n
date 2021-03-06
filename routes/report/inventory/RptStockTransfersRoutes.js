/**
 * @Filename	:	RptStockTransfersRoutes.js
 * @Description	:	To write Routing middlewares for RptStock Transfers Routes related Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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
var rptStockTransfersService = require('../services/report/inventory/RptStockTransfersService.js');
module.exports = function(app, server) {
	app.post('/getstocktransferrptdetails', rptStockTransfersService.getStockTransferRptDetails);
}

