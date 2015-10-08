/**
 * File Name	:	ProductCategoryRoutes.js
 * Description	:	To write Routing middlewares For Product Category.
 * Author		:	Haris K.A.
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

var productCategoryService = require('../services/ProductCategoryService.js');

module.exports = function(app, server){
	
	app.post('/saveproductcategorydetails',	productCategoryService.saveOrUpdateproductCategory);
	app.post('/getproductcategorydetails', 	productCategoryService.getProductCategory);
	
}