/**
 * File Name	:	m_supplier_service.js
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
var Supplier = require('../models/m_supplier.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Uom
exports.saveOrUpdateSupplier = function(req, res){
	var supplier = Supplier.build({
		supplier_id		: req.param('supplier_id'),
		supplier_code	: req.param('supplier_code'),
		supplier_name	: req.param('supplier_name'),
		address			: req.param('address'),
		pincode			: req.param('pincode'),
		landline_no		: req.param('landline_no'),
		mobile_no		: req.param('mobile_no'),
		fax_no			: req.param('fax_no'),
		email_id		: req.param('email_id'),
		contact_person	: req.param('contact_person'),
		contact_no		: req.param('contact_no'),
		remarks			: req.param('remarks'),
		credit_days		: req.param('credit_days'),
		cst_no			: req.param('cst_no'),
		tin_no			: req.param('tin_no'),
		status 			: req.param('status'),
		last_updated_dt	: new Date(),
		last_updated_by	: req.param('last_updated_by'),
	
		company_id 		: req.param('company_id'),
		supp_type_id	: req.param('supp_type_id'),
		state_id		: req.param('state_id'),
		city_id			: req.param('city_id'),
		payment_type	: req.param('payment_type'),
		account_type	: req.param('account_type')
	})
	supplier.save().then(function(s){
		console.log(s);
	}).error(function(err){
		console.log(err);
	});
}


//get all Uom
exports.getAllSupplier = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var name	 	= req.param('suppliername');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(name!=null)
		if(condition === "")
			condition = "supplier_name='"+uomName+"'";
	
		else
			condition = condition+" and supplier_name='"+uomName+"'";
	
	Supplier.findAll({where : [condition]})
		.then(function(supplier){
			if(supplier.length == 0){
				log.info('Empty supplier List.');
				response.message = 'Empty supplier List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('supplier Exist');
				response.message = supplier;
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

// get one Uom
exports.getOneSupplier = function(req, res){
	Uom.findOne({where : {uom_id : req.param('uomid')}})
		.then(function(uom){
			if(!uom){
				log.info('Empty Uom List.');
				response.message = 'Empty Uom List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Uom Exist.');
				response.message = uom;
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

//delete Uom
exports.deleteSupplier = function(req, res){
	Uom.findOne({where : {uom_id : req.param('uomid')}})
		.then(function(uom){
			if(!uom){
				log.info('Empty Uom List.');
				response.message = 'Empty Uom List.';
				response.status  = false;
				res.send(response);
			} else{
				uom.destroy()
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