/**
 * File Name	:	userService.js
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
	User.findOne({where : {login_id : req.param('email')}})
	.then(function(user){
		if(!user){
			var otp=generateOTP();
			User.create({
				login_id		: req.param('email'),
				user_name		: req.param('username'),
				login_pwd		: req.param('password'),
				access_Card_no	: req.param('cardno'),
				group_id		: req.param('groupid'),
				edit_units_yn	: req.param('editunit'),
				data_access_lvl	: req.param('dataaccesslevel'),
				data_store_id	: req.param('datastore'),
				data_region_id	: req.param('dataregion'),
				txn_access_lvl	: req.param('txnaccesslevel'),
				txn_store_id	: req.param('txnstore'),
				txn_region_id	: req.param('txnregion'),
				credit_bill_yn	: req.param('creditbill'),
				employee_id		: req.param('employeeid'),
				discount_prcnt	: req.param('discount'),
				edit_price_yn	: req.param('editprice'),
				edit_tax_yn		: req.param('edittax'),
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
			if(req.param('mode')=='mob'){
				Customer.create({
					cus_first_name	: req.param('firstname'),
					cus_last_name	: req.param('lastname'),
					email_id		: req.param('email'),
					mobile_no		: req.param('mobile'),
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
			log.info('Successfully Registered.');
			response.message = 'Successfully Registered.';
			response.status  = false;
			res.send(response);
			
		} else{
			log.info('Email already exist.');
			response.message = 'Email already exist.';
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


//user Login
exports.login = function(req, res){
	User.findOne({where : {login_id : req.param('email'),login_pwd : req.param('password'),company_id : req.param('companyid')
		}})
		.then(function(user){
			if(!user){
				res.send('Invalid');
			} else{
				res.send('success');
			}
		})
		.error(function(err){
			res.send(err);
		});
	}


