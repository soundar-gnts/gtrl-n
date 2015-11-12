/**
 * File Name	:	PaymentTypeervice.js
 * Description	:	To write Business Logic For Payment Type.
 * Author		:	Haris K.A.
 * Date			:	October 06, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 * 
 */

var path 		= require('path');
var fileName	= path.basename(__filename);
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var paymentType = require('../models/PaymentType.js');

var response 	= {
					status	: Boolean,
					message : String,
					data	: String
				 }

//insert or update Payment type
exports.saveOrUpdatePymentType = function(paytypeobj,callback){
	log.info(fileName+'.saveOrUpdatePymentType');
	paymentType.upsert(paytypeobj).then(function(data){
		if(data){
			log.info(appMsg.PAYMENTTYPESAVESUCCESS);
			response.message 	= appMsg.PAYMENTTYPESAVESUCCESS;
			response.status  	= true;
			response.data  		= "";
			callback(response);
		} else{
			log.info(appMsg.PAYMENTTYPEEDITSUCCESS);
			response.message 	= appMsg.PAYMENTTYPEEDITSUCCESS;
			response.status  	= true;
			response.data  		= "";
			callback(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}


//get all Payment type
exports.getPymentType = function(condition,selectedAttributes,callback){
	log.info(fileName+'.getPymentType');
	
	paymentType.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(type){
			if(type.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message 	= appMsg.LISTNOTFOUNDMESSAGE;
				response.status 	= false;
				response.data  		= "";
				callback(response);
			} else{
				log.info('About '+type.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+type.length+' results.';
				response.data 		= "";
				callback(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}