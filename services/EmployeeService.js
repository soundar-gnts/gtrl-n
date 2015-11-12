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
var employee 			= require('../models/Employee.js');
var user 				= require('../models/User.js');
var log 				= require('../config/logger').logger;
var commonService 		= require('../services/CommonService.js');
var appmsg				= require('../config/Message.js');
var slnogenService 		= require('../services/SlnoGenService.js');

var path 				= require('path');
var filename			= path.basename(__filename);

// To get full Employee List
exports.getEmployeeDetails = function(condition, selectedAttributes, callback) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
		}
	
	employee.findAll({where : [condition],attributes: selectedAttributes})
	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getEmployeeDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			log.info(filename+'>>getEmployeeDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
		log.info(filename+'>>getEmployeeDetails>>');
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		callback(response);
	});
}

//To Save Employee
exports.saveEmployee = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}	
	var employeedtl = {
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
			last_updated_by 	: req.param("lastupdatedby"),
			email_id 			: req.param("emailid"),
			create_user_yn 		: req.param("createuseryn")
	}
	
	var userdtl = {		     
			    user_id 		: req.param("userid"),
				login_id		: req.param("emailid"),
				user_name		: req.param("firstname")+' '+req.param("lastname"),
				login_pwd		: commonService.generateOTP(4),
				employee_id		: req.param("employeeid"),
				status			: 'Active',
				company_id		: req.param("companyid"),
				otp_code		: commonService.generateOTP(6),
				last_updated_dt	: req.param("lastupdateddt"),
			    last_updated_by	: req.param("lastupdatedby")
		}
	
	if(req.param('employeeid')!=null){
	
		employee.upsert(employeedtl)
		.then(function(data){			
			user.upsert(userdtl);
			log.info(filename+'>>saveEmployee>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			res.send(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	} else{	
		   employee.create(employeedtl)	
			.then(function(data){
				if(req.param("createuseryn")!=null&&req.param("createuseryn").toUpperCase()=='Y'){
				userdtl.employee_id = data.employee_id;
				user.upsert(userdtl);
				}
				log.info(filename+'>>saveEmployee>>'+appmsg.SAVEMESSAGE);
				response.message = appmsg.SAVEMESSAGE;
				response.status  = true;
				res.send(response);
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= appmsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});
	
	}
}



