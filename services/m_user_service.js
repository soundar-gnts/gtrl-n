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

var User = require('../models/m_user.js');
var Customer = require('../models/m_customer.js');

//generate OTP
function generateOTP(){
	return(Math.random().toString().substr(2,4));
}

//user signup
exports.signup = function(req, res){
	User.findOne({where : {login_idd : req.param('email')}})
	.then(function(user){
		if(!user){
			var otp=generateOTP();
			User.create({
				login_id		: req.param('email'),
				user_name		: req.param('firstname')+' '+req.param('lastname'),
				login_pwd		: req.param('password'),
				company_id		: req.param('companyid'),
				otp_code		: otp,
				last_updated_dt	: new Date(),
			    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
			}).error(function(err){
				res.send(err);
			});
			Customer.create({
				cus_first_name	: req.param('firstname'),
				cus_last_name	: req.param('lastname'),
				email_id		: req.param('email'),
				mobile_no		: req.param('mobile'),
				company_id		: req.param('companyid'),
				last_updated_dt	: new Date(),
			    last_updated_by	: req.param('firstname')+' '+req.param('lastname')
			}).error(function(err){
				res.send(err);
			})
			res.send('Successfully Registered.');
		} else{
			res.send('Email already exist.');
		}
	})
	.error(function(err){
		res.send(err);
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


