/**
 * @Filename	:	Supplier.js
 * @Description	:	To write Model Object for Supplier.
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

var model			= require('../config/sequelize.js');
var dataTypes		= require('sequelize');
var state			= require('../models/State.js');
var city			= require('../models/City.js');
var supplierType 	= require('../models/SupplierType.js');
var supplier 		= model.define('m_supplier', {

	supplier_id 	: {
	type 			: dataTypes.INTEGER,
	primaryKey 		: true,
	autoIncrement 	: true
	},
	
	supplier_code	: dataTypes.STRING,
	supplier_name	: dataTypes.STRING,
	address			: dataTypes.STRING,
	pincode			: dataTypes.STRING,
	landline_no		: dataTypes.STRING,
	mobile_no		: dataTypes.STRING,
	fax_no			: dataTypes.STRING,
	email_id		: dataTypes.STRING,
	contact_person	: dataTypes.STRING,
	contact_no		: dataTypes.STRING,
	remarks			: dataTypes.STRING,
	credit_days		: dataTypes.INTEGER,
	cst_no			: dataTypes.STRING,
	tin_no			: dataTypes.STRING,
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING,
	
	company_id 		: dataTypes.INTEGER,
	supp_type_id	: dataTypes.INTEGER,
	state_id		: dataTypes.INTEGER,
	city_id			: dataTypes.INTEGER,
	payment_type	: dataTypes.INTEGER,
	account_type	: dataTypes.INTEGER
	

}, {
	timestamps 		: false,
	freezeTableName : true,
	tableName 		: 'm_supplier'
});
supplier.belongsTo(state, {foreignKey : 'state_id'});
supplier.belongsTo(city, {foreignKey : 'city_id'});
supplier.belongsTo(supplierType, {foreignKey : 'supp_type_id'});

module.exports 		= supplier;