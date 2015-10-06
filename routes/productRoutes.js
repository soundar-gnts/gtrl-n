/**
 * @Filename	:	productRoutes.js
 * @Description	:	To write Routing middlewares For product related table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 05, 2015
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
var m_product_service = require('../services/m_product_service.js');
module.exports = function(app, server) {
	app.post('/saveproduct', m_product_service.saveproduct);
	app.post('/getallproducts', m_product_service.getAllProducts);
	app.post('/getproductspec', m_product_service.getProductSpec);
	app.post('/getproductimages', m_product_service.getProductImages);
	app.post('/getproductbrands', m_product_service.getProductBrands);
}