/**
 * File Name	:	UserGroupService.js
 * Description	:	To write Business Logic For User Group.
 * Author		:	Haris K.A.
 * Date			:	October 08, 2015
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
var userGroup 		= require('../models/UserGroup.js');
var userAccessTree	= require('../models/UserAccessTree.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update User Group
exports.saveOrUpdateUserGroup = function(req, res){
	
	var uGroup = {
			group_id		: req.param('groupid'),
			group_name		: req.param('groupname'),
			company_id 		: req.param('companyid'),
			status 			: req.param('status'),
			last_updated_dt	: req.param("lastupdateddt"),
			last_updated_by	: req.param('lastupdatedby'),
	}
	
	var uAccessTrees = [];
	for(var i = 0; i < req.param('accesstree').length; i++){
		var uAccessTree = {
			acc_tree_id		: req.param('accesstree')[i].acctreeid,
			company_id 		: req.param('companyid'),
			group_id 		: req.param('groupid'),
			screen_name		: req.param('accesstree')[i].screenname,
			view_yn			: req.param('accesstree')[i].viewyn,
			status 			: req.param('accesstree')[i].status,
			last_updated_dt	: req.param('accesstree')[i].lastupdateddt,
			last_updated_by	: req.param('accesstree')[i].lastupdatedby
		}
		uAccessTrees.push(uAccessTree);
	}
	
	
	if(req.param('groupid') != null){
		userGroup.upsert(uGroup)
		.then(function(data){
			for(var i = 0; i < uAccessTrees.length; i++){
				userAccessTree.upsert(uAccessTrees[i])
				.then(function(d){
					log.info('Access tree saved successfully.');
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}
			
			log.info('User group editted successfully.');
			response.message	= 'User group editted successfully.';
			response.data  		= data.po_id;
			response.status 	= true;
			res.send(response);
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	} else{
		userGroup.create(uGroup)
		.then(function(data){
			for(var i = 0; i < uAccessTrees.length; i++){
				uAccessTrees[i].group_id = data.group_id;
				userAccessTree.upsert(uAccessTrees[i])
				.then(function(d){
					log.info('Access tree saved successfully.');
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}
			
			log.info('User group saved successfully.');
			response.message	= 'User group saved successfully.';
			response.data  		= data.po_id;
			response.status 	= true;
			res.send(response);
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	}
	
}


//get all User Group
exports.getUserGroup = function(req, res){

	var condition 			= "";
	var groupId 			= req.param('groupid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var groupName 			= req.param('groupname');
	var selectedAttributes	= "";
	var fetchAssociation	= "";
	
	if(req.param('fetchassociation')=='yes'){
		fetchAssociation = [{model : userAccessTree}]
	}
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['group_id','group_name']
	}
	
	if(companyId != null)
		condition = "m_user_group.company_id="+companyId;
	
	if(groupId!=null)
		if(condition === "")
			condition = "m_user_group.group_id='"+groupId+"'";
	
		else
			condition = condition+" and m_user_group.group_id='"+groupId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(groupName!=null)
		if(condition === "")
			condition = "group_name='"+groupName+"'";
	
		else
			condition = condition+" and group_name='"+groupName+"'";
	
	userGroup.findAll({
		where		: [condition],
		attributes	: selectedAttributes,
		include		: fetchAssociation
	
	})
		.then(function(groups){
			if(groups.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+groups.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+groups.length+' results.';
				response.data 		= groups;
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

exports.getUserAccessTree = function(req, res){

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var condition 			= "";
	var accessTreeId		= req.param('acctreeid');
	var groupId 			= req.param('groupid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var selectedAttributes	= "";
	var fetchAssociation 	= "";
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['acc_tree_id','group_id']
	}
	
	if(companyId != null)
		condition = "m_user_access_tree.company_id="+companyId;
	
	if(accessTreeId != null)
		if(condition === "")
			condition = "acc_tree_id='"+accessTreeId+"'";
	
		else
			condition = condition+" and acc_tree_id='"+accessTreeId+"'";
	
	if(groupId != null)
		if(condition === "")
			condition = "group_id='"+groupId+"'";
	
		else
			condition = condition+" and group_id='"+groupId+"'";
	
	if(status != null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	userAccessTree.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
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

