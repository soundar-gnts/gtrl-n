/**
 * File Name	:	user.js
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var User = model.define('m_user', {
	
	user_id			: {
		type: dataTypes.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	    },
	login_id		: dataTypes.STRING,
	user_name		: dataTypes.STRING,
	login_pwd		: dataTypes.STRING,
	access_Card_no	: dataTypes.STRING,
	data_access_lvl	: dataTypes.STRING,
	txn_access_lvl	: dataTypes.STRING,
	discount_prcnt	: dataTypes.INTEGER,
	edit_units_yn	: dataTypes.STRING,
	credit_bill_yn	: dataTypes.STRING,
	edit_price_yn	: dataTypes.STRING,
	edit_tax_yn		: dataTypes.STRING,
	status			: dataTypes.STRING,
	last_updated_dt	: dataTypes.DATE,
	last_updated_by	: dataTypes.STRING,
	otp_code		: dataTypes.STRING,
	start_date		: dataTypes.DATE,
	expr_date		: dataTypes.DATE,
	session_id		: dataTypes.STRING,
	
	company_id		: dataTypes.INTEGER,
	group_id		: dataTypes.INTEGER,
	base_store_id	: dataTypes.INTEGER,
	data_region_id	: dataTypes.INTEGER,
	data_store_id	: dataTypes.INTEGER,
	txn_region_id	: dataTypes.INTEGER,
	txn_store_id	: dataTypes.INTEGER
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_user'
});
module.exports = User;