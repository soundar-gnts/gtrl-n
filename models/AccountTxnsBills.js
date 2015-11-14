/**
 * @Filename	:	AccountTxnsBills.js
 * @Description	:	To write Model Object for t_account_txns_bills table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 23, 2015
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
var accounttxnsbills 	= model.define('t_account_txns_bills', {

	txnbill_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	acctxn_id			: dataTypes.INTEGER,
	account_id			: dataTypes.INTEGER,
	ref_no				: dataTypes.STRING,
	ref_date			: dataTypes.DATE,
	paid_amount			: dataTypes.INTEGER,
	status				: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_account_txns_bills'
});
module.exports = accounttxnsbills;
