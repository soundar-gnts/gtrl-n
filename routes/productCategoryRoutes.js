/**
 * File Name	:	productCategoryRoutes.js
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

var productCategoryService = require('../services/productCategoryService.js');

module.exports = function(app, server){
	app.post('/productCatAdd', 		productCategoryService.productCategoryAdd);
	app.post('/ProductCats', 		productCategoryService.returnAllProductCategory);
	app.post('/productCat', 		productCategoryService.returnOneProductCategory);
	app.post('/deleteProductCat', 	productCategoryService.deleteProductCategory);
	app.post('/subProductCat', 	productCategoryService.returnSubProductCategory);
	app.post('/levelProductCat', 	productCategoryService.returnLevelProductCategory);
	
}