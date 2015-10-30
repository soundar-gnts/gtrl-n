/**
 * @Filename	:	SalesOrderHeader.js
 * @Description	:	To write Model Object for Sales order header.
 * @Author		:	Haris K.A.
 * @Date		:	October 10, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */

var model		= require('../config/sequelize.js');
var dataTypes	= require('sequelize');
var soDetail	= require('../models/SalesOrderDetail.js');

var soHeader = model.define('t_salesorder_hdr', {

	salesorder_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	
	customer_id			: dataTypes.INTEGER,
	total_tax			: dataTypes.DOUBLE,
	Order_value			: dataTypes.DOUBLE,
	total_qty			: dataTypes.INTEGER,
	delivery_type		: dataTypes.STRING,
	delivery_remark		: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING,
	shipping_addr		: dataTypes.STRING,
	company_id			: dataTypes.INTEGER,
	sal_ordr_number		: dataTypes.STRING,
	shipng_adrs_city	: dataTypes.STRING,
	shipping_addr_state	: dataTypes.STRING,
	shipping_addr_pincde: dataTypes.STRING,
	shipping_addr_name	: dataTypes.STRING,
	shipping_mobilnum	: dataTypes.STRING,
	otp_code			: dataTypes.STRING,
	land_mark			: dataTypes.STRING,
	available_hours		: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_salesorder_hdr'
});

soHeader.hasMany(soDetail, {foreignKey: 'salesorder_id'});
module.exports = soHeader;