/**
 * File Name	:	cityRoutes.js
 * Description	:	To write Routing middlewares For User.
 * Author		:	Saranya G
 * Date			:	October 05, 2015
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

var cityService= require('../services/cityService.js');

module.exports = function(app, server){
	app.get('/citylist', cityService.cityList);
	app.post('/savecity', cityService.saveCity);
	app.post('/saveorupdateCity', cityService.saveOrUpdateCity);
}

