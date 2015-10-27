/**
 * @Filename	:	PushNotification.js
 * @Description	:	To write Model Object for t_push_notification table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 27, 2015
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var pushnotification 	= model.define('t_push_notification', {

	push_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	phone_no			: dataTypes.STRING,
	message				: dataTypes.STRING,
	ref_date			: dataTypes.DATE,
	user_id				: dataTypes.INTEGER,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING
}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_push_notification'
});
module.exports = pushnotification;
