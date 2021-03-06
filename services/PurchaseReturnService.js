/**
 * File Name	:	PurchaseReturnService.js
 * Description	:	To write Business Logic For Purchase order header.
 * Author		:	Anand G
 * Date			:	November 05, 2015
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

var purchaseReturnHdr 	= require('../models/PurchaseReturnHdr.js');
var purchaseReturnDtl 	= require('../models/PurchaseReturnDtl.js');

var stockLedgerService  		= require('../services/StockLedgerService.js');
var slnogenService 		= require('../services/SlnoGenService.js');
var accountReceivable 			= require('../services/AccountReceivableService.js');
var productSerialCodesService 	= require('../services/ProductSerialCodesService.js');
var accountReceivableService 	= require('../services/AccountReceivableService.js');
//get all Purchase Return header List
var getPurchaseReturnHdrList = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getPurchaseReturnHdrList');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	purchaseReturnHdr.findAll({
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
//Get All Purchase Return Details List
var getPurchaseReturnDtlList = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getPo');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	purchaseReturnDtl.findAll({
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

//Save or Update Purchase Return Header 
var saveOrUpdatePurchaseReturnHeader = function(returnHdr, callback){
	
	log.info(fileName+'.saveOrUpdatePurchaseReturnHeader');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	};
	//if purchase order id exist then update otherwise create poheader table 
	console.log('returnHdr.return_id,--->'+returnHdr.return_id);
	console.log('returnHdr.retrun_ref_no,--->'+returnHdr.retrun_ref_no);
	
	
	if(returnHdr.return_id != null){
		purchaseReturnHdr.upsert(returnHdr)
		.then(function(data){
			
			log.info(APPMSG.POEDITSUCCESS);
			response.message 	= APPMSG.PURCHASERETURNEDITSUCCESS;
			response.data  		= returnHdr.return_id;
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
		purchaseReturnHdr.create(returnHdr)
		.then(function(data){
			log.info(APPMSG.POSAVESUCCESS);
			response.message	= APPMSG.PURCHASERETURNSAVESUCCESS;
			response.data  		= data.return_id;
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

var saveOrUpdatePurchaseReturnDetails = function(returndtls, callback) {

	log.info(fileName+'.saveOrUpdatePurchaseReturnDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	};
	console.log('returndtls  >> '+returndtls);
	

	purchaseReturnDtl.upsert(returndtls)
	.then(function(data){
		console.log('returndtls .data  >> '+data);
		
		log.info(APPMSG.PODETAILEDITSUCCESS);
		response.message	= APPMSG.PURCHASERETURNDETAILEDITSUCCESS;
		response.data  		= returndtls.return_dtlid;
		response.status 	= true;
		callback(response);
	})
	.error(function(err){
		console.log('returndtls .err  >> '+err);
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});

}

var saveOrUpdatePurchaseReturn = function(slid, PurchaseReturnHdr, purchaseReturnDetails, purchaseReturnDeleteDetailsIds,callback){
	log.info(fileName+'.saveOrUpdatePurchaseReturn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	 
	saveOrUpdatePurchaseReturnHeader(PurchaseReturnHdr, function(header){
		//if true data inserted/updated successfully else error
		
		console.log('header--->'+header);
		
		if(header.status){			
			//if slid exist, serial number generated, so need to update slnoGen table 
			if(slid != null){
			slnogenService.updateSequenceNo(slid, PurchaseReturnHdr.last_updated_dt, PurchaseReturnHdr.last_updated_by);
			}
			console.log('header.status : '+header.status);
						
			purchaseReturnDetails.forEach(function(returndtl){
				
					console.log('header.data > : '+header.data);
					
					returndtl.return_id = header.data;
					console.log('header.data.purchasereturn.return_id > : '+header.data);
					saveOrUpdatePurchaseReturnDetails(returndtl, function(result){
						console.log('result >> '+result);
					});
					
				});
				
			var purchasereturn = {
					return_id 		: header.data,
					retrun_ref_no 	: PurchaseReturnHdr.retrun_ref_no
			};
			header.data =purchasereturn;
			callback(header);
		} else{
			console.log('header.status'+header.status);
			callback(header);
		}
	});
}

//Cancel, Approve and Reject service (po_hdr)
var changePurchaseReturnStatus = function(PurchaseReturnHdr, callback){
	log.info(fileName+'.changePurchaseReturnStatus');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition = "return_id='"+PurchaseReturnHdr.return_id+"'";
	getPo(condition, '', '', function(data){
		//if true data exist else error
		if(data.status){
			//if approved cannot do rejection & cancel operation else can
			if(data.data[0].status == CONSTANT.STATUSAPPROVED && (PurchaseReturnHdr.status == CONSTANT.STATUSREJECTED||PurchaseReturnHdr.status == CONSTANT.STATUSCANCELLED)){
				log.info('Purchase order is already'+CONSTANT.STATUSAPPROVED);
				response.status  	= true;
				response.message 	= 'Purchase order is already'+CONSTANT.STATUSAPPROVED;
				callback(result);
			} else
				saveOrUpdatePurchaseReturnHeader(PurchaseReturnHdr, function(result){
					if(result.status){
						
						//insert into message table when status is Pending/Cancelled/Approved/Rejected
						if(PurchaseReturnHdr.status == CONSTANT.STATUSCANCELLED || PurchaseReturnHdr.status == CONSTANT.STATUSAPPROVED || PurchaseReturnHdr.status == CONSTANT.STATUSREJECTED || PurchaseReturnHdr.status == CONSTANT.STATUSPENDING){
							var msgObj = {
									company_id 			: data.data[0].company_id 
							}
							messageService.saveMessages(msgObj, function(rslt){
								log.info(rslt);
							});
						}
						
						log.info('Purchase order is '+PurchaseReturnHdr.status);
						response.status  	= true;
						response.message 	= 'Purchase order is '+PurchaseReturnHdr.status;
						callback(result);
					} else
						callback(result);
				});
		} else
			callback(data);
	});
	
}

module.exports = {
	getPurchaseReturnHdrList	: getPurchaseReturnHdrList,
	getPurchaseReturnDtlList	: getPurchaseReturnDtlList,
	saveOrUpdatePurchaseReturn	: saveOrUpdatePurchaseReturn,
	changePurchaseReturnStatus	: changePurchaseReturnStatus
}
