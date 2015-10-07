/**
 * @Filename	:	m_tax.js
 * @Description	:	To write Model Object for m_tax.
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');

var tax = model.define('m_tax', {

	tax_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	tax_name		: dataTypes.STRING,
	company_id 		: dataTypes.INTEGER,	
	state_id		: dataTypes.INTEGER,
	cst				: dataTypes.INTEGER,
	lst				: dataTypes.INTEGER,
	surcharge		: dataTypes.INTEGER,
	tax_on_mrp		: dataTypes.INTEGER,
	tax_symbol		: dataTypes.STRING,
	service_tax		: dataTypes.INTEGER,
	mrp_inclusive	: dataTypes.INTEGER,
	for_sales_yn	: dataTypes.STRING,
	for_purchase_yn	: dataTypes.STRING,
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_tax'
});

module.exports = tax;