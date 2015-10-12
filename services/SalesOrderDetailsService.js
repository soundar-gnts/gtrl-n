/**
 * File Name	:	PoDetails.js
 * Description	:	To write Business Logic For Purchase Order details.
 * Author		:	Haris K.A.
 * Date			:	October 10, 2015
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

var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var soDetail = require('../models/SalesOrderDetail.js');
var soHeader= require('../models/SalesOrderHeader.js');

//insert or update Product details
exports.saveOrUpdateSalesOrderDetails = function(SalesOrderDetail){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	poDetail.upsert(SalesOrderDetail)
	.then(function(data){
		if(data){
			log.info('Sales order details saved successfully.');
			response.message = 'Sales order details saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Sales order details editted successfully.');
			response.message = 'Sales order details editted successfully.';
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}


//get all Product details
exports.getSalesOrderDetails = function(condition){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	soDetail.findAll({
		where 	: [condition]
		
	})
		.then(function(soDetls){
			if(soDetls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				return response;
			} else{
				log.info('About '+soDetls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+soDetls.length+' results.';
				response.data 		= soDetls;
				console.log('1');
				return response;
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			return response;
		});
}

//get all Product details
exports.deleteSalesOrderDetail = function(salesorderdtlid){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	soDetail.destroy({where : {salesorder_dtl_id		: salesorderdtlid}})
	.then(function(data){
		if(data == '1'){
			log.info('Product removed.');
			response.status  	= true;
			response.message 	= 'Product removed.';
		} else{
			log.info('No Product found.');
			response.status  	= true;
			response.message 	= 'No Product found.';
		}
		return response;
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		return response;
	});
}