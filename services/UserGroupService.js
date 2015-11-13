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

var path = require('path');
var fileName=path.basename(__filename);
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
exports.saveOrUpdateUserGroup = function(uGroup,uAccessTrees,callback){
	log.info(fileName+'.saveOrUpdateUserGroup');
	
	if(uGroup.group_id != null){
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
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
				});
			}
			
			log.info(appMsg.USERGROUPEDITSUCCESS);
			response.message	= appMsg.USERGROUPEDITSUCCESS;
			response.data  		= data.po_id;
			response.status 	= true;
			callback(response);
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
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
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
				});
			}
			
			log.info(appMsg.USERGROUPSAVESUCCESS);
			response.message	= appMsg.USERGROUPSAVESUCCESS;
			response.data  		= data.po_id;
			response.status 	= true;
			callback(response);
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
	
}


//get all User Group
exports.getUserGroup = function(condition,selectedAttributes,fetchAssociation,callback){

	log.info(fileName+'.getUserGroup');
	
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
				response.data 	 = groups;
				callback(response);
			} else{
				log.info('About '+groups.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+groups.length+' results.';
				response.data 		= groups;
				callback(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

//For get user access tree based on user param
exports.getUserAccessTree = function(condition,selectedAttributes,fetchAssociation,callback){

	log.info(fileName+'.getUserAccessTree');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
		
	userAccessTree.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(accesTre){
			if(accesTre.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data 	 = accesTre;
				callback(response);
			} else{
				log.info('About '+accesTre.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+accesTre.length+' results.';
				response.data 		= accesTre;
				callback(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

