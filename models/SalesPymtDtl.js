/**
 * @Filename	:	SalesPymtDtl.js
 * @Description	:	To write Model Object for t_sales_pymt_dtl table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 26, 2015
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
var salespymtdtl 		= model.define('t_sales_pymt_dtl', {

	sale_pymtid : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	sale_id				: dataTypes.INTEGER,
	bill_type			: dataTypes.STRING,
	payment_mode		: dataTypes.STRING,
	card_type_id		: dataTypes.INTEGER,
	card_no				: dataTypes.STRING,
	approval_no			: dataTypes.STRING,
	voucher_id			: dataTypes.INTEGER,
	paid_amount			: dataTypes.DOUBLE

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_sales_pymt_dtl'
});
module.exports 			= salespymtdtl;
