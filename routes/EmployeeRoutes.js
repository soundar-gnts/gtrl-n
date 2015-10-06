/**
 * @Filename	:	EmployeeRoutes.js
 * @Description	:	To write Routing middlewares for Employee Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 06, 2015
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
var m_employee_service = require('../services/m_employee_service.js');
module.exports = function(app, server) {
	app.post('/getemployeedetails', m_employee_service.getEmployeeDetails);
	app.post('/saveemployee', m_employee_service.saveEmployee);
}

