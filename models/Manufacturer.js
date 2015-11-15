/**
 * File Name	:	Manufacturer.js
 * Description	:	To write Model Object For Manufacturer.
 * Author		:	Arun Jeyaraj R
 * Date			:	October 05, 2015
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
var manufacturer 		= model.define('m_manufacturer', {

	manufg_id		: {
		type			: dataTypes.INTEGER,
	    primaryKey		: true,
	    autoIncrement	: true
	    },
	    
	    office_type		: dataTypes.STRING,
	    manufg_code		: dataTypes.STRING,
	    manufg_name		: dataTypes.STRING,
	    address			: dataTypes.STRING,
	    pincode			: dataTypes.STRING,
	    landline_no		: dataTypes.STRING,
	    mobile_no		: dataTypes.STRING,
	    fax_no			: dataTypes.STRING,
	    email_id		: dataTypes.STRING,
	    contact_person	: dataTypes.STRING,
	    contact_no		: dataTypes.STRING,

	    remarks			: dataTypes.STRING,
	    status			: dataTypes.STRING,
	    last_updated_dt	: dataTypes.DATE,
	    last_updated_by	: dataTypes.STRING,
	 
	    parent_id		: dataTypes.INTEGER,
	    company_id		: dataTypes.INTEGER,
	    state_id		: dataTypes.INTEGER,
	    city_id			: dataTypes.INTEGER,
	
},{
	freezeTableName		: true,
	tableName			: 'm_manufacturer'
});
module.exports 			= manufacturer;