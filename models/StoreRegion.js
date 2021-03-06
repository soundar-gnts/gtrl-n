/**
 * @Filename	:	StoreRegion.js
 * @Description	:	To write Model Object for m_store_region table.
 * @Author		:	Saranya G
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

var model		 		= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var storeRegion 		= model.define('m_store_region', {

	region_id : {
		
		type		 	: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	company_id 			: dataTypes.INTEGER,
	region_name 		: dataTypes.STRING,
	all_region_yn 		: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	
	freezeTableName 	: true,
	tableName 			: 'm_store_region'
});
module.exports 			= storeRegion;
