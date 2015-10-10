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
var purchasereturndtlservice		= require('../services/PurchaseReturnDtlService.js');

module.exports = function(app, server){
	
	//Purchase Return Header
	
	app.post('/savepurchasereturnhdr',purchaseReturnService.savePurchaseReturnHdr);
	app.post('/getpurchasereturnhdrlist',purchaseReturnService.getPurchaseReturnHdrList);	
	app.post('/deletepurchasereturnhdr',purchaseReturnService.deletePurchaseReturnHdr);	
	
	//Purchase Return 	Header
	
	app.post('/savepurchasereturndtl',purchasereturndtlservice.savePurchaseReturnDtl);
	app.post('/getpurchasereturndtl',purchasereturndtlservice.getPurchaseReturnDtl);	
	app.post('/deletepurchasereturndtl',purchasereturndtlservice.deletePurchaseReturnDtl);	

}
