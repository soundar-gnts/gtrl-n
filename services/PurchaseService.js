/**
 * @Filename 		: PurchaseService.js
 * @Description 	: To write Business Logic for Product Purchase. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 09, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 *  0.1				12-11-2015	Haris K.A.			Po updation (Inprogress)
 * 
 */
var slnogenService 				= require('../services/SlnoGenService.js');
var CONSTANT					= require('../config/Constants.js');
var purchasehdr 				= require('../models/PurchaseHdr.js');
var purchasedtl 				= require('../models/PurchaseDtl.js');
var product						= require('../models/Product.js');
var supplier					= require('../models/Supplier.js');
var poDetail					= require('../models/PoDetail.js');

var log 						= require('../config/logger').logger;


var response 					= {
									status	: Boolean,
									message : String,
									data	: String
								};
var APPMSG						= require('../config/Message.js');

var stockLedgerService 			= require('../services/StockLedgerService.js');
var accountPayablesService 		= require('../services/AccountPayablesService.js');
var accountReceivableService 	= require('../services/AccountReceivableService.js');
var productSerialCodesService 	= require('../services/ProductSerialCodesService.js');
var poService 					= require('../services/PoService.js');
var salesService 				= require('../services/SalesService.js');

var path 						= require('path');
var filename					= path.basename(__filename);

