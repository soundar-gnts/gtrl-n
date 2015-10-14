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
var productService = require('../services/ProductService.js');
var productSerialCodesService = require('../services/ProductSerialCodesService.js');

module.exports = function(app, server) {
	app.post('/saveproduct', productService.saveProduct);
	app.post('/getproductslist', productService.getProductsList);
	app.post('/getproductspec', productService.getProductSpec);
	app.post('/getproductimages', productService.getProductImages);
	app.post('/getproductbrands', productService.getProductBrands);
	//For product serial codes.
	app.post('/getproductserialcodesdetails', productSerialCodesService.getProductSerialCodesDetails);
	app.post('/saveproductserialcodes', productSerialCodesService.saveProductSerialCodes);
	
}