/**
 * File Name	:	storeRoutes.js
 * Description	:	To write Routing middlewares For StoreRoutes.
 * Author		:	Saranya G
 * Date			:	October 08, 2015
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

var storeService= require('../services/StoreService.js');

module.exports = function(app, server){
	app.post('/getstorelist', storeService.getStoreList);
	app.post('/getstoreregionlist', storeService.getStoreRegionList);
	app.post('/saveorupdatestore', storeService.saveOrUpdateStore);
	
}

