/**
 * File Name	:	SupplierRoutes.js
 * Description	:	To write Routing middlewares For Supplier.
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

var supplierService = require('../services/SupplierService.js');

module.exports = function(app, server){
	
	app.post('/savesupplierdetails',supplierService.saveOrUpdateSupplierDetails);
	app.post('/getsupplierdetails', supplierService.getSupplier);
	
}