// To get Purchase Header List based on user param
exports.getPurchaseHdrDetails = function(condition, selectedAttributes, fetchAssociation, callback) {
	
	purchasehdr.findAll({where : [condition],include : fetchAssociation,attributes: selectedAttributes}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPurchaseHdrDetails>>'+APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getPurchaseHdrDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}
//To get Purchase Detail table List based on user param
exports.getPurchaseDetails = function(condition, selectedAttributes, callback) {
		
	purchasedtl.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPurchaseDetails>>'+APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getPurchaseDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}
//insert or update Purchase details
exports.savePurchaseHdrDetails = function(purchasehdrdtl, purchaseDetails, callback){
		var refkey = CONSTANT.PUR_BILL_NO;
	 	var response = {
				 		status	: Boolean,
				 		message : String,
				 		data	: String				 			
	 					}
	 	
	 	
	 	if(purchasehdrdtl.status!='Deleted'){
	 		var purchaseOrder = {
	 				po_id : purchasehdrdtl.po_id,
	 				status: CONSTANT.STATUSINPROGRESS
	 		}
	 		poService.changePoStatus(purchaseOrder, function(){
	 			
	 		});
				 	if(purchasehdrdtl.purchase_id!=null){
				 		
				 		purchasehdr.upsert(purchasehdrdtl)
				 		.then(function(data){ 		
			 			
				 			
			 			for(var i = 0; i < purchaseDetails.length; i++){
			 							
			 				saveOrUpdatePurchase(purchaseDetails[i]);
			 				
			 				if(purchasehdrdtl.status!=null&&purchasehdrdtl.status==CONSTANT.STATUSAPPROVED)
			 		 		{
			 					//To update stock ledger and summary
			 					stockLedgerService.insertStockLedger(
			 							purchaseDetails[i].product_id,
			 							purchasehdrdtl.company_id,
			 							purchasehdrdtl.store_id,
			 							purchasehdrdtl.batch_no,
			 							purchaseDetails[i].invoice_qty,
			 							0,
			 							purchaseDetails[i].uom_id,
			 							purchasehdrdtl.invoice_no,
			 							purchasehdrdtl.invoice_date,"Purchase Goods -Invoice Number : "+purchasehdrdtl.invoice_no+'-'+purchasehdrdtl.action_remarks);
			 					//To Insert Row in product Serail Codes
			 					productSerialCodesService.insertProductSerialCodes(
			 							purchasehdrdtl.company_id,
			 							purchasehdrdtl.purchase_id,
			 							purchaseDetails[i].product_id,
			 							purchasehdrdtl.store_id,
			 							purchasehdrdtl.batch_no,
			 							purchaseDetails[i].eanserialno,
			 							purchaseDetails[i].storeserialno);
			 					
			 					//For Update balance qty in Purchase order details.
			 					poService.updatePODetailBalanceQty(purchasehdrdtl.po_id,purchaseDetails[i].product_id,
			 							purchaseDetails[i].invoice_qty,'DELETE');
			 		 		}
			 			}
			 			if(purchasehdrdtl.status!=null&&purchasehdrdtl.status==CONSTANT.STATUSAPPROVED){		 		
			 	
			 				//To update account payable
			 				accountPayablesService.insertAccountPayables(purchasehdrdtl.company_id,purchasehdrdtl.store_id,new Date(),null,purchasehdrdtl.invoice_no,
			 						purchasehdrdtl.invoice_date,purchasehdrdtl.purchase_id,purchasehdrdtl.invoice_amount,
			 						"Purchase Goods -Invoice Number : "+purchasehdrdtl.invoice_no+'-'+purchasehdrdtl.action_remarks,
			 						purchasehdrdtl.supplier_id,purchasehdrdtl.last_updated_dt,purchasehdrdtl.last_updated_by);	
			 			
			 			}
			 			log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.UPDATEMESSAGE);
			 			response.message 	= APPMSG.UPDATEMESSAGE;
			 			response.data  		= purchasehdrdtl.purchase_id;
			 			response.status  	= true;
			 			callback(response);
			 			
			 		})
			 		.error(function(err){
			 			log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.INTERNALERRORMESSAGE);
			 			log.error(err);
			 			response.status  	= false;
			 			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			 			response.data  		= err;
			 			callback(response);
			 		});
				 		
				 		
					} else {
						
						var slNoCondition = {
								company_id 			: purchasehdrdtl.company_id,
								ref_key 			: refkey,
								autogen_yn 			: 'Y',
								status 				: 'Active'
						}
						slnogenService.getSlnoValue(slNoCondition, function(sl){
							purchasehdrdtl.invoice_no = sl.sno;
							purchasehdr.create(purchasehdrdtl).then(function(data){
					 			
					 			for(var i = 0; i < purchaseDetails.length; i++){
					 				
					 				purchaseDetails[i].purchase_id = data.purchase_id; 			

					 				saveOrUpdatePurchase(purchaseDetails[i]);
					 				
					 			}
					 		
					 			slnogenService.updateSequenceNo(sl.slid, purchasehdrdtl.llast_updated_dt, purchasehdrdtl.last_updated_by);
					 			log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.SAVEMESSAGE);
					 			response.message	= APPMSG.SAVEMESSAGE;
					 			var purchase = {
					 					purchase_id : data.purchase_id,
										invoice_no : sl.sno
								}
					 			response.data  		= purchase;
					 			response.status 	= true;
					 			callback(response);
					 		})
					 		.error(function(err){
					 			log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.INTERNALERRORMESSAGE);
					 			log.error(err);
					 			response.status  	= false;
					 			response.message 	= APPMSG.INTERNALERRORMESSAGE;
					 			response.data  		= err;
					 			callback(response);
					 		});
						});
						
				 		
				 	}
	 	}else{
			
	 		var noofrows = 0;
			if(purchaseDetails!=null){
				getSalesCount(purchaseDetails,purchasehdrdtl.batch_no, function(count){
					console.log("before if count-->"+count);
					if(count==0){

						//For Reverse 
						for(var i=0;i<purchaseDetails.length;i++){
							
							//For Update balance qty in Purchase order details.
							poService.updatePODetailBalanceQty(purchasehdrdtl.po_id,purchaseDetails[i].product_id,
									purchaseDetails[i].invoice_qty,'ADD');
							
							//To update stock ledger and summary
							stockLedgerService.insertStockLedger(
									purchaseDetails[i].product_id,
									purchasehdrdtl.company_id,
									purchasehdrdtl.store_id,
									purchasehdrdtl.batch_no,
									0,
									purchaseDetails[i].invoice_qty,
									purchaseDetails[i].uom_id,
									purchasehdrdtl.invoice_no,
									purchasehdrdtl.invoice_date,"Delete Purchase Entry -Invoice Number : "+purchasehdrdtl.invoice_no+'-'+purchasehdrdtl.action_remarks);
						
							//To update product serial number status as 'Deleted'
							productSerialCodesService.updateProductSerialCodes(purchasehdrdtl.company_id,purchasehdrdtl.purchase_id
									,purchaseDetails[i].product_id,purchasehdrdtl.store_id,purchasehdrdtl.batch_no,'Deleted');
							
							//for delete purchase details
							deletePurchaseDetails(purchaseDetails[i].purchase_dtlid);
							
							noofrows++;
						    if (noofrows == purchaseDetails.length){
						    	 //For Delete Purchase Account
									deletePurchaseHeader(purchasehdrdtl.purchase_id);
								//For  Account Receivable 
								accountReceivableService.insertAccountReceivable(purchasehdrdtl.supplier_id,purchasehdrdtl.company_id,
										purchasehdrdtl.store_id,new Date(),null,purchasehdrdtl.invoice_no,purchasehdrdtl.invoice_date,
										purchasehdrdtl.invoice_amount,purchasehdrdtl.invoice_amount,'Purchase Deleted - Ref No :'+purchasehdrdtl.invoice_no,
										purchasehdrdtl.last_updated_dt,purchasehdrdtl.last_updated_by);		
									
						    }
				
						}
						
						log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.DELETEMESSAGE);
						response.message = APPMSG.DELETEMESSAGE;
						response.status  = true;
						response.data	 = purchasehdrdtl.purchase_id;
						callback(response);
										
					}else{
						log.info(filename+'>>savePurchaseHdrDetails>>'+APPMSG.PRODUCTSOLDMESSAGE);
						response.message = APPMSG.PRODUCTSOLDMESSAGE;
						response.status  = false;
						response.data	 = purchasehdrdtl.purchase_id;
						callback(response);
					}
					
				});
			}
		}
}

