/**
 * @Filename	:	Voucher.js
 * @Description	:	To write Model Object for m_voucher table.
 * @Author		:	Saranya G
 * @Date		:	October 06, 2015
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

	var model		 = require('../config/sequelize.js');
	var dataTypes 	 = require('sequelize');
	var voucher		 = model.define('m_voucher', {
	
		voucher_id : {
			
			type			 : dataTypes.INTEGER,
			primaryKey 		 : true,
			autoIncrement 	 : true
			
		},
		company_id 			: dataTypes.INTEGER,
		voucher_type_id 	: dataTypes.INTEGER,	
		voucher_code 		: dataTypes.STRING,
		discount_level 		: dataTypes.STRING,
		discount_value 		: dataTypes.INTEGER,
		prod_cat_id 		: dataTypes.INTEGER,
		min_bill_value  	: dataTypes.INTEGER,
		region_id       	: dataTypes.INTEGER,
		status 				: dataTypes.STRING,
		last_updated_dt 	: dataTypes.DATE,
		last_updated_by 	: dataTypes.STRING
	
	}, {

		freezeTableName : true,
		tableName 		: 'm_voucher'
	});
	module.exports = voucher;
