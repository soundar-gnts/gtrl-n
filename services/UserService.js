/**
 * File Name	:	UserService.js
 * Description	:	To write Business Logic For User.
 * Author		:	Haris K.A.
 * Date			:	October 03, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 0.1         October 03, 2015      Saranya G
 * 
 */

var path			= require('path');
var fileName		=path.basename(__filename);
var log				= require('../config/logger').logger;
var User			= require('../models/User.js');
var Customer		= require('../models/Customer.js');
var userGroup		= require('../models/UserGroup.js'); 
var userAccessTree	= require('../models/UserAccessTree.js');
var employee		= require('../models/Employee.js'); 


//generate OTP
function generateOTP(){
	return(Math.random().toString().substr(2,4));
}

//user signup
exports.signup = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(req.param('userid')!=null){
		userUpdation(req);
		if(req.param('mode') == 'mob')
		customerUpdation(req);
		log.info('Successfully Edit.');
		response.message = 'Successfully Edit.';
		response.status  = true;
		res.send(response);
		
	} else{
		User.findOne({where : {login_id : req.param('loginid')}})
		.then(function(user){
			if(!user){
				userUpdation(req);
				if(req.param('mode') == 'mob')
				customerUpdation(req);
				log.info('Successfully Registered.');
				response.message = 'Successfully Registered.';
				response.status  = true;
				res.send(response);
			}
			else{
				log.info('Email Id Exist.');
				response.message = 'Email Id Exist.';
				response.status  = false;
				res.send(response);
			}
		});
		
	}
	
}
function userUpdation(req){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var otp = generateOTP();
	User.upsert({
		user_id			: req.param('userid'),
		login_id		: req.param('loginid'),
		user_name		: req.param('firstname')+' '+req.param('lastname'),
		login_pwd		: req.param('loginpwd'),
		access_Card_no	: req.param('accesscardno'),
		group_id		: req.param('groupid'),
		edit_units_yn	: req.param('editunitsyn'),
		data_access_lvl	: req.param('dataaccesslvl'),
		data_store_id	: req.param('datastoreid'),
		data_region_id	: req.param('dataregionid'),
		txn_access_lvl	: req.param('txnaccesslvl'),
		txn_store_id	: req.param('txnstoreid'),
		txn_region_id	: req.param('txnregionid'),
		credit_bill_yn	: req.param('creditbillyn'),
		employee_id		: req.param('employeeid'),
		discount_prcnt	: req.param('discountprcnt'),
		edit_price_yn	: req.param('editpriceyn'),
		edit_tax_yn		: req.param('edittaxyn'),
		status			: req.param('status'),
		company_id		: req.param('companyid'),
		otp_code		: otp,
		last_updated_dt	: new Date(),
	    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}
function customerUpdation(req){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	Customer.upsert({
		cust_id			: req.param('custid'),
		cus_first_name	: req.param('firstname'),
		cus_last_name	: req.param('lastname'),
		email_id		: req.param('loginid'),
		mobile_no		: req.param('mobileno'),
		company_id		: req.param('companyid'),
		last_updated_dt	: new Date(),
	    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}

//User Login
exports.login = function(req, res){

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	User.findOne({
		where		: {login_id : req.param('loginId'),login_pwd : req.param('loginPwd'),company_id : req.param('companyId')},
		include		: [
		       		   {model : employee, attributes: ['store_id']},
		       		   {model : userGroup, attributes: ['group_id', 'group_name'],
		       			   include : {model : userAccessTree, attributes: ['screen_name']}
		       		   }
		       		   
		       		   
		],
		attributes	: ['user_id', 'user_name', 'session_id', 'company_id']
	})
		.then(function(user){
			if(!user){
				log.info('Please Enter Valid Username OR Password');
				response.message = 'Please Enter Valid Username OR Password';
				response.status  = false;
				response.data  = user;
				res.send(response);
				
			}else{
				if(user.status=="Verification"){
					log.info('OTP Verifiction is Pending');
					response.message = 'OTP Verifiction is Pending';
					response.status  = true;
					response.data  = user;
					res.send(response);
				}
					
				
				log.info('You have logged in successfully');
				response.message = 'You have logged in successfully';
				response.status  = true;
				response.data  = user;
				res.send(response);
				
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	}

// list all users
exports.getUser = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition 	= "";
	var userId 		= req.param('userid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var userName 	= req.param('username');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(userId!=null)
		if(condition === "")
			condition = "user_id='"+userId+"'";
	
		else
			condition = condition+" and user_id='"+userId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(userName!=null)
		if(condition === null)
			condition = "user_name='"+userName+"'";
	
		else
			condition = condition+" and user_name='"+userName+"'";
		
	User.findAll({where : [condition]})
		.then(function(users){
			if(users.length == 0){
				log.info('Empty User List.');
				response.message = 'Empty User List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+users.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+users.length+' results.';
				response.data 		= users;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}

exports.getAllCustomer = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	Customer.findAll()
		.then(function(users){
			if(users.length == 0){
				log.info('Empty User List.');
				response.message = 'Empty User List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('User List Exist.');
				response.message = users;
				response.status  = false;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}
