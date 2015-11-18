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
var stockledger 		= require('../models/StockLedger.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');
var stockSummaryService = require('../services/StockSummaryService.js');

var path 				= require('path');
var filename			= path.basename(__filename);


// To get StockLedger List based on user param
exports.getStockLedgerDetails = function(condition,fetchAssociation,callback) {
	
	stockledger.findAll({where : [condition],include : fetchAssociation}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getStockLedgerDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getStockLedgerDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getStockLedgerDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save/Update Stock Ledger Details
exports.saveStockLedger = function(ledgerobj,callback) {
	stockledger.upsert(ledgerobj).then(function(data){
		if(data){
			log.info(filename+'>>saveStockLedger>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		else{
			log.info(filename+'>>saveStockLedger>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveStockLedger>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}
//For Insert New record in ledger and update in stock summary
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

