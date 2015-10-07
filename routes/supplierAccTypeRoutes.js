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

var supplierAccountTypeService = require('../services/m_supp_acct_type_service.js');

module.exports = function(app, server){
	app.post('/addsupplieraccounttype', 	supplierAccountTypeService.saveOrUpdateSupplierAccountType);
	app.post('/getallsupplieraccounttype', 	supplierAccountTypeService.getAllSupplierAccountType);
	app.post('/getsupplieraccounttype', 	supplierAccountTypeService.getOneSupplierAccountType);
	//app.post('/deletesupplieraccounttype',supplierAccountTypeService.deleteSupplierAccountType);
}