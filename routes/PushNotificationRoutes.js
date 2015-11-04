/**
 * @Filename	:	PushNotificationRoutes.js
 * @Description	:	To write Routing middlewares for Push Notification Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 26, 2015
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
var pushNotificationService = require('../services/PushNotificationService.js');
module.exports = function(app, server) {
	app.post('/getpushnotificationdetails', getPushNotificationDetails);
	app.post('/savepushnotification', 		savePushNotification);
	app.post('/deletepushnotification', 	deletePushNotification);
	
	function getPushNotificationDetails(req, res){
		
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
		
		
		pushNotificationService.getPushNotificationDetails(condition, function(response){
			res.send(response);
		});
	}
	
	function savePushNotification(req, res){
		
		var pushNotfictn = {
				push_id					: req.param("pushid"),
				company_id 				: req.param("companyid"),
				phone_no 				: req.param("phoneno"),
				message 				: req.param("message"),
				ref_date 				: req.param("refdate"),
				user_id 				: req.param("userid"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby")
		
		}
		pushNotificationService.savePushNotification(pushNotfictn, function(response){
			res.send(response);
		});
	}
	
	function deletePushNotification(req, res){
		var condition ="push_id="+pushid;
		
		pushNotificationService.deletePushNotification(condition, function(response){
			res.send(response);
		});
	}
}

