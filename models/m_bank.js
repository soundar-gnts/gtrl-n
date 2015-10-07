/**
 * @Filename	:	m_bank.js
 * @Description	:	To write Model Object for m_bank table.
 * @Author		:	Arun Jeyaraj R
 * @Date		:	October 06, 2015
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
var bank = model.define('m_bank', {

	bank_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	company_id 			: dataTypes.INTEGER,	
	bank_code 			: dataTypes.STRING,
	bank_name 			: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_bank'
});
module.exports = bank;
