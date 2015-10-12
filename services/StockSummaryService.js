/**
 * @Filename 		: StockSummaryService.js
 * @Description 	: To write Business Logic for Stock Ledger. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 09, 2015
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
var stocksummary = require('../models/StockSummary.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

// To get Stock Summary List based on user param
exports.getStockSummaryDetails = function(req, res) {
	var condition = "";
	var stockid=req.param("stockid");
	var companyid=req.param("companyid");
	var productid=req.param("productid");
	var storeid=req.param("storeid");
	var batchno=req.param("batchno");
	if(stockid!=null){
		condition ="stock_id="+stockid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
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
	
	if(batchno!=null){
		if(condition === ""){
			condition="batch_no='"+batchno+"'";
		}else {
			condition=condition+" and batch_no='"+batchno+"'";
		}
	}
	
	stocksummary.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
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




// To Save/Update Stock Summary Details
exports.saveStockSummary = function(req, res) {
	stocksummary.upsert({
		stock_id					: req.param("stockid"),
		product_id 					: req.param("productid"),
		company_id 					: req.param("companyid"),
		store_id 					: req.param("storeid"),
		batch_no 					: req.param("batchno"),
		curr_stock 					: req.param("currstock"),
		last_sold_dt 				: req.param("lastsolddt"),
		last_sold_qty 				: req.param("lastsoldqty")
		
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
