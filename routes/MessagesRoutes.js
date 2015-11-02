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
	app.post('/savemessages', messagesService.saveMessages);
	app.post('/deletemessages', messagesService.deleteMessages);
}

