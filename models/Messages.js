/**
 * @Filename	:	Messages.js
 * @Description	:	To write Model Object for t_messages table.
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var messages 			= model.define('t_messages', {

	msg_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id 			: dataTypes.INTEGER,
	msg_type			: dataTypes.STRING,
	msg_sender			: dataTypes.STRING,
	msg_receivers		: dataTypes.STRING,
	msg_cc				: dataTypes.STRING,
	msg_subject			: dataTypes.STRING,
	msg_body			: dataTypes.STRING,
	client_ip			: dataTypes.STRING,
	user_id				: dataTypes.INTEGER,
	msg_response		: dataTypes.STRING,
	msg_status			: dataTypes.STRING,
	msg_sent_dt			: dataTypes.DATE

	}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_messages'
});
module.exports 			= messages;
