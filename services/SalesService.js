/**
 * @Filename 		: SalesService.js
 * @Description 	: To write Business Logic for Product Sales. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 16, 2015
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
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var path = require('path');
var filename=path.basename(__filename);
//
var saledtl = require('../models/SaleDtl.js');

exports.getSaleDetail=function(productid,batchno,callback){
	console.log(productid);
	saledtl.findOne({where:[{product_id:productid,batch_no:batchno}]})
	.then(function(result){
		callback(result);
	});
	
	
	
}

