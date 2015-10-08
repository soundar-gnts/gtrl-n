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

var log = require('../config/logger').logger;
var paymentType = require('../models/PaymentType.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Payment type
exports.saveOrUpdatePymentType = function(req, res){
	paymentType.upsert({
		pymt_type_id	: req.param('pymttypeid'),
		company_id		: req.param('companyid'),
	    pymt_type_name	: req.param('pymttypename'),
	    status			: req.param('status'),
		last_updated_dt	: new Date(),
		last_updated_by	: req.param('lastupdatedby')
	}).then(function(data){
		if(data){
			log.info('Payment type saved successfully.');
			response.message = 'Payment type saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Payment type editted successfully.');
			response.message = 'Payment type editted successfully.';
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


//get all Payment type
exports.getPymentType = function(req, res){
	
	var condition 		= "";
	var paymentTypeId 	= req.param('pymttypeid');
	var companyId 		= req.param('companyid');
	var status			= req.param('status');
	var paymentName 	= req.param('pymttypename');
	
	if(companyId != "")
		condition = "company_id="+companyId;
	
	if(paymentTypeId!=null)
		if(condition === "")
			condition = "pymt_type_id='"+paymentTypeId+"'";
	
		else
			condition = condition+" and pymt_type_id='"+paymentTypeId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(paymentName!=null)
		if(condition === "")
			condition = "pymt_type_name='"+paymentName+"'";
	
		else
			condition = condition+" and pymt_type_name='"+paymentName+"'";
	
	paymentType.findAll({where : [condition]})
		.then(function(type){
			if(type.length == 0){
				log.info('Did not match any documents.');
				response.message = 'Did not match any documents.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+type.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+type.length+' results.';
				response.data 		= type;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}