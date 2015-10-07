/**
 * File Name	:	m_supp_acct_type_service.js
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
var SuppAccType = require('../models/m_supp_acct_type.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Tax
exports.saveOrUpdateSupplierAccountType = function(req, res){
	SuppAccType.upsert({
		supp_acct_id	: req.param('suppacctid'),
		supp_acct_name	: req.param('suppacctname'),
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
exports.getAllSupplierAccountType = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var name 		= req.param('suppacctname');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
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
	
	SuppAccType.findAll({where : [condition]})
		.then(function(supAccType){
			if(supAccType.length == 0){
				log.info('Empty SupplierAccountType List.');
				response.message = 'Empty SupplierAccountType List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('SupplierAccountType List Exist');
				response.message = supAccType;
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
exports.getOneSupplierAccountType = function(req, res){
	SuppAccType.findOne({where : {supp_acct_id	: req.param('suppacctid')}})
		.then(function(supAccType){
			if(!supAccType){
				log.info('Empty SupplierAccountType List.');
				response.message = 'Empty SupplierAccountType List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('SupplierAccountType Exist.');
				response.message = supAccType;
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
exports.deleteSupplierAccountType = function(req, res){
	SuppAccType.findOne({where : {supp_acct_id	: req.param('suppacctid')}})
		.then(function(supAccType){
			if(!supAccType){
				log.info('Empty SupplierAccountType List.');
				response.message = 'Empty SupplierAccountType List.';
				response.status  = false;
				res.send(response);
			} else{
				supAccType.destroy()
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