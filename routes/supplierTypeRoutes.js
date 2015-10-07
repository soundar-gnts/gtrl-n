/**
 * File Name	:	taxRoutes.js
 * Description	:	To write Routing middlewares For Tax.
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

var supplierTypeService = require('../services/m_supplier_type_service.js');

module.exports = function(app, server){
	app.post('/addsuppliertype', 		supplierTypeService.saveOrUpdateSupplierType);
	app.post('/getallsuppliertype', 	supplierTypeService.getAllSupplierType);
	app.post('/getsuppliertype', 		supplierTypeService.getOneSupplierType);
	//app.post('/deletesuppliertype',	supplierTypeService.deleteSupplierType);
}