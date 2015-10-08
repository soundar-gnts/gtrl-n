/**
 * File Name	:	PaymentType.js
 * Description	:	To write Model Object For Payment type.
 * Author		:	Haris K.A.
 * Date			:	October 06, 2015
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

var model = require('../config/sequelize.js');
var Company = require('../models/m_company.js');
var dataTypes = require('sequelize');

var PaymentType = model.define('m_payment_type', {
	
	pymt_type_id			: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
	    },
	    company_id		: dataTypes.INTEGER,
	    pymt_type_name	: dataTypes.STRING,
	    status			: dataTypes.STRING,
		last_updated_dt	: dataTypes.DATE,
		last_updated_by	: dataTypes.STRING,
	
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_payment_type'
});

PaymentType.belongsTo(Company, {foreignKey: 'company_id'})
module.exports = PaymentType;