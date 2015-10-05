/**
 * File Name	:	m_brand.js
 * Description	:	To write Model Object For Brand.
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var brand = model.define('m_brand', {
	
	brand_id			: {
		type: dataTypes.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	    },
	    
	    brand_name		: dataTypes.STRING,
	    status			: dataTypes.STRING,
	    last_updated_dt	: dataTypes.DATE,
	    last_updated_by	: dataTypes.STRING,
	 
	    company_id		: dataTypes.INTEGER,
	 
	
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_brand'
});
module.exports = brand;