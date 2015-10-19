/**
 * @Filename	:	PoHeader.js
 * @Description	:	To write Model Object for Purchase order header.
 * @Author		:	Haris K.A.
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
 */

var model		= require('../config/sequelize.js');
var dataTypes	= require('sequelize');
var poDetail	= require('../models/PoDetail.js');
var supplier	= require('../models/Supplier.js');

var poHeader = model.define('t_po_hdr', {

	po_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	
	company_id		: dataTypes.INTEGER,
	po_no			: dataTypes.STRING,
	po_date			: dataTypes.DATE,
	store_id		: dataTypes.INTEGER,
	supplier_id		: dataTypes.INTEGER,
	invoice_addr	: dataTypes.STRING,
	shipping_addr	: dataTypes.STRING,
	po_remark		: dataTypes.STRING,
	basic_total		: dataTypes.DOUBLE,
	total_value		: dataTypes.DOUBLE,
	total_tax		: dataTypes.DOUBLE,
	total_discount	: dataTypes.DOUBLE,
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_po_hdr'
});

poHeader.hasMany(poDetail, 	{foreignKey: 'po_id'});
poHeader.hasOne(supplier, 	{foreignKey: 'supplier_id'});
module.exports = poHeader;