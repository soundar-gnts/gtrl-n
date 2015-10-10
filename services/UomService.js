/**
 * File Name	:	UomService.js
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
var appMsg			= require('../config/Message.js');
var uom = require('../models/Uom.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Uom
exports.saveOrUpdateUom = function(req, res){
	uom.upsert({
		uom_id			: req.param('uomid'),
		uom_name		: req.param('uomname'),
		company_id 		: req.param('companyid'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Unit of messure saved successfully.');
			response.message = 'Unit of messure saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Unit of messure editted successfully.');
			response.message = 'Unit of messure editted successfully.';
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


//get all Uom
exports.getUom = function(req, res){

	var condition 	= "";
	var uomId 		= req.param('uomid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var uomName 	= req.param('uomname');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(uomId!=null)
		if(condition === "")
			condition = "uom_id='"+uomId+"'";
	
		else
			condition = condition+" and uom_id='"+uomId+"'";
	
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
	
	uom.findAll({where : [condition]})
		.then(function(uoms){
			if(uoms.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+uoms.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+uoms.length+' results.';
				response.data 		= uoms;
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