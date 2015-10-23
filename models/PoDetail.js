/**
 * @Filename	:	PoDetail.js
 * @Description	:	To write Model Object for Purchse order details.
 * @Author		:	Haris K.A.
 * @Date		:	October 10, 2015
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
var product		= require('../models/Product.js');

var poDetail = model.define('t_po_dtl', {

	po_dtlid : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	
	po_id			: dataTypes.INTEGER,
	prod_id			: dataTypes.INTEGER,
	po_qty			: dataTypes.INTEGER,
	bal_qty			: dataTypes.INTEGER,
	uom_id			: dataTypes.INTEGER,
	rate			: dataTypes.DOUBLE,
	basic_value		: dataTypes.DOUBLE,
	discount_prcnt	: dataTypes.DOUBLE,
	tax_id			: dataTypes.INTEGER,
	tax_prnct		: dataTypes.DOUBLE,
	tax_value		: dataTypes.DOUBLE,
	purchase_value	: dataTypes.DOUBLE,
	discount_value	: dataTypes.DOUBLE
	
}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 't_po_dtl'
});

poDetail.belongsTo(product, 	{foreignKey: 'prod_id'});
module.exports = poDetail;