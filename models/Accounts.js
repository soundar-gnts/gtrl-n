/**
 * @Filename	:	Accounts.js
 * @Description	:	To write Model Object for t_accounts table.
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
var accounts = model.define('t_accounts', {

	account_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	account_group		: dataTypes.STRING,
	account_name		: dataTypes.STRING,
	account_dt			: dataTypes.DATE,
	finance_year		: dataTypes.STRING,
	generate_voucher_yn	: dataTypes.STRING,
	employee_id			: dataTypes.INTEGER,
	bank_id				: dataTypes.INTEGER,
	bank_branch_id		: dataTypes.INTEGER,
	supplier_id			: dataTypes.INTEGER,
	client_id			: dataTypes.INTEGER,
	acct_type_id		: dataTypes.INTEGER,
	od_amoun			: dataTypes.INTEGER,
	open_balance		: dataTypes.INTEGER,
	parked_amount		: dataTypes.INTEGER,
	current_balance		: dataTypes.INTEGER,
	aproveauth			: dataTypes.STRING,
	parent_account_id	: dataTypes.INTEGER,
	selfapprv_yn		: dataTypes.STRING,
	remarks				: dataTypes.STRING,
	status				: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_accounts'
});
module.exports = accounts;
