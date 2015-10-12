/**
 * File Name	:	voucherRoutes.js
 * Description	:	To write Routing middlewares For voucherRoutes.
 * Author		:	Saranya G
 * Date			:	October 05, 2015
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

var voucherService= require('../services/VoucherService.js');

module.exports = function(app, server){
	
	// Voucher
	app.post('/getvoucherlist', voucherService.getVoucherList);
	app.post('/saveorupdatevoucher', voucherService.saveOrUpdateVoucher);
	
	// Voucher Type List
	app.post('/saveorupdatevouchertype', voucherService.saveOrUpdateVoucherType);
	app.post('/getvouchertypelist', voucherService.getVoucherTypeList);
}

