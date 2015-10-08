/**
 * @Filename	:	CustomerRoutes.js
 * @Description	:	To write Routing middlewares For Customer related tables.
 * @Author		:	SOUNDAR C
 * @Date		:	October 08, 2015
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
var customerService = require('../services/CustomerService.js');
var customerTypeService = require('../services/CustomerTypeService.js');
var custAgeGroupService = require('../services/CustAgeGroupService.js');


module.exports = function(app, server) {
	//For Customer
	app.post('/getcustomerdetails', customerService.getCustomerDetails);
	app.post('/savecustomer', customerService.saveCustomer);
	//For Customer Type
	app.post('/getcustomertypedetails', customerTypeService.getCustomerTypeDetails);
	app.post('/savecustomertype', customerTypeService.saveCustomerType);
	//For Customer age group
	app.post('/getcustagegroupdetails', custAgeGroupService.getCustAgeGroupDetails);
	app.post('/savecustagegroup', custAgeGroupService.saveCustAgeGroup);
}

