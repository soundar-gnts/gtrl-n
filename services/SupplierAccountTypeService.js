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

var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var suppAccType = require('../models/SupplierAccountType.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update upplier Account Type
exports.saveOrUpdateSupplierAccountType = function(req, res){
	suppAccType.upsert({
		supp_acct_id	: req.param('suppacctid'),
		supp_acct_name	: req.param('suppacctname'),
		company_id 		: req.param('companyid'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Supplier account type saved successfully.');
			response.message = 'Supplier account type saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Supplier account type editted successfully.');
			response.message = 'Supplier account type editted successfully.';
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


//get all upplier Account Type
exports.getSupplierAccountType = function(req, res){

	var condition 	= "";
	var suppAcctId	= req.param('suppacctid')
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var name 		= req.param('suppacctname');
	var selectedAttributes	= "";
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['supp_acct_id','supp_acct_name']
	}
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(suppAcctId!=null)
		if(condition === "")
			condition = "supp_acct_id='"+suppAcctId+"'";
	
		else
			condition = condition+" and supp_acct_id='"+suppAcctId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(name!=null)
		if(condition === null)
			condition = "supp_acct_name='"+name+"'";
	
		else
			condition = condition+" and supp_acct_name='"+name+"'";
	
	suppAccType.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(supAccType){
			if(supAccType.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+supAccType.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+supAccType.length+' results.';
				response.data 		= supAccType;
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
