/**
 * @Filename	:	PurchaseReturnHdr.js
 * @Description	:	To write Model Object for t_purchase_return_hdr.
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
var dataTypes			= require('sequelize');
var purchaseReturnHdr 	= model.define('t_purchase_return_hdr', {

	return_id : {
		
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	company_id 			: dataTypes.INTEGER,
	po_id 				: dataTypes.INTEGER,
	retrun_ref_no 		: dataTypes.STRING,
	return_date 		: dataTypes.DATE,
	store_id 			: dataTypes.INTEGER,
	supplier_id 		: dataTypes.INTEGER,
	amount_payble 		: dataTypes.DOUBLE,
	outstanding_amount 	: dataTypes.DOUBLE,
	return_type 		: dataTypes.STRING,
	payment_mode 		: dataTypes.STRING,
	discount_prcnt 		: dataTypes.DOUBLE,
	discount_value 		: dataTypes.DOUBLE,
	return_reason 		: dataTypes.STRING,
	cancel_remark 		: dataTypes.STRING,
	status		   		: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING,

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_purchase_return_hdr'
});
module.exports = purchaseReturnHdr;
