/**
 * File Name	:	m_user_service.js
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

var log = require('../config/logger').logger;
var User = require('../models/user.js');
var Customer = require('../models/Customer.js');

var response = {
		status	: Boolean,
		message : String
}

//generate OTP
function generateOTP(){
	return(Math.random().toString().substr(2,4));
}

//user signup
exports.signup = function(req, res){
	
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
		response.message = err;
		response.status  = false;
		res.send(response);
	});
}
function customerUpdation(req){
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
		response.message = err;
		response.status  = false;
		res.send(response);
	});
}
//check login_id exist or not
function checkExistingUser(loginid){
	
}
//User Login
exports.login = function(req, res){

	User.findOne({attributes:['user_id','user_name','session_id']},{where : {login_id : req.param('loginId'),login_pwd : req.param('loginPwd'),company_id : req.param('companyId')
		}})
		.then(function(user){
			if(!user){
				res.send('Invalid Username and Password');
			} else{			
				if(user.status=="Verification")
				{
				res.send('OTP Verifiction is Pending');
				}
		
				res.send('success',user);
			}
		})
		.error(function(err){
			res.send(err);
		});
	}

// list all users
exports.getAllUser = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var userName 	= req.param('username');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
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
				log.info('User List Exist.');
				response.message = users;
				response.status  = false;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

exports.getAllCustomer = function(req, res){
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
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

// get one user
exports.getOneUser = function(req, res){
	User.findOne({where : {user_id : req.param('userid')}})
		.then(function(user){
			if(!user){
				log.info('Empty User List.');
				response.message = 'Empty User List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('User Exist.');
				response.message = user;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//delete user
exports.deleteUser = function(req, res){
	User.findOne({where : {user_id : req.param('userid')}})
		.then(function(user){
			if(!user){
				log.info('Empty User List.');
				response.message = 'Empty User List.';
				response.status  = false;
				res.send(response);
			} else{
				user.destroy()
				.then(function(cat){
					log.info('Deleted Successfully.');
					response.message = 'Deleted Successfully.';
					response.status  = true;
					res.send(response);
				});
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//change status of User
exports.inactiveOrActiveUser = function(req, res){
	User.findOne({where : {user_id : req.param('userid')}})
		.then(function(user){
			if(!user){
				log.info('Empty User List.');
				response.message = 'Empty User List.';
				response.status  = false;
				res.send(response);
			} else{
				if(user.status == 'Active')
					user.status = 'Inactive';
				else
					user.status = 'Active';
				user.save()
				log.info('Changed status');
				response.message = 'Changed status';
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}