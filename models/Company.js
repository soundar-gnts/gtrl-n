/**
 * File Name	:	Company.js
 * Description	:	To write Model Object For Company.
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
 *   0.1		3-10-2015			Arun Jeyaraj R       Added company columns
 * 
 */

var model 					= require('../config/sequelize.js');
var dataTypes 				= require('sequelize');
var Company 				= model.define('m_company', {
	
	company_id				: {
		type				: dataTypes.INTEGER,
	    primaryKey			: true,
	    autoIncrement		: true
	    },
	    company_name		: dataTypes.STRING,
	    address			    : dataTypes.STRING,
	    pincode		        : dataTypes.STRING,
	    landline_no			: dataTypes.STRING,
	    mobile_no	     	: dataTypes.STRING,
	    fax_no		   		: dataTypes.STRING,
	    email_id			: dataTypes.STRING,
	    contact_person		: dataTypes.STRING,
	    contact_no			: dataTypes.STRING,
	    remarks				: dataTypes.STRING,
	    status				: dataTypes.STRING,
	    last_updated_dt		: dataTypes.DATE,
	    last_updated_by		: dataTypes.STRING,
	    
	    
	    state_id         	: dataTypes.INTEGER,
	    city_id				: dataTypes.INTEGER,

	    
},{
	freezeTableName			: true,
	tableName				: 'm_company'
});
module.exports 				= Company;