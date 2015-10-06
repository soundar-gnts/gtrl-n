/**
 * @Filename	:	m_store.js
 * @Description	:	To write Model Object for m_store table.
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var store = model.define('m_store', {

	store_id : {
		type : dataTypes.INTEGER,
		primaryKey : true,
		autoIncrement : true
	},

	company_id 			: dataTypes.INTEGER,
	store_code 			: dataTypes.STRING,
	store_name 			: dataTypes.STRING,
	address 			: dataTypes.STRING,
	pincode 			: dataTypes.STRING,	
	state_id 			: dataTypes.INTEGER,	
	city_id 			: dataTypes.INTEGER,		
	landline_no 		: dataTypes.STRING,
	mobile_no 			: dataTypes.STRING,
	email_id 			: dataTypes.STRING,
	contact_person 		: dataTypes.STRING,	
	contact_no 			: dataTypes.STRING,		
	is_warehouse 		: dataTypes.STRING,
	warehouse_id 		: dataTypes.INTEGER,
	store_brand_name 	: dataTypes.STRING,
	dl_no 				: dataTypes.STRING,	
	cst_no 				: dataTypes.STRING,	
	dl_no 				: dataTypes.STRING,	
	tin_no 				: dataTypes.STRING,	
	discount_percent 	: dataTypes.INTEGER,	
	servicetax_no 		: dataTypes.STRING,	
	door_delivery_yn 	: dataTypes.STRING,		
	stk_check_freq 		: dataTypes.INTEGER,	
	stk_check_day 		: dataTypes.INTEGER,		
	stk_check_sms 		: dataTypes.STRING,
	stk_check_email 	: dataTypes.STRING,	
	stk_transfer_yn 	: dataTypes.STRING,	
	stk_receive_yn 		: dataTypes.STRING,	
	stk_trans_lvl 		: dataTypes.STRING,		
	stk_recv_lvl 		: dataTypes.STRING,
	
	stk_trans_region_id : dataTypes.INTEGER,	
	stk_trans_store_id 	: dataTypes.INTEGER,
	stk_recv_region_id 	: dataTypes.INTEGER,	
	stk_recv_store_id 	: dataTypes.INTEGER,
	
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	timestamps : false,
	freezeTableName : true,
	tableName : 'm_store'
});
module.exports = store;
