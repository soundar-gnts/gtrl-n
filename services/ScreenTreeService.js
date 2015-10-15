/**
 * File Name	:	ScreenTreeService.js
 * Description	:	To write Business Logic For Screen tree.
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
var screenTree = require('../models/ScreenTree.js');


//insert or update Uom
exports.saveOrUpdateScreenTree = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	screenTree.upsert({
		screen_id		: req.param('screenid'),
		screen_name		: req.param('screenname'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}).then(function(data){
		if(data){
			log.info('Screen tree saved successfully.');
			response.message = 'Screen tree saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Screen tree editted successfully.');
			response.message = 'Screen tree editted successfully.';
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
exports.getScreenTree = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	var condition 	= "";
	var screenId 	= req.param('screenid');
	var status		= req.param('status');
	var screeName 	= req.param('screenname');
	var selectedAttributes	= "";
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['screen_id','screen_name']
	}
	
	if(screenId!=null)
		if(condition === "")
			condition = "screen_id='"+screenId+"'";
	
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(screeName!=null)
		if(condition === "")
			condition = "screen_name='"+screeName+"'";
	
		else
			condition = condition+" and screen_name='"+screeName+"'";
	
	screenTree.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(screenTrees){
			if(screenTrees.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+screenTrees.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+screenTrees.length+' results.';
				response.data 		= screenTrees;
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
