/**
 * File Name	:	CommonService.js
 * Description	:	Common functionalities.
 * Author		:	Haris K.A.
 * Date			:	October 14, 2015
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

var config 			= require('../config/config.js');
var log				= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
					 };

//generate OTP
exports.generateOTP = function(digit){
	return(Math.random().toString().substr(2,digit));
}

exports.sendMail = function(toAdd, msg, sub, callback){
	
	var nodemailer	= require('nodemailer');
	var fromAdd		= config.mailid;
	var password	= config.mailPassword;
	var transporter	= nodemailer.createTransport("SMTP",{
	    //service: 'Yahoo',
	    auth: {
	        user: fromAdd,
	        pass: password
	    }
	});
	var mailOptions = {
	    from	: fromAdd,	// sender address
	    to		: toAdd,	// list of receivers
	    subject	: sub,		// Subject line
	    //text	: msg
	    html	: msg		// html body
	};
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	log.error(error);
	    	response.status = false;
	    	response.message = error;
	    	callback(response);
	    } else{
	    	log.info(info);
	    	response.status = true;
	    	response.message = info;
	    	callback(response);
	    }
	   
	});
		
}