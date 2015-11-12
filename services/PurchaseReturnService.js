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
var accountReceivable 			= require('../services/AccountReceivableService.js');
var productSerialCodesService 	= require('../services/ProductSerialCodesService.js');

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
	}
	//if purchase order id exist then update otherwise create poheader table 
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

var saveOrUpdatePurchaseReturnDetails = function(purchaseReturnDtl_res, callback) {

	log.info(fileName+'.saveOrUpdatePurchaseReturnDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if purchase details id exist then update otherwise create poDetail table 
	if(purchaseReturnDtl_res.return_dtlid != null){
		purchaseReturnDtl.upsert(purchaseReturnDtl_res)
		.then(function(data){
			log.info(APPMSG.PODETAILEDITSUCCESS);
			response.message	= APPMSG.PURCHASERETURNDETAILEDITSUCCESS;
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
		purchaseReturnDtl.create(purchaseReturnDtl_res)
		.then(function(data){
			log.info(APPMSG.PODETAILSAVESUCCESS);
			response.message	= APPMSG.PURCHASERETURNDETAILSAVESUCCESS;
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

var saveOrUpdatePurchaseReturn = function(PurchaseReturnHdr, purchaseReturnDetails, callback){
	log.info(fileName+'.saveOrUpdatePurchaseReturn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saveOrUpdatePurchaseReturnHeader(PurchaseReturnHdr, function(header){
		//if true data inserted/updated successfully else error
		if(header.status){			
			//if purchase details exist need to add/update in poDetail Table
			if(purchaseReturnDetails != null)
				purchaseReturnDetails.forEach(function(purchaseReturnDetail){
					purchaseReturnDetail.return_id = header.data;
					saveOrUpdatePurchaseReturnDetails(purchaseReturnDetail, function(result){
						console.log(result);
					});
				});
				
			
			callback(header);
		} else{
			console.log('header.status'+header.status);
			callback(header);
		}
	});
}
module.exports = {
	getPurchaseReturnHdrList	: getPurchaseReturnHdrList,
	getPurchaseReturnDtlList	: getPurchaseReturnDtlList,
	saveOrUpdatePurchaseReturn	: saveOrUpdatePurchaseReturn,
}
