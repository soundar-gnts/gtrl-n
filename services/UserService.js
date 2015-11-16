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
var fileName		= path.basename(__filename);
var log				= require('../config/logger').logger;
var User			= require('../models/User.js');
var Customer		= require('../models/Customer.js');
var userGroup		= require('../models/UserGroup.js'); 
var userAccessTree	= require('../models/UserAccessTree.js');
var employee		= require('../models/Employee.js');
var common			= require('../services/CommonService.js');
var crypto 			= require('crypto');


//user signup
exports.signup = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var customer = {
			cust_id			: req.param('custid'),
			cus_first_name	: req.param('firstname'),
			cus_last_name	: req.param('lastname'),
			email_id		: req.param('loginid'),
			mobile_no		: req.param('mobileno'),
			company_id		: req.param('companyid'),
			last_updated_dt	: new Date(),
		    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
	}
	
	
	
	var user = {
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
			last_updated_dt	: req.param('lastupdateddt'),
		    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
	}
	
	if(req.param('mode') == 'mob'){
		createOrUpdateCustomer(customer, function(result){
			if(!result.status)
				res.send(result);
			else{
				createOrUpdateUser(user, result.data, function(data){
					res.send(data);
				});
			}
			
		});
	}
}

function createOrUpdateCustomer(customer, callback){
	var result = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(customer.cust_id != null){
		Customer.upsert(customer)
		.then(function(data){
			log.info('Customer editted successfully.');
			result.message = 'Customer editted successfully.';
			result.status  = true;
			callback(result);
		})
		.error(function(err){
			log.error(err);
			result.status  	= false;
			result.message 	= 'Internal error.';
			result.data  	= err;
			callback(result);
		});
	} else{
		Customer.findOne({
			where : {email_id : customer.email_id}
		})
		.then(function(cust){
			
			if(cust){
				log.info('Your Email ID already registered.');
				result.message	= 'Your Email ID already registered.';
				result.status 	= false;
				callback(result);
			} else{
				Customer.create(customer)
				.then(function(data){
					log.info('Customer seved successfully.');
					result.message	= 'Customer seved successfully.';
					result.status 	= true;
					result.data		= data.cust_id;
					callback(result);
				})
				.error(function(err){
					log.error(err);
					result.status  	= false;
					result.message 	= 'Internal error.';
					result.data  	= err;
					callback(result);
				});
			}
		})
		.error(function(err){
			log.error(err);
			result.status  	= false;
			result.message 	= 'Internal error.';
			result.data  	= err;
			callback(result);
		})
		
	}
}

function createOrUpdateUser(user, custId, callback){
	var result = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(user.user_id != null){
		
		User.upsert(user)
		.then(function(data){
			log.info('User editted successfully.');
			result.message = 'User editted successfully.';
			result.status  = true;
			callback(result);
		})
		.error(function(err){
			log.error(err);
			result.status  	= false;
			result.message 	= 'Internal error.';
			result.data  	= err;
			callback(result);
		})
	} else{
		var shasum = crypto.createHash('sha1');
		shasum.update(user.login_pwd);
		user.login_pwd	= shasum.digest('hex');
		user.status		= 'pending';
		user.cust_id	= custId;
		user.otp_code	= common.generateOTP(4);
		User.create(user)
		.then(function(data){
			log.info('User seved successfully.');
			log.info('Registered successfully. OTP has been sent to your mobile no.');
			result.message	= 'Registered successfully. OTP has been sent to your mobile no.';
			result.status 	= true;
			callback(result);
		}).error(function(err){
			log.error(err);
			result.status  	= false;
			result.message 	= 'Internal error.';
			result.data  	= err;
			callback(result);
		})
	}
}


