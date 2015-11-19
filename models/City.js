/**
 * File Name	:	City.js
 * Description	:	To create schema for City.
 * Author		:	Saranya G
 * Date			:	Oct 05 2015
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
var state 			= require('../models/State.js');
var City 			= model.define('m_city', {

	city_id 		: {
	type 			: dataTypes.INTEGER,
	primaryKey 		: true,
	autoIncrement 	: true

	},

	city_name 		: dataTypes.STRING,
	state_id 		: dataTypes.INTEGER,
	status 			: dataTypes.STRING,
	last_updated_dt : dataTypes.DATE,
	last_updated_by : dataTypes.STRING,

}, {
	freezeTableName : true,
	tableName 		: 'm_city'
});
City.belongsTo(state, 	{foreignKey: 'state_id'});
module.exports = City;