/**
 * File Name	:	m_uom_service.js
 * Description	:	To write Business Logic For Uom.
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
var Uom = require('../models/m_uom.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Uom
exports.saveOrUpdateUom = function(req, res){
	Uom.upsert({
		uom_id			: req.param('uomid'),
		uom_name		: req.param('uomname'),
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


//get all Uom
exports.getAllUom = function(req, res){

	var condition 	= "";
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var uomName 	= req.param('uomname');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(uomName!=null)
		if(condition === "")
			condition = "uom_name='"+uomName+"'";
	
		else
			condition = condition+" and uom_name='"+uomName+"'";
	
	Uom.findAll({where : [condition]})
		.then(function(uom){
			if(uom.length == 0){
				log.info('Empty Uom List.');
				response.message = 'Empty Uom List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Tax Uom Exist');
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

// get one Uom
exports.getOneUom = function(req, res){
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
exports.deleteUom = function(req, res){
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