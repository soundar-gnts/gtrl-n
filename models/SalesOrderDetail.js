/**
 * @Filename	:	SalesOrderDetail.js
 * @Description	:	To write Model Object for Sales order details.
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

var soDetail = model.define('t_salesorder_dtl', {

	salesorder_dtl_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	
	salesorder_id	: dataTypes.INTEGER,
	product_id		: dataTypes.INTEGER,
	uom_id			: dataTypes.INTEGER,
	rate			: dataTypes.DOUBLE,
	order_qty		: dataTypes.INTEGER,
	order_value		: dataTypes.DOUBLE,
	discount_prcnt	: dataTypes.DOUBLE,
	tax_ptcnt		: dataTypes.DOUBLE,
	tax_value		: dataTypes.DOUBLE,
	basic_value		: dataTypes.DOUBLE,
	discount_value	: dataTypes.DOUBLE
	
}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_salesorder_dtl'
});

module.exports = soDetail;