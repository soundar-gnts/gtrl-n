/**
 * @Filename	:	WishorderList.js
 * @Description	:	To write Model Object for t_wishorder_list table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 17, 2015
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
var wishorderlist 		= model.define('t_wishorder_list', {

	wish_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	customer_id			: dataTypes.INTEGER,
	product_id			: dataTypes.INTEGER,
	company_id			: dataTypes.INTEGER,
	status				: dataTypes.STRING,
	rating				: dataTypes.INTEGER

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_wishorder_list'
});
module.exports = wishorderlist;
