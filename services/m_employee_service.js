/**
 * @Filename 		: m_employee_service.js 
 * @Description 	: To write Business Logic for employee. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 03, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var employee = require('../models/m_employee.js');

// To get full Employee List
exports.getEmployeeDetails = function(req, res) {
	employee.findAll({
		where : {
			company_id : req.param('companyid')
		}
	}).then(function(err, result) {
		if (err)
			res.send(err);
		else
			res.send(result);
	})
}




// To Save Employee
exports.saveEmployee= function(req, res) {
	employee.create({
		employee_id			: req.param("employeeid"),
		company_id			: req.param("companyid"),
		employee_code 		: req.param("employeecode"),
		first_name 			: req.param("firstname"),
		last_name 			: req.param("lastname"),
		primary_phone 		: req.param("primaryphone"),
		dob 				: req.param("dob"),
		gender 				: req.param("gender"),
		department 			: req.param("department"),
		store_id 			: req.param("storeid"),
		rm_employee_id 		: req.param("rmemployeeid"),
		user_id 			: req.param("userid"),
		status 				: req.param("status"),
		last_updated_dt 	: req.param("lastupdateddt"),
		last_updated_by 	: req.param("lastupdatedby")
	}).then(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send('Successfully Added.');
		}
	});
		
}


