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

var path = require('path');
var fileName=path.basename(__filename);
var log				= require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var userAccessTree	= require('../models/UserAccessTree.js');
var userGroup = require('../models/UserGroup.js');


//insert or update User Access Tree
var saveOrUpdateUserAccess = function(req, res){
	log.info(fileName+'.saveOrUpdateUserAccessTree');
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
	//log.info(accessTree);
	
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
					log.error(fileName+'.saveOrUpdateUserAccessTree - '+err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					res.send(response);
				});
			}
			log.info(appMsg.USERACCESSTREESAVESUCCESS);
			response.message = appMsg.USERACCESSTREESAVESUCCESS;
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
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					res.send(response);
				});
			}
			log.info(appMsg.USERACCESSTREEEDITSUCCESS);
			response.message = appMsg.USERACCESSTREEEDITSUCCESS;
			response.status  = true;
			res.send(response);
		}
	})
	.error(function(err){
		log.error(fileName+'.saveOrUpdateUserAccessTree - '+err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}


//get all User Access Tree
var getUserAccessTree = function(condition, selectedAttributes, fetchAssociation, callback){

	log.info(fileName+'.getUserAccessTree');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	console.log("fetchAssociation-->"+fetchAssociation);
	
	userAccessTree.findAll({
		where		: [condition],
		attributes	: selectedAttributes,
		include 	: fetchAssociation
	
	})
		.then(function(accesTre){
			if(accesTre.length == 0){
				log.info(fileName+'.getUserAccessTree - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info(fileName+'.getUserAccessTree - About '+accesTre.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+accesTre.length+' results.';
				response.data 		= accesTre;
				callback(response);
			}
		})
		.error(function(err){
			log.error(fileName+'.getUserAccessTree - '+err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

var saveOrUpdateUserAccessTree = function(uAccessTree, callback){

	log.error(fileName+'.saveOrUpdateUserAccessTree - ');
	if(uAccessTree.acc_tree_id != null){
		userAccessTree.upsert(uAccessTree)
		.then(function(data){
			log.info(appMsg.USERACCESSTREEEDITSUCCESS);
			response.message= appMsg.USERACCESSTREEEDITSUCCESS;
			response.status = true;
			response.data  	= uAccessTree.acc_tree_id;
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
		userAccessTree.create(uAccessTree)
		.then(function(data){
			log.info(appMsg.USERACCESSTREESAVESUCCESS);
			response.message= appMsg.USERACCESSTREESAVESUCCESS;
			response.status = true;
			response.data  	= data.acc_tree_id;
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

module.exports = {
		saveOrUpdateUserAccess : saveOrUpdateUserAccess,
		getUserAccessTree : getUserAccessTree,
		saveOrUpdateUserAccessTree : saveOrUpdateUserAccessTree
}