/**
 * @Filename	:	StockLedger.js
 * @Description	:	To write Model Object for t_stock_ledger table.
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
var stockledger 		= model.define('t_stock_ledger', {

	stock_ledid 		: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	ledger_date			: dataTypes.DATE,
	product_id			: dataTypes.INTEGER,
	company_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	batch_no			: dataTypes.STRING,
	open_qty			: dataTypes.INTEGER,
	in_qty				: dataTypes.INTEGER,
	out_qty				: dataTypes.INTEGER,
	close_qty			: dataTypes.INTEGER,
	uom_id				: dataTypes.INTEGER,
	is_latest			: dataTypes.STRING,
	ref_no				: dataTypes.STRING,
	ref_date			: dataTypes.DATE,
	ref_remarks			: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_stock_ledger'
});
stockledger.belongsTo(product, 	{foreignKey: 'product_id'});
stockledger.belongsTo(store, 	{foreignKey: 'store_id'});
module.exports 			= stockledger;
