/**
 * File Name	:	m_tax_service.js
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
var Tax = require('../models/m_tax.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Tax
exports.saveOrUpdateTax = function(req, res){
	Tax.upsert({
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
		last_updated_dt	: new Date(),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Successfully Inserted.');
			response.message = 'Successfully Inserted.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Successfully Editted.');
			response.message = 'Successfully Editted.';
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.message = err;
		response.status  = false;
		res.send(response);
	});
}


//get all Tax
exports.getAllTax = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var taxName 	= req.param('taxname');
	var stateId 		= req.param('stateid');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
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
	
	Tax.findAll({where : [condition]})
		.then(function(tax){
			if(tax.length == 0){
				log.info('Empty Tax List.');
				response.message = 'Empty Tax List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Tax List Exist');
				response.message = tax;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

// get one Tax
exports.getOneTax = function(req, res){
	Tax.findOne({where : {tax_id : req.param('taxid')}})
		.then(function(tax){
			if(!tax){
				log.info('Empty Tax List.');
				response.message = 'Empty Tax List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Tax Exist.');
				response.message = tax;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//delete Tax
exports.deleteTax = function(req, res){
	Tax.findOne({where : {tax_id : req.param('taxid')}})
		.then(function(tax){
			if(!tax){
				log.info('Empty Tax List.');
				response.message = 'Empty Tax List.';
				response.status  = false;
				res.send(response);
			} else{
				tax.destroy()
				.then(function(cat){
					log.info('Deleted Successfully.');
					response.message = 'Deleted Successfully.';
					response.status  = true;
					res.send(response);
				});
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}