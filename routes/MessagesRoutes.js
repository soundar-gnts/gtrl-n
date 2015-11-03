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
	app.post('/getmessagesdetails', messagesService.getMessagesDetails);
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
	
}

