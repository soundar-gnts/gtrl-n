/**
 * File Name	:	m_company.js
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
 * 
 * 
 */

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var Company = model.define('m_user', {
	
	company_id			: {
		type: dataTypes.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	    }
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_company'
},{
	classMethods: {
		associate	:function(models){
			Company.belongsTo(models.m_user)
			
		}
	}
});
module.exports = Company;