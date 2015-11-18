/**
 * @Filename	:	SupplierAccountType.js
 * @Description	:	To write Model Object for supplier account type.
 * @Author		:	Haris K.A.
 * @Date		:	October 07, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var supplierAcType 		= model.define('m_supp_acct_type', {

	supp_acct_id 		: {
		type			: dataTypes.INTEGER,
		primaryKey		: true,
		autoIncrement	: true
	},
	supp_acct_name		: dataTypes.STRING,
	company_id 			: dataTypes.INTEGER,	
	status 				: dataTypes.STRING,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 'm_supp_acct_type'
});

module.exports 			= supplierAcType;