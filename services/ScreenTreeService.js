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

var path 			= require('path');
var fileName		= path.basename(__filename);
var log 			= require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var screenTree 		= require('../models/ScreenTree.js');


//insert or update Uom
var saveOrUpdateScreenTree = function(sTree, callback){
	log.info(fileName+'.saveOrUpdateScreenTree');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	screenTree.upsert(sTree)
	.then(function(data){
		if(data){
			log.info(appMsg.SCREENTREESAVESUCCESS);
			response.message = appMsg.SCREENTREESAVESUCCESS;
			response.status  = true;
			callback(response);
		} else{
			log.info(appMsg.SCREENTREEEDITSUCCESS);
			response.message = appMsg.SCREENTREEEDITSUCCESS;
			response.status  = true;
			callback(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}


//get all Uom
var getScreenTree = function(condition, selectedAttributes, callback){
	log.info(fileName+'.getScreenTree');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	
	
	screenTree.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(screenTrees){
			if(screenTrees.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info('About '+screenTrees.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+screenTrees.length+' results.';
				response.data 		= screenTrees;
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

module.exports = {
		saveOrUpdateScreenTree	: saveOrUpdateScreenTree,
		getScreenTree			: getScreenTree
}
