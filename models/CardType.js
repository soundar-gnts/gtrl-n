/**
 * @Filename	:	CardType.js
 * @Description	:	To write Model Object for m_card_type table.
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

	var model 		 = require('../config/sequelize.js');
	var dataTypes	 = require('sequelize');
	var cardType 	 = model.define('m_card_type', {
	
		card_type_id : {
			
			type			: dataTypes.INTEGER,
			primaryKey 		: true,
			autoIncrement 	: true
		},
		
		company_id 			: dataTypes.INTEGER,	
		card_type 			: dataTypes.STRING,	
		service_charge		: dataTypes.INTEGER,
		status 				: dataTypes.STRING,
		last_updated_dt 	: dataTypes.DATE,
		last_updated_by 	: dataTypes.STRING
	
	}, {		
		
		freezeTableName 	 : true,
		tableName 			 : 'm_card_type'
	});
	module.exports = cardType;
