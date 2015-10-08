/**
 * File Name	:	voucherRoutes.js
 * Description	:	To write Routing middlewares For User.
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

var m_voucher_service= require('../services/VoucherService.js');

module.exports = function(app, server){
	app.post('/getvoucherlist', m_voucher_service.getVoucherList);
	app.post('/getvouchertypelist', m_voucher_service.getVoucherTypeList);
	app.post('/saveorupdatevoucher', m_voucher_service.saveOrUpdateVoucher);
	
}

