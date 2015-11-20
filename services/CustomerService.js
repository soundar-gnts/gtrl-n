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
var customer 	= require('../models/Customer.js');
var log 		= require('../config/logger').logger;
var response 	= {
					status	: Boolean,
					message : String,
					data	: String
					};
var appmsg		= require('../config/Message.js');

// To get Customer List based on user param
exports.getCustomerDetails = function(condition,attr,fetchAssociation,callback) {
	
	console.log('fetchAssociation-->'+fetchAssociation);
	customer.findAll({where : [condition],include	: fetchAssociation,attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
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
exports.saveCustomer = function(customerobj,callback) {
	customer.upsert(customerobj).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			callback(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
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


