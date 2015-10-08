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

var log = require('../config/logger').logger;
var supplier = require('../models/Supplier.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Supplier
exports.saveOrUpdateSupplierDetails = function(req, res){
	
	supplier.upsert({
		supplier_id		: req.param('supplierid'),
		supplier_code	: req.param('suppliercode'),
		supplier_name	: req.param('suppliername'),
		address			: req.param('address'),
		pincode			: req.param('pincode'),
		landline_no		: req.param('landlineno'),
		mobile_no		: req.param('mobileno'),
		fax_no			: req.param('faxno'),
		email_id		: req.param('emailid'),
		contact_person	: req.param('contactperson'),
		contact_no		: req.param('contactno'),
		remarks			: req.param('remarks'),
		credit_days		: req.param('creditdays'),
		cst_no			: req.param('cstno'),
		tin_no			: req.param('tinno'),
		status 			: req.param('status'),
		last_updated_dt	: new Date(),
		last_updated_by	: req.param('lastupdatedby'),
	
		company_id 		: req.param('companyid'),
		supp_type_id	: req.param('supptypeid'),
		state_id		: req.param('stateid'),
		city_id			: req.param('cityid'),
		payment_type	: req.param('paymenttype'),
		account_type	: req.param('accounttype')
	}).then(function(data){
		if(data){
			log.info('Supplier saved successfully.');
			response.message = 'Supplier saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Supplier editted successfully.');
			response.message = 'Supplier editted successfully.';
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


//get all Supplier
exports.getSupplier = function(req, res){

	var condition 	= "";
	var supId 		= req.param('companyid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var supNname	= req.param('suppliername');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(supId!=null)
		if(condition === "")
			condition = "supplier_id='"+supId+"'";
	
		else
			condition = condition+" and supplier_id='"+supId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(supName!=null)
		if(condition === "")
			condition = "supplier_name='"+supName+"'";
	
		else
			condition = condition+" and supplier_name='"+supName+"'";
	
	supplier.findAll({where : [condition]})
		.then(function(suppliers){
			if(suppliers.length == 0){
				log.info('Did not match any documents.');
				response.message = 'Did not match any documents.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+suppliers.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+suppliers.length+' results.';
				response.data 		= suppliers;
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
