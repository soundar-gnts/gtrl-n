/**
 * @Filename	:	StockAdjustments.js
 * @Description	:	To write Model Object for t_stock_adjustments table.
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
var stockadjustments = model.define('t_stock_adjustments', {

	adjust_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	adjust_date			: dataTypes.DATE,
	product_id			: dataTypes.INTEGER,
	uom_id				: dataTypes.INTEGER,
	adjust_qty			: dataTypes.INTEGER,
	adjust_symbol		: dataTypes.STRING,
	adjust_reason		: dataTypes.STRING,
	batch_no			: dataTypes.STRING,
	status				: dataTypes.STRING,
	actioned_by			: dataTypes.STRING,
	actioned_dt			: dataTypes.DATE
	}, {
	freezeTableName 	: true,
	tableName 			: 't_stock_adjustments'
});
module.exports = stockadjustments;
