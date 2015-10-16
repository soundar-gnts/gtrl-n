/**
 * @Filename	:	SaleDtl.js
 * @Description	:	To write Model Object for t_sale_dtl table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 16, 2015
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
var saledtl = model.define('t_sale_dtl', {

	sale_dtlid : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	sale_id				: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	sold_qty			: dataTypes.INTEGER,
	uom_id				: dataTypes.INTEGER,
	return_qty			: dataTypes.INTEGER,
	rate				: dataTypes.INTEGER,
	basic_value			: dataTypes.INTEGER,
	discount_prcnt		: dataTypes.INTEGER,
	tax_id				: dataTypes.INTEGER,
	tax_prnct			: dataTypes.INTEGER,
	tax_value			: dataTypes.INTEGER,
	sale_value			: dataTypes.INTEGER,
	batch_no			: dataTypes.STRING,
	salesorder_dtl_id	: dataTypes.INTEGER,
	discount_value		: dataTypes.INTEGER

}, {
	timestamps 		: false,
	freezeTableName : true,
	tableName 		: 't_sale_dtl'
});
module.exports = saledtl;
