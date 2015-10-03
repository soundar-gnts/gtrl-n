/**
 * File Name	:	m_customer.js
 * Description	:	To write Model Object For Customer.
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
var Customer = model.define('m_customer', {
	
	cust_id			: {
		type: dataTypes.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	    },
	    
	    cust_code		: dataTypes.STRING,
	    gender			: dataTypes.STRING,
	    credit_yn		: dataTypes.STRING,
	    tin_no			: dataTypes.STRING,
	    expiry_date		: dataTypes.DATE,
	    address			: dataTypes.STRING,
	    pincode			: dataTypes.STRING,
	    landline_no		: dataTypes.STRING,
	    mobile_no		: dataTypes.STRING,
	    email_id		: dataTypes.STRING,
	    dob				: dataTypes.DATE,
	    anniv_date		: dataTypes.DATE,
	    remarks			: dataTypes.STRING,
	    status			: dataTypes.STRING,
	    last_updated_dt	: dataTypes.DATE,
	    last_updated_by	: dataTypes.STRING,
	    cus_last_name	: dataTypes.STRING,
	    cus_first_name	: dataTypes.STRING,
	
	    company_id		: dataTypes.INTEGER,
	    cust_group_id	: dataTypes.INTEGER,
	    age_group_id	: dataTypes.INTEGER,
	    state_id		: dataTypes.INTEGER,
	    city_id			: dataTypes.INTEGER,
	
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_customer'
});
module.exports = Customer;