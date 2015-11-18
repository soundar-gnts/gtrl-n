/**
 * File Name	:	SalesReturnService.js
 * Description	:	To write Business Logic For Sales Return.
 * Author		:	Anand G
 * Date			:	November 14, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 * 
 */

var path				= require('path');
var fileName			= path.basename(__filename);
var log 				= require('../config/logger').logger;
var APPMSG				= require('../config/Message.js');
var CONSTANT			= require('../config/Constants.js');

var salesReturnHdr 	= require('../models/SaleHeader.js');
var salesReturnDtl 	= require('../models/SaleDtl.js');

var stockLedgerService  		= require('../services/StockLedgerService.js');
var slnogenService 				= require('../services/SlnoGenService.js');
var accountReceivable 			= require('../services/AccountReceivableService.js');
var productSerialCodesService 	= require('../services/ProductSerialCodesService.js');
var accountReceivableService 	= require('../services/AccountReceivableService.js');
//get all Purchase Return header List
var getSalesReturnHdrList = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getSalesReturnHdrList');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	salesReturnHdr.findAll({
		where		: [condition],
		include		: fetchAssociation,
		attributes	: selectedAttributes
	})
	.then(function(ReturnHdr){
		if(ReturnHdr.length == 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+ReturnHdr.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+ReturnHdr.length+' results.';
			response.data 		= ReturnHdr;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}
//Get All Sales Return Details List
var getSalesReturnDtlList = function(condition, selectedAttributes, fetchAssociation, callback){
	//log.info(fileName+'.getPo');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	salesReturnDtl.findAll({
		where		: [condition],
		include		: fetchAssociation,
		attributes	: selectedAttributes
	})
	.then(function(ReturnDtl){
		if(ReturnDtl.length == 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+ReturnDtl.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+ReturnDtl.length+' results.';
			response.data 		= ReturnDtl;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
} 

//Save or Update Sales Return Header 
var saveOrUpdateSalesReturnHeader = function(returnHdr, callback){
	
	log.info(fileName+'.saveOrUpdateSalesReturnHeader');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if Sales id exist then update otherwise create poheader table 
	if(returnHdr.sale_id != null){
		salesReturnHdr.upsert(returnHdr)
		.then(function(data){
			log.info(APPMSG.POEDITSUCCESS);
			response.message 	= APPMSG.SALESRETURNEDITSUCCESS;
			response.data  		= returnHdr.sale_id;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		salesReturnHdr.create(returnHdr)
		.then(function(data){
			//log.info(APPMSG.POSAVESUCCESS);
			response.message	= APPMSG.SALESRETURNSAVESUCCESS;
			response.data  		= data.sale_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
			
		});
	}
}

var saveOrUpdateSalesReturnDetails = function(salesReturnDtl_res, callback) {

	log.info(fileName+'.saveOrUpdateSalesReturnDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if Sales details id exist then update otherwise create poDetail table 
	if(salesReturnDtl_res.return_dtlid != null){
		salesReturnDtl.upsert(salesReturnDtl_res)
		.then(function(data){
			log.info(APPMSG.SALESDETAILEDITSUCCESS);
			response.message	= APPMSG.SALESRETURNDETAILEDITSUCCESS;
			response.data  		= purchaseReturnDtl_res.return_dtlid;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		salesReturnDtl.create(salesReturnDtl_res)
		.then(function(data){
			log.info(APPMSG.PODETAILSAVESUCCESS);
			response.message	= APPMSG.SALESRETURNDETAILSAVESUCCESS;
			response.data  		= data.return_dtlid;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

var saveOrUpdateSalesReturn = function(slid, salesReturnHdr, salesReturnDetails, salesReturnDeleteDetailsIds,callback){
	log.info(fileName+'.saveOrUpdateSalesReturn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saveOrUpdateSalesReturnHeader(salesReturnHdr, function(header){
		//if true data inserted/updated successfully else error
		if(header.status){			
			//if slid exist, serial number generated, so need to update slnoGen table 
			if(slid != null)
				slnogenService.updateSequenceNo(slid, salesReturnHdr.last_updated_dt, salesReturnHdr.last_updated_by);
			console.log('header.status : '+header.status);
			//if delete details id exist need to hard delete in poDetail Table
			if(salesReturnDeleteDetailsIds != null)
				salesReturnDeleteDetailsIds.forEach(function(prDelDetail){
					deletePoDetails("return_dtlid='"+prDelDetail.return_dtlid+"'", function(result){
						log.info(result);
					});
				});
			//if purchase details exist need to add/update in poDetail Table
			if(salesReturnDetails != null)
				salesReturnDetails.forEach(function(salesReturnDetail){
					salesReturnDetail.return_id = header.data;
					saveOrUpdateSalesReturnDetails(salesReturnDetail, function(result){
						console.log(result);
					});
					// Update Ledger Details  
					 stockLedgerService.insertStockLedger(
							 salesReturnDetail[i].product_id,
							 salesReturnDetail.company_id,
							 salesReturnDetail.store_id,
							 salesReturnDetail.batch_no,
							 salesReturnDetail[i].invoice_qty,
 							0,
 							salesReturnDetail[i].uom_id,
 							salesReturnDetail.invoice_no,
 							salesReturnDetail.invoice_date,"Purchase Goods -Invoice Number : "+salesReturnDetail.invoice_no+'-'+salesReturnDetail.action_remarks);
 					//To Insert Row in product Serail Codes
 					productSerialCodesService.insertProductSerialCodes(
 							salesReturnDetail.company_id,
 							salesReturnDetail.purchase_id,
 							salesReturnDetail[i].product_id,
 							salesReturnDetail.store_id,
 							salesReturnDetail.batch_no,
 							salesReturnDetail[i].eanserialno,
 							salesReturnDetail[i].storeserialno); 	
				});
			//For  Account Receivable 
			accountReceivableService.insertAccountReceivable(salesReturnHdr.supplier_id,salesReturnHdr.company_id,
			salesReturnHdr.store_id,new Date(),null,salesReturnHdr.invoice_no,salesReturnHdr.invoice_date,
			salesReturnHdr.invoice_amount,salesReturnHdr.invoice_amount,'Sales Deleted - Ref No :'+salesReturnHdr.invoice_no,
			salesReturnHdr.last_updated_dt,salesReturnHdr.last_updated_by);			
			
			callback(header);
		} else{
			console.log('header.status'+header.status);
			callback(header);
		}
	});
}

//Cancel, Approve and Reject service (po_hdr)
var changeSalesReturnStatus = function(salesReturnHdr, callback){
	log.info(fileName+'.changeSalesReturnStatus');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition = "return_id='"+salesReturnHdr.return_id+"'";
	getPo(condition, '', '', function(data){
		//if true data exist else error
		if(data.status){
			//if approved cannot do rejection & cancel operation else can
			if(data.data[0].status == CONSTANT.STATUSAPPROVED && (salesReturnHdr.status == CONSTANT.STATUSREJECTED||salesReturnHdr.status == CONSTANT.STATUSCANCELLED)){
				log.info('Sales order is already'+CONSTANT.STATUSAPPROVED);
				response.status  	= true;
				response.message 	= 'Sales order is already'+CONSTANT.STATUSAPPROVED;
				callback(result);
			} else
				saveOrUpdateSalesReturnHeader(salesReturnHdr, function(result){
					if(result.status){
						
						//insert into message table when status is Pending/Cancelled/Approved/Rejected
						if(salesReturnHdr.status == CONSTANT.STATUSCANCELLED || salesReturnHdr.status == CONSTANT.STATUSAPPROVED || salesReturnHdr.status == CONSTANT.STATUSREJECTED || salesReturnHdr.status == CONSTANT.STATUSPENDING){
							var msgObj = {
									company_id 			: data.data[0].company_id 
							}
							messageService.saveMessages(msgObj, function(rslt){
								log.info(rslt);
							});
						}
						
						log.info('Sales order is '+salesReturnHdr.status);
						response.status  	= true;
						response.message 	= 'Sales order is '+salesReturnHdr.status;
						callback(result);
					} else
						callback(result);
				});
		} else
			callback(data);
	});
	
}

module.exports = {
	getSalesReturnHdrList	: getSalesReturnHdrList,
	getSalesReturnDtlList	: getSalesReturnDtlList,
	saveOrUpdateSalesReturn	: saveOrUpdateSalesReturn,
	changeSalesReturnStatus	: changeSalesReturnStatus
}
