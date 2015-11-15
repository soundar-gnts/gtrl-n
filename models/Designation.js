/**
 * @Filename	:	Designation.js
 * @Description	:	To write Model Object for Designation table.
 * @Author		:	Arun Jeyaraj R
 * @Date		:	October 08, 2015
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
var designation 		= model.define('m_designation', {

	designation_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	company_id 			: dataTypes.INTEGER,	
	designation_name 	: dataTypes.STRING,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	freezeTableName 	: true,
	tableName 			: 'm_designation'
});
module.exports 			= designation;
