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

var path = require('path');
var fileName=path.basename(__filename);
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
	log.info(fileName+'.saveOrUpdateUom');
	uom.upsert({
		uom_id			: req.param('uomid'),
		uom_name		: req.param('uomname'),
		company_id 		: req.param('companyid'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info(appMsg.UOMSAVESUCCESS);
			response.message = appMsg.UOMSAVESUCCESS;
			response.status  = true;
			res.send(response);
		} else{
			log.info(appMsg.UOMEDITSUCCESS);
			response.message = appMsg.UOMEDITSUCCESS;
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(fileName+'.saveOrUpdateUom - '+err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}


//get all Uom
exports.getUom = function(req, res){
	log.info(fileName+'.getUom');

	var condition 			= "";
	var uomId 				= req.param('uomid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var uomName 			= req.param('uomname');
	var selectedAttributes	= "";
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['uom_id','uom_name']
	}
	
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
	
	uom.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(uoms){
			if(uoms.length == 0){
				log.info(fileName+'.getUom - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info(fileName+'.getUom - About '+uoms.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+uoms.length+' results.';
				response.data 		= uoms;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(fileName+'.getUom - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
}
