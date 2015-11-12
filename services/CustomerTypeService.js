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
var APPMSG				= require('../config/Message.js');
var path 				= require('path');
var filename			= path.basename(__filename);

// To get Customer Type List based on user param
exports.getCustomerTypeDetails = function(condition, callback) {
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
			}
	
	customertype.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getCustomerTypeDetails>>'+APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
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
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save Save/Update Customer Type Details
exports.saveCustomerType = function(custType, callback) {
	log.info(filename+'>>saveCustomerType>>');
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
			}
	if(custType.cust_group_id != null){
		customertype.upsert(custType).then(function(data){
			log.info(APPMSG.CUSTOMERTYPEEDITSUCCESS);
			response.message = APPMSG.CUSTOMERTYPEEDITSUCCESS;
			response.status  = true;
			response.data	 = custType.cust_group_id;
		}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= APPMSG.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	} else{
		customertype.create(custType).then(function(data){
			log.info(APPMSG.CUSTOMERTYPESAVESUCCESS);
			response.message = APPMSG.CUSTOMERTYPESAVESUCCESS;
			response.status  = true;
			response.data	 = data.cust_group_id;
		}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= APPMSG.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	}
}


