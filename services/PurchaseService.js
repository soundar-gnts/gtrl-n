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
 * 
 * 
 */
var slnogenService 	= require('../services/SlnoGenService.js');
var purchasehdr = require('../models/PurchaseHdr.js');
var purchasedtl = require('../models/PurchaseDtl.js');
var log = require('../config/logger').logger;
var slnogenService 	= require('../services/SlnoGenService.js');

var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

var stockLedgerService = require('../services/StockLedgerService.js');
var accountPayablesService = require('../services/AccountPayablesService.js');
var productSerialCodesService = require('../services/ProductSerialCodesService.js');
var poService = require('../services/PoService.js');
var salesService = require('../services/SalesService.js');

var path = require('path');
var filename=path.basename(__filename);

// To get Purchase Header List based on user param
exports.getPurchaseHdrDetails = function(req, res) {
	var attr 			= "";
	var condition 		= "";
	var purchaseid		= req.param("purchaseid");
	var companyid		= req.param("companyid");
	var poid			= req.param("poid");
	var storeid			= req.param("storeid");
	var invoiceno		= req.param("invoiceno");
	var batchno			= req.param("batchno");
	var supplierid		= req.param("supplierid");
	var grntype			= req.param("grntype");
	var paymentmode		= req.param("paymentmode");
	var status			= req.param("status");
	if(purchaseid!=null){
		condition ="purchase_id="+purchaseid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(poid!=null){
		if(condition === ""){
			condition="po_id='"+poid+"'";
		}else {
			condition=condition+" and po_id='"+poid+"'";
		}
	}
	if(storeid!=null){
		if(condition === ""){
			condition="store_id='"+storeid+"'";
		}else {
			condition=condition+" and store_id='"+storeid+"'";
		}
	}
	
	if(invoiceno!=null){
		if(condition === ""){
			condition="invoice_no='"+invoiceno+"'";
		}else {
			condition=condition+" and invoice_no='"+invoiceno+"'";
		}
	}
	if(batchno!=null){
		if(condition === ""){
			condition="batch_no='"+batchno+"'";
		}else {
			condition=condition+" and batch_no='"+batchno+"'";
		}
	}
	
	if(supplierid!=null){
		if(condition === ""){
			condition="supplier_id='"+supplierid+"'";
		}else {
			condition=condition+" and supplier_id='"+supplierid+"'";
		}
	}
	if(grntype!=null){
		if(condition === ""){
			condition="grn_type='"+grntype+"'";
		}else {
			condition=condition+" and grn_type='"+grntype+"'";
		}
	}
	if(paymentmode!=null){
		if(condition === ""){
			condition="payment_mode='"+paymentmode+"'";
		}else {
			condition=condition+" and payment_mode='"+paymentmode+"'";
		}
	}
	
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['purchase_id','po_id','invoice_no','invoice_amount'];
	}
	
	purchasehdr.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPurchaseHdrDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getPurchaseHdrDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}
//To get Purchase Detail table List based on user param
exports.getPurchaseDetails = function(req, res) {
	var condition = "";
	var purchasedtlid=req.param("purchasedtlid");
	var purchaseid=req.param("purchaseid");
	var productid=req.param("productid");
	if(purchasedtlid!=null){
		condition ="purchase_dtlid="+purchasedtlid;
	}
	if(purchaseid!=null){
		if(condition === ""){
			condition="purchase_id='"+purchaseid+"'";
		}else {
			condition=condition+" and purchase_id='"+purchaseid+"'";
		}
	}
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	
	purchasedtl.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getPurchaseDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getPurchaseDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}
//insert or update Purchase Return details

