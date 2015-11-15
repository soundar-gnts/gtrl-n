/**
 * @Filename	:	BankBranch.js
 * @Description	:	To write Model Object for m_bank_branch table.
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var bankBranch 			= model.define('m_bank_branch', {

	branch_id: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	bank_id				: dataTypes.INTEGER,	
	company_id 			: dataTypes.INTEGER,	
	branch_code 		: dataTypes.STRING,
	branch_name 		: dataTypes.STRING,	
	address 			: dataTypes.STRING,
	ifsc_code 			: dataTypes.STRING,	
	pincode 			: dataTypes.STRING,
	state_id			: dataTypes.INTEGER,	
	city_id 			: dataTypes.INTEGER,	
	landline_no 		: dataTypes.STRING,
	fax_no 				: dataTypes.STRING,	
	email_id 			: dataTypes.STRING,
	contact_person 		: dataTypes.STRING,	
	contact_no 			: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	freezeTableName 	: true,
	tableName 			: 'm_bank_branch'
});
module.exports 			= bankBranch;
