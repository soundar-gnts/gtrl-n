/**
 * @Filename	:	m_product_image.js
 * @Description	:	To write Model Object for m_product_image table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 05, 2015
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
var productimage = model.define('m_product_image', {

	product_image_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	prod_id 			: dataTypes.INTEGER,
	company_id 			: dataTypes.INTEGER,
	store_id 			: dataTypes.INTEGER,
	product_image 		: dataTypes.STRING,
	status 				: dataTypes.STRING,
	lastupdated_by 		: dataTypes.STRING,
	lastupdated_date 	: dataTypes.DATE,
	prod_cat_id 		: dataTypes.INTEGER

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_product_image'
});
module.exports = productimage;