//Find a product SOLD or NOT
function getSalesCount(purchasedtlslist, batchNo, callback){
	var count = 0;
	for(var i=0;i<purchasedtlslist.length;i++){
		salesService.getSaleDetail(purchasedtlslist[i].productid,batchNo,function(data){
			if(data){
				count++;
				console.log("count-1-->"+count);
			}
		});
		
		
	}
	console.log("count-2-->"+count);
	callback(count);
}


//To Update Purchase Header Status
exports.updatePurchaseStatus = function(purchaseHeader, callback) {
	if(purchaseHeader.purchase_id!=null){
	purchasehdr.upsert(purchaseHeader)
	.then(function(data){
		if(data){
			log.info(filename+'>>updatePurchaseStatus>>'+APPMSG.SAVEMESSAGE);
			response.message = APPMSG.SAVEMESSAGE;
			response.status  = true;
			response.data	 = req.param("purchaseid");
			callback(response);
		}
		else{
			log.info(filename+'>>updatePurchaseStatus>>'+APPMSG.UPDATEMESSAGE);
			response.message = APPMSG.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = req.param("purchaseid");
			callback(response);
		}
		
	}).error(function(err){
		log.info(filename+'>>updatePurchaseStatus>>');
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
	}else{
		log.info(filename+'>>updatePurchaseStatus>>');
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= req.param("purchaseid");
		callback(response);
	}
}

//To Delete Purchase Detail
function deletePurchaseDetails(purchasedtlid) {
	console.log("purchasedtlid-"+purchasedtlid);
	if(purchasedtlid!=null){
		purchasedtl.destroy({where:{purchase_dtlid	: purchasedtlid	}}).then(function(data){
		
	}).error(function(err){
		console.log(err);
	});
	}
}
//To Delete Purchase Header
function deletePurchaseHeader(purchaseid) {
	console.log("purchaseid-"+purchaseid);
	if(purchaseid!=null){
		purchasehdr.destroy({where:{purchase_id	: purchaseid }}).then(function(data){
		
	}).error(function(err){
		console.log(err);
	});
	}
}

//To Save or Update PurchaseHdr Detail
function saveOrUpdatePurchase(purchasedetails) {
	 console.log("purchasedetails-->"+purchasedetails);
	 purchasedtl.upsert(purchasedetails)
	 
		.then(function(data){
			
		}).error(function(err){
			log.error(err);
		});
	}

