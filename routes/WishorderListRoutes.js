/**
 * @Filename	:	WishorderListRoutes.js
 * @Description	:	To write Routing middlewares For Wishorder List table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 17, 2015
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
var wishorderListService = require('../services/WishorderListService.js');
module.exports = function(app, server) {
	app.post('/getwishorderlist', wishorderListService.getWishorderList);
	app.post('/savewishorderlist', wishorderListService.saveWishorderList);
}

