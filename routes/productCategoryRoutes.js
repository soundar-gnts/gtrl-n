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

var productCategoryService = require('../services/m_prod_category_service.js');

module.exports = function(app, server){
	app.post('/addproductcategory', 		productCategoryService.saveOrUpdateproductCategory);
	app.post('/getallproductcategory', 		productCategoryService.getAllProductCategory);
	app.post('/getproductcategory', 		productCategoryService.getOneProductCategory);
	app.post('/getsubproductcategory', 		productCategoryService.getSubProductCategory);
	app.post('/getlevelproductcategory', 	productCategoryService.getLevelProductCategory);
	app.post('/statusprodcategory', 		productCategoryService.inactiveOrActiveProductCat);
	//app.post('/deleteproductcategory', 		productCategoryService.deleteProductCategory);
}