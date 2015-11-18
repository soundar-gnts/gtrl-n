/**
 * @Filename	:	FeedBack.js
 * @Description	:	To write Model Object for t_feedback table.
 * @Author		:	Saranya G
 * @Date		:	October 17, 2015
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

var model 			 	= require('../config/sequelize.js');
var dataTypes 		 	= require('sequelize');
var customer 			= require('../models/Customer.js');
var feedback		 	= model.define('t_feedback', {	

	feedback_id : {
		
		type 			: dataTypes.INTEGER,
		primaryKey  	: true,
		autoIncrement   : true
	},	
	
	company_id 			: dataTypes.INTEGER,
	cust_id 			: dataTypes.INTEGER,
	feedback			: dataTypes.STRING,	
	status				: dataTypes.STRING,
	last_updated_by 	: dataTypes.STRING,	
	last_updated_dt		: dataTypes.DATE,


}, {
	
	freezeTableName 	: true,
	tableName 			: 't_feedback'
});
feedback.belongsTo(customer, 	{foreignKey: 'cust_id'});
module.exports 			= feedback;
