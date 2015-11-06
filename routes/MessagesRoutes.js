/**
 * @Filename	:	MessagesRoutes.js
 * @Description	:	To write Routing middlewares for t_messages Table.
 * @Author		:	SOUNDAR C
 * @Date		:	November 02, 2015
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
var messagesService = require('../services/MessagesService.js');
module.exports = function(app, server) {
	app.post('/getmessagesdetails', getMessagesDetails);
	app.post('/savemessages', saveMessages);
	app.post('/deletemessages', messagesService.deleteMessages);
	
	//For Save/Update Message
	function saveMessages(req, res){
		var messageobj={	
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
				};
		
		messagesService.saveMessages(messageobj, function(result){
			res.send(result);
		});
	}
	
	// To get Messages List based on user param
	function getMessagesDetails(req, res){
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
		messagesService.getMessagesDetails(condition, function(result){
			res.send(result);
		});
	}
	
	
}

