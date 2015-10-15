/**
 * @Filename	:	Employee.js
 * @Description	:	To write Model Object for m_employee table.
 * @Author		:	SOUNDAR C
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var employee = model.define('m_employee', {

	employee_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	company_id 			: dataTypes.INTEGER,
	employee_code 		: dataTypes.STRING,
	first_name 			: dataTypes.STRING,
	last_name 			: dataTypes.STRING,
	primary_phone 		: dataTypes.STRING,
	dob 				: dataTypes.DATE,
	gender 				: dataTypes.STRING,
	department 			: dataTypes.STRING,
	store_id 			: dataTypes.INTEGER,
	rm_employee_id 		: dataTypes.INTEGER,
	user_id 			: dataTypes.INTEGER,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING,
	email_id			: dataTypes.STRING,
	create_user_yn		: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_employee'
});
module.exports = employee;
