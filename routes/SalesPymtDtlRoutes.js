/**
 * @Filename	:	SalesPymtDtlRoutes.js
 * @Description	:	To write Routing middlewares for Sales Payment Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 26, 2015
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
var salesPymtDtlService = require('../services/SalesPymtDtlService.js');
module.exports = function(app, server) {
	app.post('/getsalespymtdetails', salesPymtDtlService.getSalesPymtDetails);
	app.post('/savesalespymtdetails', salesPymtDtlService.saveSalesPymtDetails);
	app.post('/deletesalespymtdetails', salesPymtDtlService.deleteSalesPymtDetails);
}

