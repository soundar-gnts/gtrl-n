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
var stockadjustments 		= require('../models/StockAdjustments.js');
var log 					= require('../config/logger').logger;
var path 					= require('path');
var fileName				= path.basename(__filename);
var response 				= {
								status	: Boolean,
								message : String,
								data	: String  
								};
var stockLedgerService 		= require('../services/StockLedgerService.js');
var appMsg					= require('../config/Message.js');

// To get Stock Adjustments List based on user param
exports.getStockAdjustmentsDetails = function(req, res) {
	var condition 			= "";
	var attr 				= "";
	var adjustid			=req.param("adjustid");
	var companyid			=req.param("companyid");
	var productid			=req.param("productid");
	var storeid				=req.param("storeid");
	var adjustsymbol		=req.param("adjustsymbol");
	var status				=req.param("status");

	
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
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['adjust_id','product_id','company_id','adjust_symbol'];
	}
	stockadjustments.findAll({where : [condition],attributes: attr,order: [['actioned_dt', 'DESC']]}).then(function(result) {
		if(result.length === 0){
			log.info(fileName+'.getStockAdjustmentsDetails - '+appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(fileName+'.getStockAdjustmentsDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(fileName+'.getStockAdjustmentsDetails - ');
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}




// To Save/Update Stock Adjustments Details
exports.saveStockAdjustments = function(req, res) {
	stockadjustments.upsert({
		adjust_id					: req.param("adjustid"),
		product_id 					: req.param("productid"),
		company_id 					: req.param("companyid"),
		store_id 					: req.param("storeid"),
		adjust_date 				: req.param("adjustdate"),
		adjust_qty 					: req.param("adjustqty"),
		batch_no					: req.param("batchno"),
		uom_id						: req.param("uomid"),
		status						: req.param("status"),
		adjust_symbol 				: req.param("adjustsymbol"),
		adjust_reason 				: req.param("adjustreason"),
		actioned_by 				: req.param("actionedby"),
		actioned_dt 				: req.param("actioneddt")
		
	}).then(function(data){
		if(data){
			log.info(fileName+'.saveStockAdjustments - '+appMsg.SAVEMESSAGE);
			response.message = appMsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
			
		}
		else{
			log.info(fileName+'.saveStockAdjustments - '+appMsg.UPDATEMESSAGE);
			response.message = appMsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
			
			if(req.param("status")==='Approved' && req.param("adjustsymbol")==='+'){
				stockLedgerService.insertStockLedger(req.param("productid"),req.param("companyid"),req.param("storeid"),req.param("batchno"),req.param("adjustqty"),null,req.param("uomid"),null,data.actioned_dt,"Stock Adjustment - "+data.adjust_reason);
				}else if(req.param("status")==='Approved' && req.param("adjustsymbol")==='-') {
					stockLedgerService.insertStockLedger(req.param("productid"),req.param("companyid"),req.param("storeid"),req.param("batchno"),null,req.param("adjustqty"),req.param("uomid"),null,data.actioned_dt,"Stock Adjustment - "+data.adjust_reason)
				}
		}
		
	}).error(function(err){
		log.error(fileName+'.saveStockAdjustments - ');
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
		
}

