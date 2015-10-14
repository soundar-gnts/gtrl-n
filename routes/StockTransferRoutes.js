/**
 * @Filename 		: StockTranferRoutes 
 * @Description 	: To write Business Logic for BankRoutes. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */

var stockTransferService = require('../services/StockTransferService.js');

module.exports = function(app, server){
	app.post('/getstocktransferhdr', stockTransferService.getStocktransferHdr);
	app.post('/getstocktransferdtl', stockTransferService.getStocktransferDtl);
	app.post('/savestocktransdtls', stockTransferService.saveStockTransDtls);
	app.post('/savetransferdetails', stockTransferService.saveTransferDetails);

}