/**
 * File Name	:	cardTypeRoutes.js
 * Description	:	To write Routing middlewares For Cardtype.
 * Author		:	Saranya G
 * Date			:	October 07, 2015
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

	var cardTypeService = require('../services/m_card_type.service.js');
	
	module.exports = function(app, server){
				
		app.post('/saveorupdatecardtype', cardTypeService.saveOrUpdateCardType);
		app.post('/getcardtypelist', cardTypeService.getCardTypeList);
		
	}

