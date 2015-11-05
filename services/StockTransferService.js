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

// To get Stock TransferHdr List based on user param

exports.getStocktransferHdr = function(req, res) {
	
	var condition 		= "";
	var transferid		= req.param("transferid");
	var transferrefno	= req.param("transferrefno");
	var companyid		= req.param("companyid");
	var fromStoreid		= req.param("fromStoreid");
	var tostoreid		= req.param("tostoreid");
	var transferctgry	= req.param("transferctgry");
	var transferStatus	= req.param("transferStatus");
	
	if(transferid!=null){
		condition ="transfer_id="+transferid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(fromStoreid!=null){
		if(condition === ""){
			condition="from_Store_id='"+fromStoreid+"'";
		}else {
			condition=condition+" and from_Store_id='"+fromStoreid+"'";
		}
	}
	if(tostoreid!=null){
		if(condition === ""){
			condition="to_store_id='"+tostoreid+"'";
		}else {
			condition=condition+" and to_store_id='"+tostoreid+"'";
		}
	}
	if(transferrefno!=null){
		if(condition === ""){
			condition="transfer_refno like '%"+transferrefno+"%'";
		}else {
			condition=condition+" and transfer_refno like '%"+transferrefno+"%'";
		}
	}
	if(transferctgry!=null){
		if(condition === ""){
			condition="transfer_ctgry like '%"+transferctgry+"%'";
		}else {
			condition=condition+" and transfer_ctgry like '%"+transferctgry+"%'";
		}
	}
	
	if(transferStatus!=null){
		if(condition === ""){
			condition="transfer_Status='"+transferStatus+"'";
		}else {
			condition=condition+" and transfer_Status='"+transferStatus+"'";
		}
	}
	
	stocktranshdr.findAll({where : [condition],order: [['actioned_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info(fileName+'.getStocktransferHdr - '+appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(fileName+'.getStocktransferHdr - '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.info(fileName+'.getStocktransferHdr - '+appMsg.INTERNALERRORMESSAGE);
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
};

//To get Stock TransferDtl List based on user param

exports.getStocktransferDtl = function(req, res) {
	
		var condition 		= "";
		var transferid		= req.param("transferid");
		var transferdtlid	= req.param("transferdtlid");
		var productid		= req.param("productid");
		var batchno			= req.param("batchno");	
		var status			= req.param("status");
	
		if(transferdtlid!=null){
			condition ="transfer_dtlid="+transferdtlid;
		}
		
		if(transferid!=null){
			if(condition === ""){
				condition="transfer_id='"+transferid+"'";
			}else {
				condition=condition+" and transfer_id='"+transferid+"'";
			}
		}
		
		if(productid!=null){
			if(condition === ""){
				condition="product_id='"+productid+"'";
			}else {
				condition=condition+" and product_id='"+productid+"'";
			}
		}
		
		if(batchno!=null){
			if(condition === ""){
				condition="batch_no like '%"+batchno+"%'";
			}else {
				condition=condition+" and batch_no like '%"+batchno+"%'";
			}
		}
	
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		stocktransdtl.findAll({where : [condition]})
		
		.then(function(result) {
			if(result.length === 0){
				log.info(fileName+'.getStocktransferDtl - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data	 = "";
				res.send(response);
			} else{
				log.info(fileName+'.getStocktransferDtl - '+'About '+result.length+' results.');			
				response.status  	= true;
				response.message 	= 'About '+result.length+' results.';
				response.data 		= result;
				res.send(response);
			}
		}).error(function(err){
			log.info(fileName+'.getStocktransferDtl - '+appMsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	};



// To Save/Update StockTransferHdr and  Detail
exports.saveTransferDetails = function(slid, trnsferhdr, transferDetails,
		callback) {

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

					log.info(fileName + ' >> saveTransferDetails >> '
							+ appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status = true;
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
					response.message = appMsg.SAVEMESSAGE;
					response.status = true;
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
