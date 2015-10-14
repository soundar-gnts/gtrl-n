/**
 * @Filename 		: StockLedgerService.js
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
var stockledger = require('../models/StockLedger.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var stockSummaryService = require('../services/StockSummaryService.js');

// To get StockLedger List based on user param
exports.getStockLedgerDetails = function(req, res) {
	var condition = "";
	var stockledid=req.param("stockledid");
	var companyid=req.param("companyid");
	var productid=req.param("productid");
	var storeid=req.param("storeid");
	var batchno=req.param("batchno");
	var islatest=req.param("islatest");
	if(stockledid!=null){
		condition ="stock_ledid="+stockledid;
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
	
	if(islatest!=null){
		if(condition === ""){
			condition="is_latest='"+islatest+"'";
		}else {
			condition=condition+" and is_latest='"+islatest+"'";
		}
	}
	
	stockledger.findAll({where : [condition]}).then(function(result) {
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




// To Save/Update Stock Ledger Details
exports.saveStockLedger = function(req, res) {
	stockledger.upsert({
		stock_ledid					: req.param("stockledid"),
		ledger_date 				: req.param("ledgerdate"),
		product_id 					: req.param("productid"),
		company_id 					: req.param("companyid"),
		store_id 					: req.param("storeid"),
		batch_no 					: req.param("batchno"),
		open_qty 					: req.param("openqty"),
		in_qty 						: req.param("inqty"),
		out_qty 					: req.param("outqty"),
		close_qty 					: req.param("closeqty"),
		uom_id 						: req.param("uomid"),
		is_latest 					: req.param("islatest"),
		ref_no 						: req.param("refno"),
		ref_date 					: req.param("refdate"),
		ref_remarks 				: req.param("refremarks")
		
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

exports.insertStockLedger=function(productid,companyid,storeid,batchno,inqty,outqty,uomid,refno,refdate,refremarks){
	console.log(productid);
	stockledger.findOne({where:[{product_id:productid,company_id:companyid,store_id:storeid,batch_no:batchno,is_latest:'Y'}]})
	.then(function(result){
		if(inqty==null){
			inqty=0;
		}
		if(outqty==null){
			outqty=0;
		}
		
		var ledger={
				ledger_date 				: new Date(),
				product_id 					: productid,
				company_id 					: companyid,
				store_id 					: storeid,
				batch_no 					: batchno,
				open_qty 					: 0,
				in_qty 						: inqty,
				out_qty 					: outqty,
				close_qty 					: 0,
				uom_id 						: uomid,
				is_latest 					: 'Y',
				ref_no 						: refno,
				ref_date 					: refdate,
				ref_remarks 				: refremarks
		};
		
		
		if(result!=null){
			ledger.open_qty=result.close_qty;
		}else{
			ledger.open_qty=0;
		}
		ledger.close_qty =ledger.open_qty+inqty-outqty; 

		stockledger.create(ledger).then(function(p) {
			if (result != null) {
				stockledger.update({is_latest:'N'},{where : {stock_ledid:result.stock_ledid}}).error(function(err){
					
				});
			}
			//For update Stock Summary
			var lastsoldqty =outqty;
			if(outqty==null||outqty==0){
				lastsoldqty=inqty;
			}
			stockSummaryService.UpdateStockSummary(productid,companyid,storeid,batchno,ledger.close_qty,refdate,lastsoldqty);
		});
		
		
	});
	
	
	
}

