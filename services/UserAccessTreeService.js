/**
 * File Name	:	UserAccessTreeService.js
 * Description	:	To write Business Logic For User Access Tree.
 * Author		:	Haris K.A.
 * Date			:	October 09, 2015
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

var log				= require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var userAccessTree	= require('../models/UserAccessTree.js');
var userGroup = require('../models/UserGroup.js');


//insert or update Uom
exports.saveOrUpdateUserAccessTree = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var accessTree = {
		company_id 		: req.param('companyid'),
		group_id 		: req.param('groupid'),
		status 			: req.param('status'),
		last_updated_dt	: req.param("lastupdateddt"),
		last_updated_by	: req.param('lastupdatedby'),
	}
	log.info(accessTree);
	
	userAccessTree.findAll({where : {group_id : req.param('groupid')}})
	.then(function(aTrees){
		if(aTrees.length==0){
			for(var i = 0; i < req.param('screennames').length; i++){
				accessTree.screen_name 	= req.param('screennames')[i].name;
				accessTree.view_yn		= req.param('screennames')[i].yn;
				userAccessTree.upsert(accessTree)
				.then(function(data){
					log.info('Inserted');
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}
			log.info('User access tree saved successfully.');
			response.message = 'User access tree saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			
			for(var i = 0; i < aTrees.length; i++){
				accessTree.acc_tree_id	= aTrees[i].acc_tree_id;
				accessTree.screen_name 	= req.param('screennames')[i].name;
				accessTree.view_yn		= req.param('screennames')[i].yn;
				userAccessTree.upsert(accessTree)
				.then(function(data){
					log.info('Updated');
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}
			log.info('User access tree editted successfully.');
			response.message = 'User access tree editted successfully.';
			response.status  = true;
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


//get all Uom
exports.getUserAccessTree = function(req, res){

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var condition 	= "";
	var accessTreeId= req.param('acctreeid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	
	
	if(companyId != null)
		condition = "m_user_access_tree.company_id="+companyId;
	
	if(accessTreeId != null)
		if(condition === "")
			condition = "acc_tree_id='"+accessTreeId+"'";
	
		else
			condition = condition+" and acc_tree_id='"+accessTreeId+"'";
	
	if(status != null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	userAccessTree.findAll({
		where	: [condition],
		include : {model : userGroup}
	
	})
		.then(function(accesTre){
			if(accesTre.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+accesTre.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+accesTre.length+' results.';
				response.data 		= accesTre;
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
