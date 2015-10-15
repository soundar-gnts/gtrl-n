/**
 * File Name	:	PurchaseReturnRoutes.js
 * Description	:	To write Routing middlewares For PurchaseReturn.
 * Author		:	Saranya G.
 * Date			:	October 10, 2015
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

var purchaseReturnService		= require('../services/PurchaseReturnService.js');
var purchasereturndtlservice	= require('../services/PurchaseReturnDtlService.js');

module.exports = function(app, server){
	
	//Purchase Return Header	
	
	app.post('/getpurchasereturnhdrlist',purchaseReturnService.getPurchaseReturnHdrList);	
	app.post('/updatepurchasereturnstatus',purchaseReturnService.updatePurchaseReturnStatus);	
	app.post('/saveorupdatepurchasereturn',purchaseReturnService.saveOrUpdatePurchaseReturn);	
	
	
	//Purchase Return Details
	
	app.post('/getpurchasereturndtl',purchasereturndtlservice.getPurchaseReturnDtl);
	
	//app.post('/savePurchasereturndtl',purchasereturndtlservice.savePurchaseReturnDtl);
	//app.post('/deletepurchasereturndtl',purchasereturndtlservice.deletePurchaseReturnDtl);	

}
