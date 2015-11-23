/**
 * @Filename	:	StockTransferDtl.js
 * @Description	:	To write Model Object for t_stock_transfer_dtl table.
 * @Author		:	Saranya G
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
 * 
 */

var model 			 = require('../config/sequelize.js');
var dataTypes 		 = require('sequelize');
var stockTransferDtl = model.define('t_stock_transfer_dtl', {	

	transfer_dtlid : {
		
		type 			: dataTypes.INTEGER,
		primaryKey  	: true,
		autoIncrement   : true
	},
	
	
	transfer_id 		: dataTypes.INTEGER,
	product_id 			: dataTypes.INTEGER,
	batch_no			: dataTypes.STRING,
	transfer_qty		: dataTypes.INTEGER,
	uom_id 				: dataTypes.INTEGER,
	received_qty 		: dataTypes.INTEGER,
	rate 				: dataTypes.INTEGER,	
	basic_value 		: dataTypes.INTEGER,
	discount_prcnt 		: dataTypes.INTEGER,
	discount_value 		: dataTypes.INTEGER,
	tax_id 				: dataTypes.INTEGER,
	tax_prnct 			: dataTypes.INTEGER,
	tax_value 			: dataTypes.INTEGER,	
	remarks		    	: dataTypes.STRING,
	status				: dataTypes.STRING,

}, {
	
	freezeTableName 	: true,
	tableName 			: 't_stock_transfer_dtl'
});
module.exports = stockTransferDtl;
