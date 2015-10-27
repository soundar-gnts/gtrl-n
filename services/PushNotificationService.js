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
exports.getPushNotificationDetails = function(req, res) {
	var condition 			= "";
	var pushid				= req.param("pushid");
	var companyid			= req.param("companyid");
	var phoneno				= req.param("phoneno");
	var userid				= req.param("userid");
	if(pushid!=null){
		condition ="push_id="+pushid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(phoneno!=null){
		if(condition === ""){
			condition="phone_no='"+phoneno+"'";
		}else {
			condition=condition+" and phone_no='"+phoneno+"'";
		}
	}
	if(userid!=null){
		if(condition === ""){
			condition="user_id='"+userid+"'";
		}else {
			condition=condition+" and user_id='"+userid+"'";
		}
	}
	
	pushnotification.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPushNotificationDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getPushNotificationDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getPushNotificationDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}




// To Save/Update Push Notification
exports.savePushNotification = function(req, res) {
	pushnotification.upsert({
		push_id					: req.param("pushid"),
		company_id 				: req.param("companyid"),
		phone_no 				: req.param("phoneno"),
		message 				: req.param("message"),
		ref_date 				: req.param("refdate"),
		user_id 				: req.param("userid"),
		last_updated_dt 		: req.param("lastupdateddt"),
		last_updated_by 		: req.param("lastupdatedby")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>savePushNotification>>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= req.param("pushid");
			res.send(response);
		}
		else{
			log.info(filename+'>>savePushNotification>>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= req.param("pushid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>savePushNotification>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}

//To Delete Push Notification
exports.deletePushNotification = function(req, res) {
	if(req.param("pushid")!=null){
		pushnotification.destroy({where:{push_id	: req.param("pushid")}})
		.then(function(data){
			log.info(filename+'>> deletePushNotification >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			response.data		= req.param("pushid");
			res.send(response);
			
		}).error(function(err){
			log.info(filename+'>> deletePushNotification >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
		}else{
			log.info(filename+'>> deletePushNotification >>');
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("pushid");
			res.send(response);
		}
}
