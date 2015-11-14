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
exports.getStockAdjustmentsDetails = function(condition,attr,callback) {
	
	stockadjustments.findAll({where : [condition],attributes: attr,order: [['actioned_dt', 'DESC']]}).then(function(result) {
		if(result.length === 0){
			log.info(fileName+'.getStockAdjustmentsDetails - '+appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getStockAdjustmentsDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.error(fileName+'.getStockAdjustmentsDetails - ');
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}




// To Save/Update Stock Adjustments Details
exports.saveStockAdjustments = function(adjustobj,callback) {
	stockadjustments.upsert(adjustobj).then(function(data){
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
			
			//For update stock ledger and summary
			if(adjustobj.status==='Approved' && adjustobj.adjust_symbol==='+'){
				stockLedgerService.insertStockLedger(adjustobj.product_id,adjustobj.company_id,adjustobj.store_id,
						adjustobj.batch_no,adjustobj.adjust_qty,null,adjustobj.uom_id,null,data.actioned_dt,
						"Stock Adjustment - "+data.adjust_reason);
				}else if(adjustobj.status==='Approved' && adjustobj.adjust_symbol==='-') {
					stockLedgerService.insertStockLedger(adjustobj.product_id,adjustobj.company_id,adjustobj.store_id
							,adjustobj.batch_no,null,adjustobj.adjust_qty,adjustobj.uom_id,null,data.actioned_dt,
							"Stock Adjustment - "+data.adjust_reason)
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

