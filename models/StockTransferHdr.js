/**
 * @Filename	:	StockTransferHdr.js
 * @Description	:	To write Model Object for t_stock_transfer_hdr table.
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

var model			 = require('../config/sequelize.js');
var dataTypes 		 = require('sequelize');
var stockTransferHdr = model.define('t_stock_transfer_hdr', {	

	  transfer_id : {
		  
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},

	company_id 			: dataTypes.INTEGER,	
	transfer_refno 		: dataTypes.STRING,
	transfer_date 		: dataTypes.DATE,
	from_Store_id 		: dataTypes.INTEGER,
	to_store_id 		: dataTypes.INTEGER,
	transfer_ctgry 		: dataTypes.STRING,
	transfer_remarks 	: dataTypes.STRING,
	transfer_Status 	: dataTypes.STRING,
	basic_total 		: dataTypes.DOUBLE,
	total_tax 		    : dataTypes.DOUBLE,
	total_value 		: dataTypes.DOUBLE,
	action_remarks 		: dataTypes.STRING,
	actioned_by 		: dataTypes.STRING,	
	actioned_dt		    : dataTypes.DATE,
	transfered_by		: dataTypes.STRING,

}, {
	
	freezeTableName 	: true,
	tableName		    : 't_stock_transfer_hdr'
});
module.exports = stockTransferHdr;
