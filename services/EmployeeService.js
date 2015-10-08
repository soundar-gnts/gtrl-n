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
var employee = require('../models/Employee.js');
var user = require('../models/user.js');

// To get full Employee List
exports.getEmployeeDetails = function(req, res) {
	var condition = "";
	var employeeid=req.param("employeeid");
	var companyid=req.param("companyid");
	var employeecode=req.param("employeecode");
	var firstname=req.param("firstname");
	var gender=req.param("gender");
	var storeid=req.param("storeid");
	var status=req.param("status");
	if(employeeid!=null){
		condition ="employee_id="+employeeid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(employeecode!=null){
		if(condition === ""){
			condition="employee_code like '%"+employeecode+"%'";
		}else {
			condition=condition+" and employee_code like '%"+employeecode+"%'";
		}
	}
	if(firstname!=null){
		if(condition === ""){
			condition="first_name like '%"+firstname+"%'";
		}else {
			condition=condition+" and first_name like '%"+firstname+"%'";
		}
	}
	if(gender!=null){
		if(condition === ""){
			condition="gender='"+gender+"'";
		}else {
			condition=condition+" and gender='"+gender+"'";
		}
	}
	if(storeid!=null){
		if(condition === ""){
			condition="store_id='"+storeid+"'";
		}else {
			condition=condition+" and store_id='"+storeid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	employee.findAll({where : [condition]}).then(function(err, result) {
		if (err)
			res.send(err);
		else
			res.send(result);
	})
}




// To Save Employee
exports.saveEmployee= function(req, res) {
	employee.upsert({
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
	})
	.then(function(p) {
		user.upsert({
			login_id		: p.first_name,
			user_name		: p.first_name+' '+p.last_name,
			login_pwd		: 'user',
			employee_id		: p.employee_id,
			status			: 'Active',
			company_id		: p.company_id,
			last_updated_dt	: new Date(),
		    last_updated_by	: 'Created by Self.'
		}).error(function(err){
			
		});
		
	})
	.error(function(err) {
		res.send(err);
	});;
	res.send('Successfully Saved.');
}


