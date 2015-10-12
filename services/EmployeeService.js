/**
 * @Filename 		: EmployeeService.js 
 * @Description 	: To write Business Logic for Employee. 
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
var user = require('../models/User.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};

// To get full Employee List
exports.getEmployeeDetails = function(req, res) {
	var attr 	= "";
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
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['employee_id','employee_code','first_name','last_name'];
	}
	
	employee.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			
			log.info('No data found.');
			response.message = 'No data found.';
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
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
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			res.send(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}


