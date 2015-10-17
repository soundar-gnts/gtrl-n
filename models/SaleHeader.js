/**
 * @Filename	:	SaleHeader.js
 * @Description	:	To write Model Object for Sale header.
 * @Author		:	Haris K.A.
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
 */

var model		= require('../config/sequelize.js');
var dataTypes	= require('sequelize');
var saleDetail	= require('../models/SaleDtl.js');

var saleHeader = model.define('t_sales_hdr', {

	sale_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	bill_no			: dataTypes.STRING,
	bill_date		: dataTypes.DATE,
	store_id		: dataTypes.INTEGER,
	sale_type		: dataTypes.STRING,
	customer_id		: dataTypes.INTEGER,
	basic_total		: dataTypes.DECIMAL,
	total_tax		: dataTypes.DECIMAL,
	discount_prcnt	: dataTypes.DOUBLE,
	discount_value	: dataTypes.DOUBLE,
	bill_value		: dataTypes.DOUBLE,
	total_qty		: dataTypes.INTEGER,
	paid_amount		: dataTypes.DOUBLE,
	balance_amount	: dataTypes.DOUBLE,
	cancel_remark	: dataTypes.STRING,
	action_remarks	: dataTypes.STRING,
	actioned_by		: dataTypes.STRING,
	actioned_dt		: dataTypes.DATE,
	salesorder_id	: dataTypes.INTEGER,
	company_id		: dataTypes.INTEGER,
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_sales_hdr'
});

salesHeader.hasMany(salesDetail, {foreignKey: 'sale_id'});
module.exports = salesHeader;