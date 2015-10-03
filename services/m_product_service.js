/**
 * @Filename 		: m_product_service.js 
 * @Description 	: To write Business Logic for product. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 03, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */

var product = require('../models/m_product.js');

// To save product details
exports.saveproduct = function(req, res) {
	product.create({
		prod_id			: req.param('prodid'),
		prod_code		: req.param('prodcode'),
		prod_name		: req.param('prodname')

	}).error(function(err) {
		res.send(err);
	});
	res.send('Successfully Saved.');
}
