/**
 * @Filename 		: StockTransferService.js
 * @Description 	: To write Business Logic for StockTransfers. 
 * @Author 			: Saranya G
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
var productSerialCodes	= require('../services/ProductSerialCodesService.js');
var stockLedgerService  = require('../services/StockLedgerService.js');
var stocktranshdr  		= require('../models/StockTransferHdr.js');
var stocktransdtl  		= require('../models/StockTransferDtl.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var path				= require('path');
var fileName			= path.basename(__filename);
var response  			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var messagesService 	= require('../services/MessagesService.js');
var slnogenService 		= require('../services/SlnoGenService.js');

// To get Stock TransferHdr List based on user param
exports.getStocktransferHdr = function(condition,fetchAssociation,callback) {
	
	stocktranshdr.findAll({where : [condition],include : fetchAssociation,order: [['actioned_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info(fileName+'.getStocktransferHdr - '+appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getStocktransferHdr - '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.info(fileName+'.getStocktransferHdr - '+appMsg.INTERNALERRORMESSAGE);
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
};

//To get Stock TransferDtl List based on user param
exports.getStocktransferDtl = function(condition,callback) {
	
		stocktransdtl.findAll({where : [condition]})
		
		.then(function(result) {
			if(result.length === 0){
				log.info(fileName+'.getStocktransferDtl - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data	 = "";
				callback(response);
			} else{
				log.info(fileName+'.getStocktransferDtl - '+'About '+result.length+' results.');			
				response.status  	= true;
				response.message 	= 'About '+result.length+' results.';
				response.data 		= result;
				callback(response);
			}
		}).error(function(err){
				log.info(fileName+'.getStocktransferDtl - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	};



// To Save/Update StockTransferHdr and  Detail
exports.saveTransferDetails = function(slid, trnsferhdr, transferDetails, callback) {

	var response = {
		status 	: Boolean,
		message : String,
		data 	: String
	}

	if (transferDetails != null) {
		detailsLength = transferDetails.length;
		console.log("detailsLength-->"+detailsLength);
	}

	if (trnsferhdr.transfer_id != null) {

		stocktranshdr.upsert(trnsferhdr).then(
				function(data) {

					for (var i = 0; i < transferDetails.length; i++) {

						saveOrUpdateTransfer(transferDetails[i]);

						// TO DO : Updation in Stock Ledger,Summary both to and
						// from stores
						if (trnsferhdr.transfer_Status === 'Approved') {

							console.log("trans---"
									+ transferDetails[i].transfer_qty);

							// To update stock ledger and summary details on
							// from store
							stockLedgerService.insertStockLedger(
									transferDetails[i].product_id,
									trnsferhdr.company_id,
									trnsferhdr.from_Store_id,
									transferDetails[i].batch_no, 0,
									transferDetails[i].transfer_qty,
									transferDetails.uom_id,
									trnsferhdr.transfer_refno,
									trnsferhdr.transfer_date,
									"Stock Transfer Out - Trans Ref : "
											+ trnsferhdr.transfer_refno);

							// To update stock ledger and summary details to
							// store
							stockLedgerService.insertStockLedger(
									transferDetails[i].product_id,
									trnsferhdr.company_id,
									trnsferhdr.to_store_id,
									transferDetails[i].batch_no,
									transferDetails[i].transfer_qty, 0,
									transferDetails[i].uom_id,
									trnsferhdr.transfer_refno,
									trnsferhdr.transfer_date,
									"Stock Transfer In - Trans Ref : "
											+ trnsferhdr.transfer_refno);

							// To update product serial code details
							productSerialCodes.updateProductSerialStoreid(
									trnsferhdr.company_id,
									transferDetails[i].product_id,
									trnsferhdr.to_store_id,
									transferDetails[i].batch_no);
						}

					}


					//if slid exist, serial number generated, so need to update slnoGen table 
					if(slid != null){
					slnogenService.updateSequenceNo(slid, trnsferhdr.actioned_dt, trnsferhdr.actioned_by);
					}
					
					log.info(fileName + ' >> saveTransferDetails >> ' + appMsg.UPDATEMESSAGE);
					//Return Tranfer ID and Tranfer Ref_No 
					var stocktransfer = {
							transfer_id : trnsferhdr.transfer_id,
							transfer_refno : trnsferhdr.transfer_refno
					}
					response.message 	= appMsg.UPDATEMESSAGE;
					response.data  		= stocktransfer;
					response.status 	= true;
					callback(response);
					
				}).error(
				function(err) {
					log.info(fileName + ' >> saveTransferDetails >> '
							+ appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status = false;
					response.message = appMsg.INTERNALERRORMESSAGE;
					response.data = err;
					callback(response);
				});
	} else {

		stocktranshdr.create(trnsferhdr).then(
				function(data) {
					for (var i = 0; i < detailsLength; i++) {
						transferDetails[i].transfer_id = data.transfer_id;
						saveOrUpdateTransfer(transferDetails[i]);
					}
					log.info(fileName + ' >> saveTransferDetails >> '
							+ appMsg.SAVEMESSAGE);
					var stocktransfer = {
							transfer_id : data.transfer_id,
							transfer_refno : data.transfer_refno
					}
					
					//if slid exist, serial number generated, so need to update slnoGen table 
					if(slid != null){
					slnogenService.updateSequenceNo(slid, trnsferhdr.actioned_dt, trnsferhdr.actioned_by);
					}
					
					response.message 	= appMsg.SAVEMESSAGE;
					response.data  		= stocktransfer;
					response.status 	= true;
					callback(response);
				}).error(
				function(err) {
					log.info(fileName + ' >> saveTransferDetails >> '
							+ appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status = false;
					response.message = appMsg.INTERNALERRORMESSAGE;
					response.data = err;
					callback(response);
				});
	}
}

// To Save/Update Stock Transfer Details
 function saveOrUpdateTransfer(transferdtl) {
	stocktransdtl.upsert(transferdtl)
	.then(function(data) {

	}).error(function(err) {
		log.error(err);
	});
}
//To Delete Stock Transfer Details
function deleteStockTransDtl(condition) {
	var response = {
		status : Boolean,
		message : String,
		data : String
	}
	stocktransdtl.destroy({
		where : [ condition ]
	}).then(function(data) {

		if (data >= '1') {
			log.info(data + ' Removed.');
			response.status = true;
			response.message = data + ' Removed removed.';
		} else {
			log.info(fileName+' >> deleteStockTransDtl >> '+appMsg.LISTNOTFOUNDMESSAGE);
			response.status = true;
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
		}
		return response;
	}).error(function(err) {
		log.info(fileName+' >> deleteStockTransDtl >> '+appMsg.INTERNALERRORMESSAGE);
		log.error(err);
		response.status = false;
		response.message = appMsg.INTERNALERRORMESSAGE;
		response.data = err;
		return response;
	});
}
