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
var stocksummary 	= require('../models/StockSummary.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');
var path 			= require('path');
var filename		= path.basename(__filename);

// To get Stock Summary List based on user param
exports.getStockSummaryDetails = function(condition,callback) {
	
	stocksummary.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getStockSummaryDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getStockSummaryDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getStockSummaryDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}



// To Save/Update Stock Summary Details
exports.saveStockSummary = function(summaryobj,callback) {
	stocksummary.upsert(summaryobj).then(function(data){
		if(data){
			log.info(filename+'>>saveStockSummary>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		else{
			log.info(filename+'>>saveStockSummary>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveStockSummary>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}
//Updation in stock summery
exports.UpdateStockSummary=function(productid,companyid,storeid,batchno,currstock,lastsolddt,lastsoldqty){
	var values={
			product_id:productid,company_id:companyid,store_id:storeid,curr_stock:currstock,batch_no:batchno
	};
	stocksummary.findOne({where : [values]}).then(function(result) {
		if (result != null) {
			stocksummary.update({curr_stock:currstock,last_sold_dt:lastsolddt,last_sold_qty:lastsoldqty},{where : {stock_id:result.stock_id}})
			.error(function(err){
				
			});
		}else{
			stocksummary.create({
				product_id 					: productid,
				company_id 					: companyid,
				store_id 					: storeid,
				batch_no 					: batchno,
				curr_stock 					: currstock,
				last_sold_dt 				: lastsolddt,
				last_sold_qty 				: lastsoldqty
				
			});
		}
	});
}