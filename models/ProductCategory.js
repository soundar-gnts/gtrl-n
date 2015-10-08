/**
 * File Name	:	ProductCategory.js
 * Description	:	To write Model Object For User.
 * Author		:	Haris K.A.
 * Date			:	October 03, 2015
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

var model 			= require('../config/sequelize.js');
var dataTypes 		= require('sequelize');

var ProductCategory = model.define('m_prod_category', {
	
	prod_cat_id			: {
		type			: dataTypes.INTEGER,
	    primaryKey		: true,
	    autoIncrement	: true
	    },
	    prod_cat_name	: dataTypes.STRING,
	    parent_id		: dataTypes.INTEGER,
	    company_id		: dataTypes.INTEGER,
	    level_no		: dataTypes.INTEGER,
	    last_level		: dataTypes.STRING,
	    status			: dataTypes.STRING,
		last_updated_dt	: dataTypes.DATE,
		last_updated_by	: dataTypes.STRING,
		prod_cat_image	: dataTypes.STRING,
		sales_count		: dataTypes.INTEGER,
		refer_parid		: dataTypes.INTEGER,
		prod_cat_bgimage: dataTypes.STRING
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_prod_category'
});

module.exports = ProductCategory;