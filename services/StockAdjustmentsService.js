/**
 * @Filename 		: StockAdjustmentsService.js
 * @Description 	: To write Business Logic for StockAdjustments. 
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
var stockadjustments = require('../models/StockAdjustments.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var stockLedgerService = require('../services/StockLedgerService.js');
var appmsg			= require('../config/Message.js');

// To get Stock Adjustments List based on user param
exports.getStockAdjustmentsDetails = function(req, res) {
	var condition = "";
	var adjustid=req.param("adjustid");
	var companyid=req.param("companyid");
	var productid=req.param("productid");
	var storeid=req.param("storeid");
	var adjustsymbol=req.param("adjustsymbol");
	
	if(adjustid!=null){
		condition ="adjust_id="+adjustid;
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
	if(adjustsymbol!=null){
		if(condition === ""){
			condition="adjust_symbol='"+adjustsymbol+"'";
		}else {
			condition=condition+" and adjust_symbol='"+adjustsymbol+"'";
		}
	}
	
	stockadjustments.findAll({where : [condition]}).then(function(result) {
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




// To Save/Update Stock Adjustments Details
exports.saveStockAdjustments = function(req, res) {
	stockadjustments.create({
		adjust_id					: req.param("adjustid"),
		product_id 					: req.param("productid"),
		company_id 					: req.param("companyid"),
		store_id 					: req.param("storeid"),
		adjust_date 				: req.param("adjustdate"),
		adjust_qty 					: req.param("adjustqty"),
		batch_no					: req.param("batchno"),
		uom_id						: req.param("uomid"),
		adjust_symbol 				: req.param("adjustsymbol"),
		adjust_reason 				: req.param("adjustreason"),
		actioned_by 				: req.param("actionedby"),
		actioned_dt 				: req.param("actioneddt")
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
			if(data.adjust_symbol==='+'){
			stockLedgerService.insertStockLedger(data.product_id,data.company_id,data.store_id,data.batch_no,data.adjust_qty,null,data.uom_id,null,data.actioned_dt,data.adjust_reason);}else{
				stockLedgerService.insertStockLedger(data.product_id,data.company_id,data.store_id,data.batch_no,null,data.adjust_qty,data.uom_id,null,data.actioned_dt,data.adjust_reason)
			}
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

