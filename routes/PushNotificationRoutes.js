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
	app.post('/getpushnotificationdetails', pushNotificationService.getPushNotificationDetails);
	app.post('/savepushnotification', pushNotificationService.savePushNotification);
	app.post('/deletepushnotification', pushNotificationService.deletePushNotification);
}

