/**
 * @Filename	:	PurchaseRoutes.js
 * @Description	:	To write Routing middlewares for Purchase related Table.
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
var purchaseService = require('../services/PurchaseService.js');
module.exports = function(app, server) {
	//For purchase header
	app.post('/getpurchasehdrdetails', purchaseService.getPurchaseHdrDetails);
	app.post('/savepurchasehdrdetails', purchaseService.savePurchaseHdrDetails);
	app.post('/updatepurchasestatus', purchaseService.updatePurchaseStatus);
	//For purchase details
	app.post('/getpurchasedetails', purchaseService.getPurchaseDetails);
	app.post('/deletepurchasedetails', purchaseService.deletePurchaseDetails);
	app.post('/savepurchasedtls', purchaseService.savePurchaseDtls);
}

