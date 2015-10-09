/**
 * @Filename	:	ScreenTree.js
 * @Description	:	To write Model Object for Screen tree.
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');

var screenTree = model.define('m_screen_tree', {

	screen_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	screen_name		: dataTypes.STRING,
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_screen_tree'
});

module.exports = screenTree;