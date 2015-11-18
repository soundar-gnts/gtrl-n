/**
 * @Filename	:	PurchaseDtl.js
 * @Description	:	To write Model Object for t_purchase_dtl table.
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

var product				= require('../models/Product.js');
var poDetail			= require('../models/PoDetail.js');
var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var purchasedtl 		= model.define('t_purchase_dtl', {

	purchase_dtlid : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	po_dtlid			: dataTypes.INTEGER,
	purchase_id			: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	invoice_qty			: dataTypes.INTEGER,
	rate				: dataTypes.INTEGER,
	uom_id				: dataTypes.INTEGER,
	basic_value			: dataTypes.INTEGER,
	discount_prcnt		: dataTypes.INTEGER,
	tax_id				: dataTypes.INTEGER,
	tax_prnct			: dataTypes.INTEGER,
	tax_value			: dataTypes.INTEGER,
	purchase_value		: dataTypes.INTEGER,
	mrp					: dataTypes.INTEGER,
	discount_value		: dataTypes.INTEGER

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_purchase_dtl'
});

purchasedtl.belongsTo(product, 	{foreignKey: 'product_id'});
purchasedtl.belongsTo(poDetail, {foreignKey: 'po_dtlid'});
module.exports = purchasedtl;
