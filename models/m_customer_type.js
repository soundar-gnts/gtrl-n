/**
 * @Filename	:	m_customer_type.js
 * @Description	:	To write Model Object for m_customer_type table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 07, 2015
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var customertype = model.define('m_customer_type', {

	cust_group_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	company_id 			: dataTypes.INTEGER,
	cust_group_name 	: dataTypes.STRING,
	discount_yn 		: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_customer_type'
});
module.exports = customertype;
