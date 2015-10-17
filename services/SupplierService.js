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

var path = require('path');
var fileName=path.basename(__filename);
var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var supplier = require('../models/Supplier.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Supplier
exports.saveOrUpdateSupplierDetails = function(req, res){
	
	log.info(fileName+'.saveOrUpdateSupplierDetails');
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
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	
		company_id 		: req.param('companyid'),
		supp_type_id	: req.param('supptypeid'),
		state_id		: req.param('stateid'),
		city_id			: req.param('cityid'),
		payment_type	: req.param('paymenttype'),
		account_type	: req.param('accounttype')
	}).then(function(data){
		if(data){
			log.info(appMsg.SUPPLIERSAVESUCCESS);
			response.message = appMsg.SUPPLIERSAVESUCCESS;
			response.status  = true;
			res.send(response);
		} else{
			log.info(appMsg.SUPPLIEREDITSUCCESS);
			response.message = appMsg.SUPPLIEREDITSUCCESS;
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERROR;
		response.data  		= err;
		res.send(response);
	});
	
}


//get all Supplier
exports.getSupplier = function(req, res){

	log.info(fileName+'.getSupplier');
	var condition 			= "";
	var supId 				= req.param('supplierid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var supName				= req.param('suppliername');
	var selectedAttributes	= "";
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['supplier_id','supplier_code','supplier_name']
	}
	
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
	
	supplier.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(suppliers){
			if(suppliers.length == 0){
				log.info(fileName+'.getSupplier - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info(fileName+'.getSupplier - About '+suppliers.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+suppliers.length+' results.';
				response.data 		= suppliers;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERROR;
			response.data  		= err;
			res.send(response);
		});
}
