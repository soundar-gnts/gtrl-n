/**
 * File Name	:	m_state.js
 * Description	:	To create schema for state.
 * Author		:	Saranya G
 * Date			:	Oct 03 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd. 
 * 
 * Version       Date           	Modified By             Remarks
   	        
 */

	var model = require('../config/sequelize.js');
	var dataTypes = require('sequelize');
	var State = model.define('m_state', {
		
		state_id	: {
			
			type			: dataTypes.INTEGER,
		    primaryKey		: true,
		    autoIncrement	: true
		   
		},
		
		state_name		: dataTypes.STRING,
		status		    : dataTypes.STRING,
		last_updated_dt	: dataTypes.DATE,
		last_updated_by	: dataTypes.STRING,
	
	},{
		timestamps: false,
		 freezeTableName: true,
		tableName: 'm_state'
	});
	module.exports = State;