//User Login
exports.login = function(req, res){

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var shasum = crypto.createHash('sha1');
	shasum.update(req.param('loginpwd'));
	var pwd	= shasum.digest('hex');
	
	User.findOne({
		where		: {login_id : req.param('loginid'), login_pwd : pwd, company_id : req.param('companyid')},
		include		: [
		       		   {model : employee, attributes: ['store_id']},
		       		   {model : userGroup, attributes: ['group_id', 'group_name'],
		       			   include : {model : userAccessTree, attributes: ['screen_name']}
		       		   }
		       		   
		       		   
		],
		attributes	: ['user_id', 'cust_id', 'user_name', 'session_id', 'company_id', 'status']
	})
		.then(function(user){
			
			if(!user){
				log.info('Please Enter Valid Username OR Password');
				response.message = 'Please Enter Valid Username OR Password';
				response.status  = false;
				response.data  = user;
				res.send(response);
				
			} else if(user.status=="pending"){
				log.info('OTP Verification is Pending');
				response.message = 'OTP Verification is Pending';
				response.status  = false;
				res.send(response);
			} else if(user.status=="verified"){
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

// OTP verification
exports.userOTPVerification = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	User.findOne({
		where : {login_id : req.param('loginid'),otp_code : req.param("otpcode"),company_id : req.param('companyid')}
	})
	.then(function(data){
		console.log(data);
		if(!data){
			log.info('Invalid OTP');
			response.message = 'Invalid OTP';
			response.status  = false;
			res.send(response);
			
			
		} else if(data.status === "verified"){
			log.info('Your account has been already activated.');
			response.message = 'Your account has been already activated.';
			response.status  = true;
			
			res.send(response);
		} else if(data.status != "verified"){
			data.status = "verified";
			data.save();
			log.info('Your account has been activated.');
			response.message = 'Your account has been activated.';
			response.status  = true;
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

// Resend OTP
exports.resendOTP = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	User.findOne({
		where 	: {login_id : req.param('loginid'),company_id : req.param('companyid')},
		include : {model : Customer, attributes : ['mobile_no']}
	})
	.then(function(data){
		
		if(!data){
			log.info('You are not an existing user. Please Signup for further processing.');
			response.message = 'You are not an existing user. Please Signup for further processing.';
			response.status  = true;
			res.send(response);
			
			
		} else if(data.status == "verified"){
			log.info('Your account has been already activated.');
			response.message = 'Your account has been already activated.';
			response.status  = true;
			
			res.send(response);
		} else if(data.status != "verified"){
			data.otp_code = common.generateOTP(4);
			data.save();
//			mobile sms send function
//			console.log(data.m_customer.mobile_no);
			log.info('OTP has sent to your Mobile no.');
			response.message = 'OTP has sent to your Mobile no.';
			response.status  = true;
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

//forgot pasword
//Resend OTP
exports.forgotPassword = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	User.findOne({
		where 	: {login_id : req.param('loginid'),company_id : req.param('companyid')}
	})
	.then(function(data){
		
		if(!data){
			log.info('You are not an existing user. Please Signup for further processing.');
			response.message = 'You are not an existing user. Please Signup for further processing.';
			response.status  = true;
			res.send(response);
			reply.success = false
			
		} else if(data.status != "verified"){
			log.info('Your registered Email ID not yet activated.');
			response.message = 'Your registered Email ID not yet activated.';
			response.status  = false;
			res.send(response);
		} else if(data.status == "verified"){
			var pwd		= common.generateOTP(6);
			var shasum	= crypto.createHash('sha1');
			shasum.update(pwd);
			data.login_pwd = shasum.digest('hex');
			data.save();
			var msg = "Your new Password is -"+pwd;
			
			common.sendMail(req.param('loginid'), msg, 'Forgot password - gRetail', function(result){
				concole.log(result);
			});
			log.info('Password has been sent to your registered email.');
			response.message = 'Password has been sent to your registered email.';
			response.status  = true;
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
	var condition 			= "";
	var fetchAssociation 	= "";
	var userId 				= req.param('userid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var userName 			= req.param('username');
	
	
	if(req.param('fetchassociation')=='y'){
		fetchAssociation = [{model : userGroup, attributes : ['group_name']}]
	}
	
	
	if(companyId != null){
		condition = "company_id="+companyId;
	}
	
	if(userId!=null){
		if(condition === ""){
			condition = "user_id='"+userId+"'";
		}	
		else{
			condition = condition+" and user_id='"+userId+"'";
		}
	}
	
	if(status!=null){
		if(condition === ""){
			condition = "status='"+status+"'";
		}	
		else{
			condition = condition+" and status='"+status+"'";
		}
	}
	
	if(userName!=null){
		if(condition === null){
			condition = "user_name='"+userName+"'";
		}	
		else{
			condition = condition+" and user_name='"+userName+"'";
		}
	}
		
	User.findAll({where : [condition],include		: fetchAssociation})
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
