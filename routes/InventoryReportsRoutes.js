/**
 * @Filename	:	InventoryReportsRoutes.js
 * @Description	:	To write Routing middlewares for Inventory Reports Routes.
 * @Author		:	SOUNDAR C
 * @Date		:	October 18, 2015
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
var rptStockTransfersService 	= require('../services/RptStockTransfersService.js');
var rptPurchaseReturnService 	= require('../services/RptPurchaseReturnService.js');
var rptPurchaseOrderService 	= require('../services/RptPurchaseOrderService.js');
var rptPurchaseService 			= require('../services/RptPurchaseService.js');
var rptInventoryService 		= require('../services/RptInventoryService.js');

module.exports = function(app, server) {
	app.post('/getstocktransferrptdetails', rptStockTransfersService.getStockTransferRptDetails);
	app.post('/getpurchasererurnrptdetails', rptPurchaseReturnService.getPurchaseRerurnRptDetails);
	app.post('/getpurchaseorderrptdetails', rptPurchaseOrderService.getPurchaseOrderRptDetails);
	//For Purchase 
	app.post('/getpurchaserptdetails', rptPurchaseService.getPurchaseRptDetails);
	app.post('/getpurchasesummarydetails', rptPurchaseService.getPurchaseSummaryDetails);
	
	//For stock summery and ledger
	app.post('/getstocksummeryrptdetails', rptInventoryService.getStockSummeryRptDetails);
	app.post('/getstockledgerrptdetails', rptInventoryService.getStockLedgerRptDetails);
}

