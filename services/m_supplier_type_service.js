/**
 * File Name	:	m_supplier_type_service.js
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
var SupplierType = require('../models/m_supplier_type.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Tax
exports.saveOrUpdateSupplierType = function(req, res){
	SupplierType.upsert({
		supp_type_id	: req.param('supptypeid'),
		supp_type_name	: req.param('supptypename'),
		company_id 		: req.param('companyid'),
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
exports.getAllSupplierType = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var name 		= req.param('supptypename');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
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
	
	SupplierType.findAll({where : [condition]})
		.then(function(supType){
			if(supType.length == 0){
				log.info('Empty SupplierType List.');
				response.message = 'Empty SupplierType List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('SupplierType List Exist');
				response.message = supType;
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
exports.getOneSupplierType = function(req, res){
	SupplierType.findOne({where : {supp_type_id	: req.param('supptypeid')}})
		.then(function(supType){
			if(!supType){
				log.info('Empty SupplierAccountType List.');
				response.message = 'Empty SupplierAccountType List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('SupplierAccountType Exist.');
				response.message = supType;
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
exports.deleteSupplierType = function(req, res){
	SupplierType.findOne({where : {supp_type_id	: req.param('supptypeid')}})
		.then(function(supType){
			if(!supType){
				log.info('Empty SupplierAccountType List.');
				response.message = 'Empty SupplierAccountType List.';
				response.status  = false;
				res.send(response);
			} else{
				supType.destroy()
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