/**
 * @Filename	:	Product.js
 * @Description	:	To write Model Object for m_product table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 03, 2015
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

var model		= require('../config/sequelize.js');
var dataTypes	= require('sequelize');
var productImage= require('../models/ProductImage.js');

var product = model.define('m_product', {

	prod_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	company_id 		: dataTypes.INTEGER,
	prod_code 		: dataTypes.STRING,
	prod_name 		: dataTypes.STRING,
	prod_image		: dataTypes.STRING,
	prod_desc 		: dataTypes.STRING,
	manufg_id 		: dataTypes.INTEGER,
	brand_id 		: dataTypes.INTEGER,
	max_discount 	: dataTypes.INTEGER,
	min_stock_lvl 	: dataTypes.INTEGER,
	max_stock_lvl 	: dataTypes.INTEGER,
	prod_cat_lvl1 	: dataTypes.INTEGER,
	prod_cat_lvl2 	: dataTypes.INTEGER,
	prod_cat_lvl3 	: dataTypes.INTEGER,
	prod_cat_lvl4 	: dataTypes.INTEGER,
	prod_cat_lvl5 	: dataTypes.INTEGER,
	buy_price 		: dataTypes.INTEGER,
	buy_unit 		: dataTypes.INTEGER,
	buy_tax_id 		: dataTypes.INTEGER,
	sell_price 		: dataTypes.INTEGER,
	sell_unit 		: dataTypes.INTEGER,
	sell_tax_id 	: dataTypes.INTEGER,
	mrp 			: dataTypes.INTEGER,
	uom_id 			: dataTypes.INTEGER,
	cash_discount 	: dataTypes.STRING,
	direct_purchase : dataTypes.STRING,
	is_billable 	: dataTypes.STRING,
	is_bundle 		: dataTypes.STRING,
	zero_rate 		: dataTypes.STRING,
	machine_wt 		: dataTypes.STRING,
	status 			: dataTypes.STRING,
	last_updated_dt : dataTypes.DATE,
	last_updated_by : dataTypes.STRING,
	prod_cat_id 	: dataTypes.INTEGER,
	online_yn 		: dataTypes.STRING,
	corporate_yn 	: dataTypes.STRING,
	wholesale_yn 	: dataTypes.STRING,
	ean_num_yn 		: dataTypes.STRING,
	last_seq_no		: dataTypes.INTEGER

}, {
	timestamps 		: false,
	freezeTableName : true,
	tableName 		: 'm_product'
});

product.hasMany(productImage,	{foreignKey : 'prod_id'});
module.exports = product;
