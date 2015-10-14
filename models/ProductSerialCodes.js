/**
 * @Filename	:	ProductSerialCodes.js
 * @Description	:	To write Model Object for t_product_serial_codes table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 09, 2015
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
var productserialcodes = model.define('t_product_serial_codes', {

	serial_refno : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	company_id			: dataTypes.INTEGER,
	grn_id				: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	batch_id			: dataTypes.STRING,
	ean_serialno		: dataTypes.STRING,
	store_serialno		: dataTypes.STRING,
	status				: dataTypes.STRING,
	print_status		: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_product_serial_codes'
});
module.exports = productserialcodes;
