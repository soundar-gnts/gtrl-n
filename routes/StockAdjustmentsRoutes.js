/**
 * @Filename	:	StockAdjustmentsRoutes.js
 * @Description	:	To write Routing middlewares for t_stock_adjustments Table.
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
var stockAdjustmentsService = require('../services/StockAdjustmentsService.js');
module.exports = function(app, server) {
	app.post('/getstockadjustmentsdetails', stockAdjustmentsService.getStockAdjustmentsDetails);
	app.post('/savestockadjustments', stockAdjustmentsService.saveStockAdjustments);
}

