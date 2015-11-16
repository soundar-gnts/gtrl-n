/**
 * @Filename	:	AccountRecevables.js
 * @Description	:	To write Model Object for t_account_receivables table.
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

var model 				 = require('../config/sequelize.js');
var dataTypes			 = require('sequelize');
var accounts 			 = require('../models/Accounts.js');
var accountRecevables	 = model.define('t_account_receivables', {

	  accrcble_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	company_id 			: dataTypes.INTEGER,
	store_id			: dataTypes.INTEGER,
	entry_date 			: dataTypes.DATE,
	account_id 			: dataTypes.INTEGER,
	invoice_no 			: dataTypes.STRING,
	invoice_date 		: dataTypes.DATE ,
	invoice_amount 		: dataTypes.DOUBLE ,	
	paid_amount 		: dataTypes.DOUBLE,
	balance_amount 		: dataTypes.DOUBLE,
	remarks 			: dataTypes.STRING,
	prepared_by 		: dataTypes.STRING,
	actioned_by 		: dataTypes.STRING,
	status		   		: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING,

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_account_receivables'
});
accountRecevables.belongsTo(accounts,	{foreignKey: 'account_id'});
module.exports 			= accountRecevables;
