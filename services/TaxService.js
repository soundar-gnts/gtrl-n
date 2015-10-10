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

var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var tax = require('../models/Tax.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Tax
exports.saveOrUpdateTax = function(req, res){
	tax.upsert({
		tax_id			: req.param('taxid'),
		tax_name		: req.param('taxname'),
		company_id 		: req.param('companyid'),
		state_id		: req.param('stateid'),
		cst				: req.param('cst'),
		lst				: req.param('lst'),
		surcharge		: req.param('surcharge'),
		tax_on_mrp		: req.param('taxonmrp'),
		tax_symbol		: req.param('taxsymbol'),
		service_tax		: req.param('servicetax'),
		mrp_inclusive	: req.param('mrpinclusive'),
		for_sales_yn	: req.param('forsalesyn'),
		for_purchase_yn	: req.param('forpurchaseyn'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Tax saved successfully.');
			response.message = 'Tax saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Tax editted successfully.');
			response.message = 'Tax editted successfully.';
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


//get all Tax
exports.getTax = function(req, res){

	var condition 	= "";
	var taxId 	= req.param('taxid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var taxName 	= req.param('taxname');
	var stateId 		= req.param('stateid');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(taxId!=null)
		if(condition === "")
			condition = "tax_id='"+taxId+"'";
		else
			condition = condition+" and tax_id='"+taxId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(taxName!=null)
		if(condition === null)
			condition = "tax_name='"+taxName+"'";
	
		else
			condition = condition+" and tax_name='"+taxName+"'";
	
	if(stateId!=null)
		if(condition === null)
			condition = "state_id='"+stateId+"'";
	
		else
			condition = condition+" and state_id='"+stateId+"'";
	
	tax.findAll({where : [condition]})
		.then(function(taxs){
			if(taxs.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+taxs.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+taxs.length+' results.';
				response.data 		= taxs;
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