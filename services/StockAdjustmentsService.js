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
var stockLedgerService 		= require('../services/StockLedgerService.js');
var appMsg					= require('../config/Message.js');

// To get Stock Adjustments List based on user param
exports.getStockAdjustmentsDetails = function(condition, selectedAttribute, callback) {
	log.error(fileName+'.getStockAdjustmentsDetails - ');
	var response = {
			status	: Boolean,
			message : String,
			data	: String  
		}
	
	stockadjustments.findAll({where : [condition],attributes: selectedAttribute,order: [['actioned_dt', 'DESC']]}).then(function(result) {
		if(result.length === 0){
			log.info(appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

exports.saveOrUpdateStockAdjustments = function(stockAdjstmentObj, callback) {
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(stockAdjstmentObj.adjust_id != null){
		stockadjustments.upsert(stockAdjstmentObj)
		.then(function(data){						
			log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTREMOVESUCCESS);
			response.message = appmsg.WISHLISTREMOVESUCCESS;
			response.status  = true;
			response.data  		= stockAdjstmentObj.adjust_id;
			callback(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		stockadjustments.create(stockAdjstmentObj)
		.then(function(data){						
			log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTREMOVESUCCESS);
			response.message = appmsg.WISHLISTREMOVESUCCESS;
			response.status  = true;
			response.data  		= data.adjust_id;
			callback(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}


// To Save/Update Stock Adjustments Details
exports.saveStockAdjustments = function(stockAdjstment, callback) {
	stockadjustments.upsert(stockAdjstment).then(function(data){
		if(data){
			log.info(fileName+'.saveStockAdjustments - '+appMsg.SAVEMESSAGE);
			response.message = appMsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
			
		}
		else{
			log.info(fileName+'.saveStockAdjustments - '+appMsg.UPDATEMESSAGE);
			response.message = appMsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
			
			if(stockAdjstment.status==='Approved' && stockAdjstment.adjust_symbol==='+'){
				stockLedgerService.insertStockLedger(stockAdjstment.product_id, stockAdjstment.company_id, stockAdjstment.store_id, stockAdjstment.batch_no, stockAdjstment.adjust_qty,null,stockAdjstment.uom_id,null,data.actioned_dt,"Stock Adjustment - "+data.adjust_reason);
				}else if(stockAdjstment.status==='Approved' && stockAdjstment.adjust_symbol ==='-') {
					stockLedgerService.insertStockLedger(stockAdjstment.product_id,stockAdjstment.company_id,stockAdjstment.store_id,stockAdjstment.batch_no,null,stockAdjstment.adjust_qty,stockAdjstment.uom_id,null,data.actioned_dt,"Stock Adjustment - "+data.adjust_reason)
				}
		}
		
	}).error(function(err){
		log.error(fileName+'.saveStockAdjustments - ');
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
		
}

