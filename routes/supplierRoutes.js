/**
 * File Name	:	supplierRoutes.js
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

var supplierService = require('../services/m_supplier_service.js');

module.exports = function(app, server){
	app.post('/addsupplier', 		supplierService.saveOrUpdateSupplier);
	app.post('/getallsupplier', 	supplierService.getAllSupplier);
	app.post('/getsupplier', 		supplierService.getOneSupplier);
	//app.post('/deletesupplier', 	supplierService.deleteUom);
}