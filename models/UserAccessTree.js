/**
 * @Filename	:	UserAccessTree.js
 * @Description	:	To write Model Object for UserAccess tree.
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
var userGroup = require('../models/UserGroup.js');

var accesTree = model.define('m_user_access_tree', {

	acc_tree_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	screen_name		: dataTypes.STRING,
	view_yn			: dataTypes.STRING,
	group_id		: dataTypes.INTEGER,
	company_id 		: dataTypes.INTEGER,	
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_user_access_tree'
});

//accesTree.belongsTo(userGroup, {foreignKey : 'group_id', targetKey : 'group_id'});
module.exports = accesTree;