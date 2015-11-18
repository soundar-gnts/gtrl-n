/**
 * @Filename	:	StockSummary.js
 * @Description	:	To write Model Object for t_stock_summary table.
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var product 			= require('../models/Product.js');
var store 		     	= require('../models/Store.js');
var stocksummary 		= model.define('t_stock_summary', {

	stock_id 			: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	batch_no			: dataTypes.STRING,
	curr_stock			: dataTypes.INTEGER,
	last_sold_dt		: dataTypes.DATE,
	last_sold_qty		: dataTypes.INTEGER

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_stock_summary'
});
stocksummary.belongsTo(product, 	{foreignKey: 'product_id'});
stocksummary.belongsTo(store, 		{foreignKey: 'store_id'});
module.exports 			= stocksummary;
