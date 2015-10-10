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
var purchaseReturnDtl	= model.define('t_purchase_return_dtl', {

	return_dtlid : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	
	return_id			: dataTypes.INTEGER,	
	product_id 			: dataTypes.INTEGER,
	return_qty 			: dataTypes.INTEGER,
	uom_id 				: dataTypes.INTEGER,
	rate 				: dataTypes.DOUBLE ,
	basic_value 		: dataTypes.DOUBLE ,	
	discount_prcnt 		: dataTypes.DOUBLE,
	discount_value 		: dataTypes.DOUBLE,
	tax_id 				: dataTypes.INTEGER,
	tax_prnct 			: dataTypes.DOUBLE,
	tax_value 			: dataTypes.DOUBLE,

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_purchase_return_dtl'
});
module.exports = purchaseReturnDtl;
