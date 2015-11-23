/**
 * @Filename	:	PurchaseReturnDtl.js
 * @Description	:	To write Model Object for t_purchase_return_dtl.
 * @Author		:	Saranya G
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
var product				= require('../models/Product.js');
var purchasedtl 		= require('../models/PurchaseDtl.js');
var purchaseReturnDtl	= model.define('t_purchase_return_dtl', {

	return_dtlid : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	return_id			: dataTypes.INTEGER,
	purchase_dtlid		: dataTypes.INTEGER,
	product_id 			: dataTypes.INTEGER,
	return_qty 			: dataTypes.INTEGER,
	uom_id 				: dataTypes.INTEGER,
	rate 				: dataTypes.INTEGER ,
	basic_value 		: dataTypes.INTEGER ,	
	discount_prcnt 		: dataTypes.INTEGER,
	discount_value 		: dataTypes.INTEGER,
	tax_id 				: dataTypes.INTEGER,
	tax_prnct 			: dataTypes.INTEGER,
	tax_value 			: dataTypes.INTEGER,

}, {
	
	freezeTableName 	: true,
	tableName 			: 't_purchase_return_dtl'
});
purchaseReturnDtl.belongsTo(product, 	{foreignKey: 'product_id'});
purchaseReturnDtl.belongsTo(purchasedtl, 	{foreignKey: 'purchase_dtlid'});
module.exports = purchaseReturnDtl;