exports.savePurchaseHdrDetails = function(req, res){
		var refkey = 'BILL_NO';
	 	var response = {
				 		status	: Boolean,
				 		message : String,
				 		data	: String				 			
	 					}
	 	
	 	var purchasehdrdtl 	 = { 		
	 			
	 			purchase_id					: req.param("purchaseid"),
				po_id 						: req.param("poid"),
				company_id 					: req.param("companyid"),
				invoice_no 					: req.param("invoiceno"),
				invoice_date 				: req.param("invoicedate"),
				store_id 					: req.param("storeid"),
				document_type 				: req.param("documenttype"),
				batch_no 					: req.param("batchno"),
				supplier_id 				: req.param("supplierid"),
				payment_date 				: req.param("paymentdate"),
				invoice_amount 				: req.param("invoiceamount"),
				outstanding_amount 			: req.param("outstandingamount"),
				grn_type 					: req.param("grntype"),
				payment_mode 				: req.param("paymentmode"),
				discount_prcnt 				: req.param("discountprcnt"),
				discount_value 				: req.param("discountvalue"),
				cancel_remark 				: req.param("cancelremark"),
				status 						: req.param("status"),
				action_remarks 				: req.param("actionremarks"),
				actioned_by 				: req.param("actionedby"),
				actioned_dt 				: req.param("actioneddt"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
	 						}
	 	
	 	var purchaseDetails = [];
	 	var detailsLength = 0;	
	 	
	 	if(req.param('purchasedtlslist') != null)
		
		detailsLength = req.param('purchasedtlslist').length;
	
	 	for(var i = 0; i < detailsLength; i++){
		
	 		var purchasedetails = {
	 				
	 				purchase_dtlid 			: req.param('purchasedtlslist')[i].purchasedtlid,
					purchase_id 			: req.param("purchaseid"),
					product_id 				: req.param('purchasedtlslist')[i].productid,
					invoice_qty 			: req.param('purchasedtlslist')[i].invoiceqty,
					rate 					: req.param('purchasedtlslist')[i].rate,
					uom_id 					: req.param('purchasedtlslist')[i].uomid,
					basic_value				: req.param('purchasedtlslist')[i].basicvalue,
					discount_prcnt			: req.param('purchasedtlslist')[i].discountprcnt,
					tax_id					: req.param('purchasedtlslist')[i].taxid,
					tax_prnct				: req.param('purchasedtlslist')[i].taxprnct,
					tax_value				: req.param('purchasedtlslist')[i].taxvalue,
					purchase_value			: req.param('purchasedtlslist')[i].purchasevalue,
					mrp						: req.param('purchasedtlslist')[i].mrp,
					discount_value			: req.param('purchasedtlslist')[i].discountvalue
	 		}
	 		purchaseDetails.push(purchasedetails);
	 	}
	 	if(req.param("status")!='Deleted'){
				 	if(req.param('purchaseid')!=null){
				 		
				 		purchasehdr.upsert(purchasehdrdtl)
				 		.then(function(data){ 		
			 			
			 			for(var i = 0; i < purchaseDetails.length; i++){
			 							
			 				saveOrUpdatePurchase(purchaseDetails[i]);
			 				
			 				if(req.param("status")!=null&&req.param('status')=='Approved')
			 		 		{
			 					//To update stock ledger and summary
			 					stockLedgerService.insertStockLedger(
			 							req.param('purchasedtlslist')[i].productid,req.param("companyid"),req.param("storeid"),req.param("batchno"),
			 							req.param('purchasedtlslist')[i].invoiceqty,0,req.param('purchasedtlslist')[i].uomid,req.param("invoiceno"),
			 							req.param("invoicedate"),"Purchase Goods -Invoice Number : "+req.param("invoiceno")+'-'+req.param("actionremarks"));
			 					//To Insert Row in product Serail Codes
			 					productSerialCodesService.insertProductSerialCodes(req.param("companyid"),req.param("purchaseid"),req.param('purchasedtlslist')[i].productid,
			 							req.param("storeid"),req.param("batchno"),req.param('purchasedtlslist')[i].eanserialno,
			 							req.param('purchasedtlslist')[i].storeserialno);
			 					
			 					//For Update balance qty in Purchase order details.
			 					poService.updatePODetailBalanceQty(req.param("poid"),req.param('purchasedtlslist')[i].productid,
			 							req.param('purchasedtlslist')[i].invoiceqty,'DELETE');
			 		 		}
			 			}
			 			if(req.param("status")!=null&&req.param("status")=='Approved'){		 		
			 	
			 				//To update account payable
			 				accountPayablesService.insertAccountPayables(req.param("companyid"),req.param("storeid"),new Date(),null,req.param("invoiceno"),
			 						req.param("invoicedate"),req.param("purchaseid"),req.param("invoiceamount"),
			 						"Purchase Goods -Invoice Number : "+req.param("invoiceno")+'-'+req.param("actionremarks"),
			 						req.param("supplierid"),req.param("lastupdateddt"),req.param("lastupdatedby"));	
			 			
			 			}
			 			log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.UPDATEMESSAGE);
			 			response.message 	= appmsg.UPDATEMESSAGE;
			 			response.data  		= req.param('purchaseid');
			 			response.status  	= true;
			 			res.send(response);
			 			
			 		})
			 		.error(function(err){
			 			log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.INTERNALERRORMESSAGE);
			 			log.error(err);
			 			response.status  	= false;
			 			response.message 	= appmsg.INTERNALERRORMESSAGE;
			 			response.data  		= err;
			 			res.send(response);
			 		});
					} else {
						
						var slNoCondition = {
								company_id 			: req.param("companyid"),
								ref_key 			: refkey,
								autogen_yn 			: 'Y',
								status 				: 'Active'
						}
						slnogenService.getSlnoValu(slNoCondition, function(sl){
							purchasehdrdtl.invoice_no = sl.sno;
							purchasehdr.create(purchasehdrdtl).then(function(data){
					 			
					 			for(var i = 0; i < detailsLength; i++){
					 				
					 				purchaseDetails[i].purchase_id = data.purchase_id; 			

					 				saveOrUpdatePurchase(purchaseDetails[i]);
					 				
					 			}
					 		
					 			slnogenService.updateSequenceNo(sl.slid, req.param('lastupdateddt'), req.param('lastupdatedby'));
					 			log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.SAVEMESSAGE);
					 			response.message	= appmsg.SAVEMESSAGE;
					 			var purchase = {
					 					purchase_id : data.purchase_id,
										invoice_no : sl.sno
								}
					 			response.data  		= purchase;
					 			response.status 	= true;
					 			res.send(response);
					 		})
					 		.error(function(err){
					 			log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.INTERNALERRORMESSAGE);
					 			log.error(err);
					 			response.status  	= false;
					 			response.message 	= appmsg.INTERNALERRORMESSAGE;
					 			response.data  		= err;
					 			res.send(response);
					 		});
						});
						
				 		
				 	}
	 	}else{
			
	 		var noofrows = 0;
			if(req.param('purchasedtlslist')!=null){
				getSalesCount(req.param('purchasedtlslist'),req.param("batchno"), function(count){
					console.log("before if count-->"+count);
					if(count==0){

						//For Reverse 
						for(var i=0;i<req.param('purchasedtlslist').length;i++){
							
							//For Update balance qty in Purchase order details.
							poService.updatePODetailBalanceQty(req.param("poid"),req.param('purchasedtlslist')[i].productid,
									req.param('purchasedtlslist')[i].invoiceqty,'ADD');
							
							//To update stock ledger and summary
							stockLedgerService.insertStockLedger(
									req.param('purchasedtlslist')[i].productid,req.param("companyid"),req.param("storeid"),req.param("batchno"),0,
									req.param('purchasedtlslist')[i].invoiceqty,req.param('purchasedtlslist')[i].uomid,req.param("invoiceno"),
									req.param("invoicedate"),"Delete Purchase Entry -Invoice Number : "+req.param("invoiceno")+'-'+req.param("actionremarks"));
						
							//To update product serial number status as 'Deleted'
							productSerialCodesService.updateProductSerialCodes(req.param("companyid"),req.param("purchaseid")
									,req.param('purchasedtlslist')[i].productid,req.param("storeid"),req.param("batchno"),'Deleted');
							
							//for delete purchase details
							deletePurchaseDetails(req.param('purchasedtlslist')[i].purchasedtlid);
							
							noofrows++;
						    if (noofrows == req.param('purchasedtlslist').length){
						    	 //For Delete Purchase Account
									deletePurchaseHeader(req.param("purchaseid"));
						    }
				
						}
						
						log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.DELETEMESSAGE);
						response.message = appmsg.DELETEMESSAGE;
						response.status  = true;
						response.data	 = req.param("purchaseid");
						res.send(response);
										
					}else{
						log.info(filename+'>>savePurchaseHdrDetails>>'+appmsg.PRODUCTSOLDMESSAGE);
						response.message = appmsg.PRODUCTSOLDMESSAGE;
						response.status  = false;
						response.data	 = req.param("purchaseid");
						res.send(response);
					}
					
				});
			}
		}
}


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
exports.updatePurchaseStatus = function(req, res) {
	if(req.param("purchaseid")!=null){
	purchasehdr.upsert({
		purchase_id					: req.param("purchaseid"),
		po_id 						: req.param("poid"),
		cancel_remark 				: req.param("cancelremark"),
		status 						: req.param("status"),
		action_remarks 				: req.param("actionremarks"),
		actioned_by 				: req.param("actionedby"),
		actioned_dt 				: req.param("actioneddt"),
		last_updated_dt 			: req.param("lastupdateddt"),
		last_updated_by 			: req.param("lastupdatedby")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>updatePurchaseStatus>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = req.param("purchaseid");
			res.send(response);
		}
		else{
			log.info(filename+'>>updatePurchaseStatus>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = req.param("purchaseid");
			res.send(response);
		}
		
	}).error(function(err){
		log.info(filename+'>>updatePurchaseStatus>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
	}else{
		log.info(filename+'>>updatePurchaseStatus>>');
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= req.param("purchaseid");
		res.send(response);
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
//To Delete Purchase Detail
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
	 console.log(purchasedetails);
	 purchasedtl.upsert(purchasedetails)
	 
		.then(function(data){
			
		}).error(function(err){
			log.error(err);
		});
	}

