/**
 * File Name	:	SupplierService.js
 * Description	:	To write Business Logic For Supplier.
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

var path		= require('path');
var fileName	= path.basename(__filename);
var log			= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');

var supplier 	= require('../models/Supplier.js');


var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Supplier
var saveOrUpdateSupplierDetails = function(supplier, callback){
	
	log.info(fileName+'.saveOrUpdateSupplierDetails');
	supplier.upsert(supplier).then(function(data){
		if(data){
			log.info(appMsg.SUPPLIERSAVESUCCESS);
			response.message = appMsg.SUPPLIERSAVESUCCESS;
			response.status  = true;
			callback(response);
		} else{
			log.info(appMsg.SUPPLIEREDITSUCCESS);
			response.message = appMsg.SUPPLIEREDITSUCCESS;
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


//get all Supplier
var getSupplier = function(condition, selectedAttributes, fetchAssociation, callback){

	log.info(fileName+'.getSupplier');
	
	supplier.findAll({
		where		: [condition],
		attributes	: selectedAttributes,
		include		: fetchAssociation
	
	})
		.then(function(suppliers){
			if(suppliers.length == 0){
				log.info(fileName+'.getSupplier - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info(fileName+'.getSupplier - About '+suppliers.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+suppliers.length+' results.';
				response.data 		= suppliers;
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
		saveOrUpdateSupplierDetail	: saveOrUpdateSupplierDetails,
		getSupplier					: getSupplier
}