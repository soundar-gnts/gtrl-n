/**
 * @Filename	:	SalesReportsRoutes.js
 * @Description	:	To write Routing middlewares for Sales Reports Routes.
 * @Author		:	SOUNDAR C
 * @Date		:	October 19, 2015
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
var rptSalesService 	= require('../services/RptSalesService.js');

module.exports = function(app, server) {
	app.post('/getsalesrptdetails', rptSalesService.getSalesRptDetails);
	app.post('/getsalessummerydetails', rptSalesService.getSalesSummeryDetails);
}

