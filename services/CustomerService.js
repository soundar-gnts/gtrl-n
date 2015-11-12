/**
 * @Filename 		: CustomerService.js 
 * @Description 	: To write Business Logic for m_customer. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 08, 2015
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
var customer = require('../models/Customer.js');
var log = require('../config/logger').logger;

var APPMSG			= require('../config/Message.js');

// To get Customer List based on user param
exports.getCustomerDetails = function(condition, selectedAttributes, callback) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	customer.findAll({where : [condition],attributes: selectedAttributes}).then(function(result) {
		if(result.length === 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		callback(response);
	});
}




// To Save Save/Update Customer Details
exports.saveCustomer = function(customr, callback) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	};
	if(customr.cust_id != null){
		customer.upsert(customr).then(function(data){
			log.info(APPMSG.CUSTOMEREDITSUCCESS);
			response.message = APPMSG.CUSTOMEREDITSUCCESS;
			response.status  = true;
			response.data  = customr.cust_id;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			callback(response);
		});
	} else{
		customer.create(customr).then(function(data){
			log.info(APPMSG.CUSTOMERSAVESUCCESS);
			response.message = APPMSG.CUSTOMERSAVESUCCESS;
			response.status  = true;
			response.data  = data.cust_id;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			callback(response);
		});
	}
}