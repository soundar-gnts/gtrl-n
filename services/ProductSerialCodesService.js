/**
 * @Filename 		: ProductSerialCodesService.js
 * @Description 	: To write Business Logic for t_account_payables. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 08, 2015
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
var productserialcodes = require('../models/ProductSerialCodes.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};

// To get Product Serial Codes List based on user param
exports.getProductSerialCodesDetails = function(req, res) {
	var condition = "";
	var serialrefno=req.param("serialrefno");
	var companyid=req.param("companyid");
	var grnid=req.param("grnid");
	var productid=req.param("productid");
	var storeid=req.param("storeid");
	var batchid=req.param("batchid");
	var status=req.param("status");
	if(serialrefno!=null){
		condition ="serial_refno="+serialrefno;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(grnid!=null){
		if(condition === ""){
			condition="grn_id='"+grnid+"'";
		}else {
			condition=condition+" and grn_id='"+grnid+"'";
		}
	}
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	if(storeid!=null){
		if(condition === ""){
			condition="store_id='"+storeid+"'";
		}else {
			condition=condition+" and store_id='"+storeid+"'";
		}
	}
	if(batchid!=null){
		if(condition === ""){
			condition="batch_id='"+batchid+"'";
		}else {
			condition=condition+" and batch_id='"+batchid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	productserialcodes.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = 'No data found.';
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}




// To Save/Update Product Serial Codes Details
exports.saveProductSerialCodes = function(req, res) {
	productserialcodes.upsert({
		serial_refno			: req.param("serialrefno"),
		company_id 				: req.param("companyid"),
		grn_id 					: req.param("grnid"),
		product_id 				: req.param("productid"),
		store_id 				: req.param("storeid"),
		batch_id 				: req.param("batchid"),
		ean_serialno 			: req.param("eanserialno"),
		store_serialno 			: req.param("storeserialno"),
		status 					: req.param("status"),
		print_status 			: req.param("printstatus")
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
		
}


