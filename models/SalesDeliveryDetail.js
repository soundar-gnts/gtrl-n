/**
 * @Filename	:	Product.js
 * @Description	:	To write Model Object for Sales delivery detail table.
 * @Author		:	Haris K.A.
 * @Date		:	October 20, 2015
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
var sDelivery = model.define('t_sales_delivery_dtl', {

	delivery_dtlid : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	sale_id				: dataTypes.INTEGER,
	cust_id				: dataTypes.INTEGER,
	customer_name		: dataTypes.STRING,
	delivery_address	: dataTypes.STRING,
	city_id				: dataTypes.INTEGER,
	landmark			: dataTypes.STRING,
	mobile_no			: dataTypes.STRING,
	plan_delivery_dt	: dataTypes.DATE,
	plan_delivery_time	: dataTypes.DATE,
	deli_employee_id	: dataTypes.INTEGER,
	exp_delivery_dt		: dataTypes.DATE,
	exp_delivery_time	: dataTypes.DATE,
	act_delivery_dt		: dataTypes.DATE,
	act_delivery_time	: dataTypes.DATE,
	receiver_name		: dataTypes.STRING,
	receiver_phone		: dataTypes.STRING,
	receiver_signature	: dataTypes.STRING,
	status				: dataTypes.STRING,
	undeliver_reason	: dataTypes.STRING,
	remarks				: dataTypes.STRING,
	post_code			: dataTypes.STRING,
	salesorder_id		: dataTypes.INTEGER,

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_sales_delivery_dtl'
});
module.exports = sDelivery;
