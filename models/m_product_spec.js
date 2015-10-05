/**
 * @Filename	:	m_product_spec.js
 * @Description	:	To write Model Object for m_product_spec table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 05, 2015
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
var productspec = model.define('m_product_spec', {

	prod_spec_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	prod_id 		: dataTypes.INTEGER,
	spec_name 		: dataTypes.STRING,
	spec_value 		: dataTypes.STRING,
	status 			: dataTypes.STRING,
	last_updated_dt : dataTypes.DATE,
	last_updated_by : dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_product_spec'
});
module.exports = productspec;
