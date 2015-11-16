/**
 * File Name	:	SupplierAccountTypeService.js
 * Description	:	To write Business Logic For Supplier Account Type.
 * Author		:	Haris K.A.
 * Date			:	October 07, 2015
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

var path 			= require('path');
var fileName		= path.basename(__filename);
var log 			= require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var suppAccType 	= require('../models/SupplierAccountType.js');
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
					 };

//insert or update upplier Account Type
exports.saveOrUpdateSupplierAccountType = function(supplierAccType, callback){
	log.info(fileName+'.saveOrUpdateSupplierAccountType');
	suppAccType.upsert(supplierAccType)
	.then(function(data){
		if(data){
			log.info(appMsg.SUPPLIERACCOUNTTYPESAVESUCCESS);
			response.message = appMsg.SUPPLIERACCOUNTTYPESAVESUCCESS;
			response.status  = true;
			callback(response);
		} else{
			log.info(appMsg.SUPPLIERACCOUNTTYPEEDITSUCCESS);
			response.message = appMsg.SUPPLIERACCOUNTTYPEEDITSUCCESS;
			response.status  = true;
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


//get all upplier Account Type
exports.getSupplierAccountType = function(condition, selectedAttributes, callback){
	log.info(fileName+'.getSupplierAccountType');

	
	suppAccType.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(supAccType){
			if(supAccType.length == 0){
				log.info(fileName+'.getSupplierAccountType - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info(fileName+'.getSupplierAccountType - About '+supAccType.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+supAccType.length+' results.';
				response.data 		= supAccType;
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
