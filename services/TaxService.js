/**
 * File Name	:	TaxService.js
 * Description	:	To write Business Logic For Tax.
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

var path = require('path');
var fileName=path.basename(__filename);
var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var tax = require('../models/Tax.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Tax
var saveOrUpdateTax = function(taxDet, callback){
	log.info(fileName+'.saveOrUpdateTax');
	tax.upsert(taxDet)
	.then(function(data){
		if(data){
			log.info(appMsg.TAXSAVESUCCESS);
			response.message = appMsg.TAXSAVESUCCESS;
			response.status  = true;
			callback(response);
		} else{
			log.info(appMsg.TAXEDITSUCCESS);
			response.message = appMsg.TAXEDITSUCCESS;
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


//get all Tax
var getTax = function(condition, selectedAttributes, callback){
	log.info(fileName+'.getTax');

	tax.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(taxs){
			if(taxs.length == 0){
				log.info(fileName+'.getTax - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info(fileName+'.getTax - About '+taxs.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+taxs.length+' results.';
				response.data 		= taxs;
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
		saveOrUpdateTax : saveOrUpdateTax,
		getTax			: getTax
}