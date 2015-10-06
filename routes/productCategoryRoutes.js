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
	app.post('/addProductCategory', 		productCategoryService.saveOrUpdateproductCategory);
	app.post('/getAllProductCategory', 		productCategoryService.getAllProductCategory);
	app.post('/getProductCategory', 		productCategoryService.getOneProductCategory);
	app.post('/deleteProductCat', 			productCategoryService.deleteProductCategory);
	app.post('/getSubProductCategory', 		productCategoryService.getSubProductCategory);
	app.post('/getLevelProductCategory', 	productCategoryService.getLevelProductCategory);
	app.post('/statusProdCategory', 		productCategoryService.inactiveOrActiveProductCat);
	
}