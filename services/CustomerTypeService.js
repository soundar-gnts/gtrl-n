/**
 * @Filename 		: CustomerTypeService.js 
 * @Description 	: To write Business Logic for m_customer_type. 
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
var customertype 		= require('../models/CustomerType.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');

var path 				= require('path');
var filename			= path.basename(__filename);

// To get Customer Type List based on user param
exports.getCustomerTypeDetails = function(condition,callback) {
	
	customertype.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getCustomerTypeDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getCustomerTypeDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getCustomerTypeDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save Save/Update Customer Type Details
exports.saveCustomerType = function(custtypeobj,callback) {
	customertype.upsert(custtypeobj).then(function(data){
		if(data){
			log.info(filename+'>>saveCustomerType>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		else{
			log.info(filename+'>>saveCustomerType>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveCustomerType>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}


