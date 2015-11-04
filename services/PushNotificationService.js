/**
 * @Filename 		: PushNotificationService.js
 * @Description 	: To write Business Logic for Push Notification
 * @Author 			: SOUNDAR C 
 * @Date 			: October 27, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var pushnotification= require('../models/PushNotification.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');

var path 			= require('path');
var filename		= path.basename(__filename);

// To get Push Notification List based on user param
exports.getPushNotificationDetails = function(condition, callback) {
	
	pushnotification.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPushNotificationDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>>getPushNotificationDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getPushNotificationDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save/Update Push Notification
exports.savePushNotification = function(pushNotfictn, callback) {
	pushnotification.upsert(pushNotfictn)
	.then(function(data){
		if(data){
			log.info(filename+'>>savePushNotification>>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= data.push_id;
			callback(response);
		}
		else{
			log.info(filename+'>>savePushNotification>>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= pushNotfictn.push_id;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>savePushNotification>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}

//To Delete Push Notification
exports.deletePushNotification = function(condition, callback) {
	
	pushnotification.destroy({where:[condition]})
		.then(function(data){
			log.info(filename+'>> deletePushNotification >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			//response.data		= req.param("pushid");
			callback(response);
			
		}).error(function(err){
			log.info(filename+'>> deletePushNotification >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
		
}
