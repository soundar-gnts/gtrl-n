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

var log = require('../config/logger').logger;
var supplierType = require('../models/SupplierType.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Tax
exports.saveOrUpdateSupplierType = function(req, res){
	supplierType.upsert({
		supp_type_id	: req.param('supptypeid'),
		supp_type_name	: req.param('supptypename'),
		company_id 		: req.param('companyid'),
		status 			: req.param('status'),
		last_updated_dt	: new Date(),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Supplier type saved successfully.');
			response.message = 'Supplier type saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Supplier type editted successfully.');
			response.message = 'Supplier type editted successfully.';
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
exports.getSupplierType = function(req, res){

	var condition 	= "";
	var suppTypeId 	= req.param('supptypeid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var name 		= req.param('supptypename');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(suppTypeId!=null)
		if(condition === "")
			condition = "supp_type_id='"+suppTypeId+"'";
	
		else
			condition = condition+" and supp_type_id='"+suppTypeId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(name!=null)
		if(condition === null)
			condition = "supp_type_name='"+name+"'";
	
		else
			condition = condition+" and supp_type_name='"+name+"'";
	
	supplierType.findAll({where : [condition]})
		.then(function(supType){
			if(supType.length == 0){
				log.info('Did not match any documents.');
				response.message = 'Did not match any documents.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+supType.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+supType.length+' results.';
				response.data 		= supType;
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
