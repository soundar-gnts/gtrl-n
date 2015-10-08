/**
 * File Name	:	SupplierAccountType.js
 * Description	:	To write Routing middlewares For Supplier Account Type.
 * Author		:	Haris K.A.
 * Date			:	October 07, 2015
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

var supplierAccountTypeService = require('../services/SupplierAccountTypeService.js');

module.exports = function(app, server){
	
	app.post('/savesupplieraccounttypedetails', supplierAccountTypeService.saveOrUpdateSupplierAccountType);
	app.post('/getsupplieraccounttypedetails', 	supplierAccountTypeService.getSupplierAccountType);
	
}