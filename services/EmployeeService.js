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
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var commonService 		= require('../services/CommonService.js');
var appmsg				= require('../config/Message.js');
var slnogenService 		= require('../services/SlnoGenService.js');

var path 				= require('path');
var filename			= path.basename(__filename);

// To get full Employee List
exports.getEmployeeDetails = function(condition,attr,callback) {
	
	employee.findAll({where : [condition],attributes: attr}).then(function(result) {
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
	}).error(function(err){
			log.info(filename+'>>getEmployeeDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			callback(response);
	});
}

//To Save Employee
exports.saveEmployee = function(employeedtl,userdtl,callback){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}	
	
	if(employeedtl.employee_id!=null){
	
		employee.upsert(employeedtl)
		.then(function(data){			
			user.upsert(userdtl);
			log.info(filename+'>>saveEmployee>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{	
		   employee.create(employeedtl)	
			.then(function(data){
				if(employeedtl.create_user_yn!=null&&employeedtl.create_user_yn.toUpperCase()=='Y'){
				userdtl.employee_id = data.employee_id;
				user.upsert(userdtl);
				}
				log.info(filename+'>>saveEmployee>>'+appmsg.SAVEMESSAGE);
				response.message = appmsg.SAVEMESSAGE;
				response.status  = true;
				response.data	 = "";
				callback(response);
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= appmsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
			});
	
	}
}



