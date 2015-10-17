/**
 * @Filename	:	AccountTransactions.js
 * @Description	:	To write Model Object for t_account_txns table.
 * @Author		:	Arun Jeyaraj R
 * @Date		:	October 17, 2015
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
var accountTransactions = model.define('t_account_txns', {

	acctxn_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	entry_date			: dataTypes.DATE,
	value_date			: dataTypes.DATE,	
	account_id			: dataTypes.INTEGER,
	voucher_no			: dataTypes.STRING,
	employee_id			: dataTypes.INTEGER,
	trans_type_id		: dataTypes.INTEGER,
	open_balance		: dataTypes.DOUBLE,
	trans_amount		: dataTypes.DOUBLE,
	close_balance		: dataTypes.DOUBLE,
	payment_mode		: dataTypes.STRING,
	ref_no				: dataTypes.STRING,
	ref_date			: dataTypes.DATE,
	bank_name			: dataTypes.STRING,
	instrument_remark	: dataTypes.STRING,
	txn_remarks			: dataTypes.STRING,
	prepared_by			: dataTypes.STRING,
	actioned_by			: dataTypes.STRING,
	linked_acctxn_id	: dataTypes.INTEGER,
	action_remarks		: dataTypes.STRING,
	status				: dataTypes.STRING,	
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING

}, {
	freezeTableName 	: true,
	tableName 			: 't_account_txns'
});
module.exports = accountTransactions;
