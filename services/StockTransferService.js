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
exports.saveTransferDetails = function(req, res){
		
		var response    = 	{	status	: Boolean,
					 			message : String,
					 			data	: String
				 			}
		
    	var trnsferhdr  =	{
					 			transfer_id					: req.param("transferid"),
								company_id 					: req.param("companyid"),
								transfer_refno 				: req.param("transferrefno"),
								transfer_date				: req.param("transferdate"),
								from_Store_id 				: req.param("fromStoreid"),
								to_store_id 				: req.param("tostoreid"),
								transfer_ctgry 				: req.param("transferctgry"),
								transfer_remarks 			: req.param("transferremarks"),	
								transfer_Status 			: req.param("transferStatus"),
								basic_total 				: req.param("basictotal"),
								total_tax 					: req.param("totaltax"),
								total_value 				: req.param("totalvalue"),
								action_remarks 				: req.param("actionremarks"),
								actioned_by 				: req.param("actionedby"),
								actioned_dt 				: req.param("actioneddt"),
								transfered_by 				: req.param("transferedby")
				 			}
		var transferDetails 	= [];
		var detailsLength 		= 0;		
		
	    if(req.param('stocktranslist') != null){			 		
		detailsLength = req.param('stocktranslist').length;
	    }
			 	
		for(var i = 0; i < detailsLength; i++){
			var transferdtl = {	transfer_dtlid 			: req.param('stocktranslist')[i].transferdtlid,
								transfer_id 			: req.param("transferid"),
								product_id 				: req.param('stocktranslist')[i].productid,
								transfer_qty            : req.param('stocktranslist')[i].transferqty,
								uom_id					: req.param('stocktranslist')[i].uomid,
								batch_no				: req.param('stocktranslist')[i].batchno,
								received_qty 			: req.param('stocktranslist')[i].receivedqty,
								rate 					: req.param('stocktranslist')[i].rate,				
								basic_value				: req.param('stocktranslist')[i].basicvalue,
								discount_prcnt			: req.param('stocktranslist')[i].discountprcnt,
								tax_id					: req.param('stocktranslist')[i].taxid,
								tax_prnct				: req.param('stocktranslist')[i].taxprnct,
								tax_value				: req.param('stocktranslist')[i].taxvalue,
								remarks					: req.param('stocktranslist')[i].remarks,
								status					: req.param('stocktranslist')[i].status,
			 			}
			 				transferDetails.push(transferdtl);
			 		}
			 	
			 	if(req.param('transferid')!=null){
			 	
			 		stocktranshdr.upsert(trnsferhdr).then(function(data){ 
			 		
			 			for(var i = 0; i < transferDetails.length; i++){
			 				
			 				saveOrUpdateTransfer(transferDetails[i]);
			 			
			 				//TO DO : Updation in Stock Ledger,Summary both to and from stores
			 				if(req.param('transferStatus')==='Approved' && transferDetails[i].transfer_qty!=0){
			 					
			 					console.log("trans---"+req.param('stocktranslist')[i].transferqty);
			 					
			 					//To update stock ledger and summary details on from store
			 					stockLedgerService.insertStockLedger(req.param('stocktranslist')[i].productid,req.param("companyid"),req.param("fromStoreid")
			 					,req.param('stocktranslist')[i].batchno,0,req.param('stocktranslist')[i].transferqty,
			 							req.param('stocktranslist')[i].uomid,req.param("transferrefno"),req.param("transferdate"),
			 							"Stock Transfer Out - Trans Ref : "+req.param('transferrefno'));
			 					
			 					//To update stock ledger and summary details to store
			 					stockLedgerService.insertStockLedger(req.param('stocktranslist')[i].productid,req.param("companyid")
			 							,req.param("tostoreid"),req.param('stocktranslist')[i].batchno,req.param('stocktranslist')[i].transferqty,
			 							0,req.param('stocktranslist')[i].uomid,req.param("transferrefno"),req.param("transferdate"),
			 							"Stock Transfer In - Trans Ref : "+req.param('transferrefno'));
			 					
			 					
			 					//To update product serial code details 
			 					productSerialCodes.updateProductSerialStoreid(req.param("companyid"),req.param('stocktranslist')[i].productid,
				 						req.param("tostoreid"),req.param('stocktranslist')[i].batchno);
			 				}			 				
			 			
			 			}
			 			log.info(fileName+' >> saveTransferDetails >> '+appMsg.UPDATEMESSAGE);
						response.message = appMsg.UPDATEMESSAGE;
						response.status  = true;
						res.send(response);
			 			
			 		})
			 		.error(function(err){
			 			log.info(fileName+' >> saveTransferDetails >> '+appMsg.INTERNALERRORMESSAGE);
						log.error(err);
						response.status  	= false;
						response.message 	= appMsg.INTERNALERRORMESSAGE;
						response.data  		= err;
						res.send(response);
			 		});
			 	} else{
			 	
			 		stocktranshdr.create(trnsferhdr)
			 		.then(function(data){
			 			for(var i = 0; i < detailsLength; i++){
			 				transferDetails[i].transfer_id = data.transfer_id;			 			
			 				saveOrUpdateTransfer(transferDetails[i]);
			 			}
			 			log.info(fileName+' >> saveTransferDetails >> '+appMsg.SAVEMESSAGE);
						response.message = appMsg.SAVEMESSAGE;
						response.status  = true;
						res.send(response);
			 		})
			 		.error(function(err){
			 			log.info(fileName+' >> saveTransferDetails >> '+appMsg.INTERNALERRORMESSAGE);
						log.error(err);
						response.status  	= false;
						response.message 	= appMsg.INTERNALERRORMESSAGE;
						response.data  		= err;
						res.send(response);
			 		});
			 		}
			 }

//To Save/Update Stock Transfer Details	 
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
