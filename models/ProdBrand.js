/**
 * @Filename	:	ProdBrand.js
 * @Description	:	To write Model Object for m_prod_brand table.
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var productbrand 		= model.define('m_prod_brand', {

	prod_brand_id 		: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	prod_id				: dataTypes.INTEGER,
	brand_id 			: dataTypes.INTEGER,
	company_id 			: dataTypes.INTEGER,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 'm_prod_brand'
});
module.exports 			= productbrand;
