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
exports.getMessagesDetails = function(condition,callback) {
	
	messages.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getMessagesDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>>getMessagesDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getMessagesDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save/Update Messages
exports.saveMessages = function(messageobj,callback) {
	messages.upsert(messageobj).then(function(data){
		if(data){
			log.info(filename+'>> saveMessages >>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= messageobj.msg_id;
			callback(response);
		}
		else{
			log.info(filename+'>> saveMessages >>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= messageobj.msg_id;
			callback(response);
		}
		//For Send a E-Mail.
		commonService.sendMail(messageobj.msg_receivers, messageobj.msg_body, messageobj.msg_subject, function(result){
			console.log(result);
			log.info(filename+'>> saveMessages >>'+result);
		});
		
	}).error(function(err){
			log.info(filename+'>> saveMessages >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}

//To Delete Messages
exports.deleteMessages = function(msgid,callback) {
	if(msgid!=null){
		messages.destroy({where:{msg_id	: msgid}})
		.then(function(data){
			log.info(filename+'>> deleteMessages >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			response.data		= msgid;
			callback(response);
			
		}).error(function(err){
			log.info(filename+'>> deleteMessages >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
		}else{
			log.info(filename+'>> deleteMessages >>');
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= msgid;
			callback(response);
		}
}
