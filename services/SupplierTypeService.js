/**
 * File Name	:	SupplierTypeService.js
 * Description	:	To write Business Logic For Supplier Type.
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
var supplierType 	= require('../models/SupplierType.js');
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
					 };

//insert or update Supplier Type
var saveOrUpdateSupplierType = function(supplierType, callback){
	log.info(fileName+'.saveOrUpdateSupplierType');
	supplierType.upsert(supplierType).then(function(data){
		if(data){
			log.info(appMsg.SUPPLIERTYPESAVESUCCESS);
			response.message = appMsg.SUPPLIERTYPESAVESUCCESS;
			response.status  = true;
			callback(response);
		} else{
			log.info(appMsg.SUPPLIERTYPEEDITSUCCESS);
			response.message = appMsg.SUPPLIERTYPEEDITSUCCESS;
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


//get all Supplier Type
var getSupplierType = function(condition, selectedAttributes, callback){

	log.info(fileName+'.getSupplierType');
	
	supplierType.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(supType){
			if(supType.length == 0){
				log.info(fileName+'.getSupplierType - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info(fileName+'.getSupplierType - About '+supType.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+supType.length+' results.';
				response.data 		= supType;
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

module.exports = {
		saveOrUpdateSupplierType: saveOrUpdateSupplierType,
		getSupplierType			: getSupplierType
}
