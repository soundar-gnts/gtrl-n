/**
 * @Filename	:	UserGroup.js
 * @Description	:	To write Model Object for User Group.
 * @Author		:	Haris K.A.
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
 */

var model 			= require('../config/sequelize.js');
var dataTypes 		= require('sequelize');

var userGroup = model.define('m_user_group', {

	group_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},
	group_name		: dataTypes.STRING,
	company_id 		: dataTypes.INTEGER,	
	status 			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_user_group'
});

//userGroup.hasMany(userAccessTree, {foreignKey: 'group_id'});
module.exports = userGroup;