/**
 * @Filename 		: MessagesService.js
 * @Description 	: To write Business Logic for Messages
 * @Author 			: SOUNDAR C 
 * @Date 			: November 02, 2015
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
var messages		= require('../models/Messages.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');

var path 			= require('path');
var filename		= path.basename(__filename);
var commonService 	= require('../services/CommonService.js');

// To get Messages List based on user param
exports.getMessagesDetails = function(req, res) {
	var condition 			= "";
	var msgid				= req.param("msgid");
	var companyid			= req.param("companyid");
	var msgtype				= req.param("msgtype");
	var userid				= req.param("userid");
	var msgsender			= req.param("msgsender");
	var msgstatus			= req.param("msgstatus");
	
	if(msgid!=null){
		condition ="msg_id="+msgid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(msgtype!=null){
		if(condition === ""){
			condition="msg_type='"+msgtype+"'";
		}else {
			condition=condition+" and msg_type='"+msgtype+"'";
		}
	}
	if(userid!=null){
		if(condition === ""){
			condition="user_id='"+userid+"'";
		}else {
			condition=condition+" and user_id='"+userid+"'";
		}
	}
	if(msgsender!=null){
		if(condition === ""){
			condition="msg_sender='"+msgsender+"'";
		}else {
			condition=condition+" and msg_sender='"+msgsender+"'";
		}
	}
	if(msgstatus!=null){
		if(condition === ""){
			condition="msg_status='"+msgstatus+"'";
		}else {
			condition=condition+" and msg_status='"+msgstatus+"'";
		}
	}
	
	messages.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getMessagesDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getMessagesDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getMessagesDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}


// To Save/Update Messages
exports.saveMessages = function(req, res) {
	messages.upsert({
		msg_id					: req.param("msgid"),
		company_id 				: req.param("companyid"),
		msg_type 				: req.param("msgtype"),
		msg_sender 				: req.param("msgsender"),
		msg_receivers 			: req.param("msgreceivers"),
		msg_cc 					: req.param("msgcc"),
		msg_subject 			: req.param("msgsubject"),
		msg_body 				: req.param("msgbody"),
		client_ip 				: req.param("clientip"),
		user_id 				: req.param("userid"),
		msg_response 			: req.param("msgresponse"),
		msg_status 				: req.param("msgstatus"),
		msg_sent_dt 			: req.param("msgsentdt")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>> saveMessages >>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= req.param("msgid");
			res.send(response);
		}
		else{
			log.info(filename+'>> saveMessages >>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= req.param("msgid");
			res.send(response);
		}
		//For Send a E-Mail.
		commonService.sendMail(req.param("msgreceivers"), req.param("msgbody"), req.param("msgsubject"), function(result){
			console.log(result);
			log.info(filename+'>> saveMessages >>'+result);
		});
		
	}).error(function(err){
			log.info(filename+'>> saveMessages >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}

//To Delete Messages
exports.deleteMessages = function(req, res) {
	if(req.param("msgid")!=null){
		messages.destroy({where:{msg_id	: req.param("msgid")}})
		.then(function(data){
			log.info(filename+'>> deleteMessages >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			response.data		= req.param("msgid");
			res.send(response);
			
		}).error(function(err){
			log.info(filename+'>> deleteMessages >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
		}else{
			log.info(filename+'>> deleteMessages >>');
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("msgid");
			res.send(response);
		}
}
