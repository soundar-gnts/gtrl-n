/**
 * @Filename	:	AccountPayables.js
 * @Description	:	To write Model Object for t_account_payables table.
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
var accountpayables = model.define('t_account_payables', {

	accpayble_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
		
	company_id			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	entry_date			: dataTypes.DATE,
	account_id			: dataTypes.INTEGER,
	bill_no				: dataTypes.STRING,
	bill_date			: dataTypes.DATE,
	grn_no				: dataTypes.STRING,
	invoice_amount		: dataTypes.INTEGER,
	paid_amount			: dataTypes.INTEGER,
	balance_amount		: dataTypes.INTEGER,
	remarks				: dataTypes.STRING,
	prepared_by			: dataTypes.STRING,
	actioned_by			: dataTypes.STRING,
	status				: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_account_payables'
});
module.exports = accountpayables;
