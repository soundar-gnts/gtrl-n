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

var model				= require('../config/sequelize.js');
var dataTypes			= require('sequelize');
var product				= require('../models/Product.js');

var soDetail 			= model.define('t_salesorder_dtl', {

	salesorder_dtl_id 	: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	salesorder_id		: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	uom_id				: dataTypes.INTEGER,
	rate				: dataTypes.INTEGER,
	order_qty			: dataTypes.INTEGER,
	order_value			: dataTypes.INTEGER,
	discount_prcnt		: dataTypes.INTEGER,
	tax_ptcnt			: dataTypes.INTEGER,
	tax_value			: dataTypes.INTEGER,
	basic_value			: dataTypes.INTEGER,
	discount_value		: dataTypes.INTEGER
	
}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_salesorder_dtl'
});

soDetail.belongsTo(product, {foreignKey : 'product_id'});
module.exports 			= soDetail;