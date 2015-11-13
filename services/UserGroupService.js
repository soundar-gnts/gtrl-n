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
var userAccessTreeService	= require('../services/UserAccessTreeService.js');


//get all User Group
var getUserGroup = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getUserGroup');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
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

var saveOrUpdateUserGroup = function(uGroup, callback){

	log.error(fileName+'.getUserAccessTree - ');
	if(uGroup.group_id != null){
		userGroup.upsert(uGroup)
		.then(function(data){
			log.info(appMsg.USERGROUPEDITSUCCESS);
			response.message= appMsg.USERGROUPEDITSUCCESS;
			response.status = true;
			response.data  	= uGroup.group_id;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		})
	} else{
		userGroup.create(uGroup)
		.then(function(data){
			log.info(appMsg.USERGROUPSAVESUCCESS);
			response.message= appMsg.USERGROUPSAVESUCCESS;
			response.status = true;
			response.data  	= data.group_id;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		})
	}
}

//insert or update User Group details
var saveOrUpdateUserGroupDetails = function(uGroup, uAccessTrees, callback){
	log.info(fileName+'.saveOrUpdateUserGroupDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saveOrUpdateUserGroup(uGroup, function(result){
		if(result.status){
			if(uAccessTrees.length != null)
				uAccessTrees.forEach(function(accessTre){
					accessTre.group_id = result.data;
					userAccessTreeService.saveOrUpdateUserAccessTree(accessTre, function(data){
						log.info(data);
					})
				});
			
			log.info('saveOrUpdateUserGroupDetails succesfully');
			response.message	= 'saveOrUpdateUserGroupDetails succesfully';// change msg
			response.status 	= true;
			callback(response);
			
		} else{
			callback(result);
		}
	});
}

module.exports = {
	getUserGroup				: getUserGroup,
	saveOrUpdateUserGroup		: saveOrUpdateUserGroup,
	saveOrUpdateUserGroupDetails: saveOrUpdateUserGroupDetails
}