/**
 * @Filename	:	SlnoGen.js
 * @Description	:	To write Model Object for m_slno_gen table.
 * @Author		:	SOUNDAR C
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

var model 				= require('../config/sequelize.js');
var dataTypes 			= require('sequelize');
var slnogen 			= model.define('m_slno_gen', {

	slno_id 			: {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	company_id 			: dataTypes.INTEGER,
	slno_gen_level 		: dataTypes.STRING,
	store_id 			: dataTypes.INTEGER,
	ref_key 			: dataTypes.STRING,
	key_desc 			: dataTypes.STRING,
	autogen_yn 			: dataTypes.STRING,
	prefix_key 			: dataTypes.STRING,
	prefix_cncat 		: dataTypes.STRING,
	suffix_key 			: dataTypes.STRING,
	suffix_cncat 		: dataTypes.STRING,
	curr_seqno 			: dataTypes.INTEGER,
	last_seqno 			: dataTypes.INTEGER,
	status 				: dataTypes.STRING,
	last_updated_dt 	: dataTypes.DATE,
	last_updated_by 	: dataTypes.STRING

}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 'm_slno_gen'
});
module.exports 			= slnogen;
