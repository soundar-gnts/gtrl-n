/**
 * File Name	:	PurchaseReturnService.js
 * Description	:	To write Business Logic For PurchaseReturnService.
 * Author		:	Saranya G
 * Date			:	October 09, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */
var stockLedgerService  = require('../services/StockLedgerService.js');
var accountRecevable 	= require('../models/AccountReceivables.js');
var productSerialCodes	= require('../models/ProductSerialCodes.js');
var purchaseReturnHdr 	= require('../models/PurchaseReturnHdr.js');
var purchaseReturnDtl 	= require('../models/PurchaseReturnDtl.js');

var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};


//SaveOrUpdate Purchase Return Header and Details

exports.savePurchaseReturnDetails = function(req, res){
	
	purchaseReturnHdr.upsert(
		{
			return_id			: req.param('returnid'),
			company_id			: req.param('companyid'),
			po_id 				: req.param('poid'),
			retrun_ref_no 		: req.param('retrunrefno'),
			return_date 		: req.param('returndate'),
			store_id 			: req.param('storeid'),
			supplier_id 		: req.param('supplierid'),
			amount_payble 		: req.param('amountpayble'),
			outstanding_amount 	: req.param('outstandingamount'),
			return_type 		: req.param('returntype'),
			payment_mode 		: req.param('paymentmode'),
			discount_prcnt 		: req.param('discountprcnt'),
			discount_value 		: req.param('discountvalue'),
			return_reason 		: req.param('returnreason'),
			cancel_remark 		: req.param('cancelremark'),
			status		   		: req.param('status'),
			last_updated_dt		: req.param('lastupdateddt'),
			last_updated_by		: req.param('lastupdatedby'),
		
   
		})			
		.then(function(pr){
	
				for(var i=0;i<req.param('returnlist').length;i++){
					
					purchaseReturnDtl.upsert({
						return_dtlid		: req.param('returnlist')[i].returndtlid,
						return_id			: req.param('returnlist')[i].returnid,
						company_id 			: req.param('returnlist')[i].companyid,
						product_id 			: req.param('returnlist')[i].productid,
						return_qty 			: req.param('returnlist')[i].returnqty,
						uom_id 				: req.param('returnlist')[i].uomid,
						rate 				: req.param('returnlist')[i].rate,
						basic_value 		: req.param('returnlist')[i].basicvalue,	
						discount_prcnt 		: req.param('returnlist')[i].discountprcnt,
						discount_value 		: req.param('returnlist')[i].discountvalue,
						tax_id 				: req.param('returnlist')[i].taxid,
						tax_prnct 			: req.param('returnlist')[i].taxprnct,
						tax_value 			: req.param('returnlist')[i].taxvalue,
												
				        
						})
			
			.error(function(err) {
				res.send(err);
			});
		}
		
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
		
}

//SaveOrUpdate Purchase ReturnDetails

	exports.savePurchaseReturnDtl = function(req, res){	
	
			purchaseReturnDtl.upsert({
						return_dtlid		: req.param('returndtlid'),
						return_id			: req.param('returnid'),
						company_id 			: req.param('companyid'),
						product_id 			: req.param('productid'),
						return_qty 			: req.param('returnqty'),
						uom_id 				: req.param('uomid'),
						rate 				: req.param('rate'),
						basic_value 		: req.param('basicvalue'),	
						discount_prcnt 		: req.param('discountprcnt'),
						discount_value 		: req.param('discountvalue'),
						tax_id 				: req.param('taxid'),
						tax_prnct 			: req.param('rtaxprnct'),
						tax_value 			: req.param('taxvalue')
												
				        
						})
			
						.then(function(data){
							if(data){
								log.info(' saved successfully.');
								response.message = ' Saved successfully.';
								response.status  = true;
								res.send(response);
							}
							else{
								log.info(' Updated successfully.');
								response.message = ' Updated successfully.';
								response.status  = true;
								res.send(response);
							}
							
						}).error(function(err){
							log.error(err);
							response.status  	= false;
							response.message 	= 'Internal error.';
							response.data  		= err;
							res.send(response);
						});
				}; 

// To get Purchase Return Header List 
		
		exports.getPurchaseReturnHdrList = function(req, res) {
			
			var condition 	= "";
			var returnid	=	req.param("returnid");
			var companyid	=	req.param("companyid");
			var poid		=	req.param("poid");
			var storeid		=	req.param("storeid");
			var retrunrefno	=	req.param("retrunrefno");
			var supplierid	=	req.param("supplierid");
			var status		=	req.param("status");
			
			
			if(returnid!=null){
				condition ="return_id="+returnid;
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
			
			if(retrunrefno!=null){
				if(condition === ""){
					condition="retrun_ref_no='"+retrunrefno+"'";
				}else {
					condition=condition+" and retrun_ref_no='"+retrunrefno+"'";
				}
			}
			
			if(supplierid!=null){
				if(condition === ""){
					condition="supplier_id='"+supplierid+"'";
				}else {
					condition=condition+" and supplier_id='"+supplierid+"'";
				}
			}
			
			if(status!=null){
				if(condition === ""){
					condition="status='"+status+"'";
				}else {
					condition=condition+" and status='"+status+"'";
				}
			}
			
			purchaseReturnHdr.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]})
			
			.then(function(result) {
				if(result.length === 0){
					log.info('No data found.');
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;		
					response.data  = "";		
					res.send(response);
				} else{
					
					log.info('About '+result.length+' results.');
					response.status  	= true;
					response.message 	= 'About '+result.length+' results.';
					response.data 		= result;
					res.send(response);
				}
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		}
		
		
//To get Purchase Return Detail table List 
		
		exports.getPurchaseReturnDtl = function(req, res) {
			
			var condition 	=	 "";
			var returnid	=	req.param("returnid");
			var productid	=	req.param("productid");
			var returndtlid	=	req.param("returndtlid");
			
			
			if(returndtlid!=null){
				condition ="return_dtlid="+returndtlid;
			}
			if(returnid!=null){
				if(condition === ""){
					returnid="return_id='"+returnid+"'";
				}else {
					condition=condition+" and return_id='"+returnid+"'";
				}
			}
			if(productid!=null){
				if(condition === ""){
					condition="product_id='"+productid+"'";
				}else {
					condition=condition+" and product_id='"+productid+"'";
				}
			}
				
			purchaseReturnDtl.findAll({where : [condition]})
			
			.then(function(result) {
				if(result.length === 0){
					log.info('No data found.');
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;		
					response.data  = "";		
					res.send(response);
				} else{
					
					log.info('About '+result.length+' results.');
					response.status  	= true;
					response.message 	= 'About '+result.length+' results.';
					response.data 		= result;
					res.send(response);
				}
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		}



// To UpdatePurchaseReturnHdr Status

 exports.updatePurchaseReturnStatus = function(req, res) {
			if(req.param("returnid")!=null){
				purchaseReturnHdr.upsert({
				return_id					: req.param("returnid"),
				po_id 						: req.param("poid"),
				cancel_remark 				: req.param("cancelremark"),
				return_reason 				: req.param("returnreason"),
				status 						: req.param("status"),				
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
				
			}).then(function(data){
				if(data){
					log.info('Saved Successfully.');
					response.message = 'Saved Successfully.';
					response.status  = true;
					response.data	 = "";
					res.send(response);
				}
				else{
					log.info('Updated Successfully.');
					response.message = 'Updated Successfully.';
					response.status  = true;
					response.data	 = "";
					res.send(response);
				}
				
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
			}else{
				response.status  	= false;
				response.message 	= 'JSON Error - Key Not found';
				response.data  		= "";
				res.send(response);
			}
		}
//insert or update Purchase Return details
 
 exports.saveOrUpdatePurchaseReturn = function(req, res){
 	var response = {
 			status	: Boolean,
 			message : String,
 			data	: String
 	}
 	var returnhdr = {
 			return_id			: req.param('returnid'),
			company_id			: req.param('companyid'),
			po_id 				: req.param('poid'),
			retrun_ref_no 		: req.param('retrunrefno'),
			return_date 		: req.param('returndate'),
			store_id 			: req.param('storeid'),
			supplier_id 		: req.param('supplierid'),
			amount_payble 		: req.param('amountpayble'),
			outstanding_amount 	: req.param('outstandingamount'),
			return_type 		: req.param('returntype'),
			payment_mode 		: req.param('paymentmode'),
			discount_prcnt 		: req.param('discountprcnt'),
			discount_value 		: req.param('discountvalue'),
			return_reason 		: req.param('returnreason'),
			cancel_remark 		: req.param('cancelremark'),
			status		   		: req.param('status'),
			last_updated_dt		: req.param('lastupdateddt'),
			last_updated_by		: req.param('lastupdatedby'),
			batch_no            : req.param('batchno'),
 	}
 	var returnDetails = [];
 	var detailsLength = 0;
 	
 	if(req.param('returnlist') != null)
 		
 		detailsLength = req.param('returnlist').length;
 	
 	for(var i = 0; i < detailsLength; i++){
 		var purchasereturndtl = {
 				return_dtlid		: req.param('returnlist')[i].returndtlid,
				return_id			: req.param('returnid'),
				company_id 			: req.param('returnlist')[i].companyid,
				product_id 			: req.param('returnlist')[i].productid,
				return_qty 			: req.param('returnlist')[i].returnqty,
				uom_id 				: req.param('returnlist')[i].uomid,
				rate 				: req.param('returnlist')[i].rate,
				basic_value 		: req.param('returnlist')[i].basicvalue,	
				discount_prcnt 		: req.param('returnlist')[i].discountprcnt,
				discount_value 		: req.param('returnlist')[i].discountvalue,
				tax_id 				: req.param('returnlist')[i].taxid,
				tax_prnct 			: req.param('returnlist')[i].taxprnct,
				tax_value 			: req.param('returnlist')[i].taxvalue,
 		}
 		returnDetails.push(purchasereturndtl);
 	}
 	
 	if(req.param('returnid')!=null){
 	
 		purchaseReturnHdr.upsert(returnhdr)
 		.then(function(data){ 		
 			if(returnDetails.length>0){
				var condition = "return_id='"+req.param('returnid')+"'";
				
				deletePurchaseReturnDtl(condition);
			}
			
 			for(var i = 0; i < returnDetails.length; i++){
 				saveOrUpdateRe(returnDetails[i]);
 				if(req.param("status")!=null&&req.param('status')=='Approved')
 		 		{
 		 				console.log("Approved",req.param('returnlist')[i].productid);
 		 		stockLedgerService.insertStockLedger(
 		 				req.param('returnlist')[i].productid,req.param("companyid"),req.param("storeid"),req.param("batchno"),
 		 				0,req.param('returnlist')[i].returnqty,req.param('returnlist')[i].uomid,req.param("retrunrefno"),req.param("returndate")
 		 				,req.param("cancelremark"));
 		 		}
 			}
 			if(req.param("status")!=null&&req.param("status")=='Approved'){
 				//To update account payable
 				accountRecevable.insertAccountRecevable(req.param("companyid"),req.param("storeid"),new Date(),null,req.param("invoiceno"),
 						req.param("invoicedate"),null,req.param("invoiceamount"),req.param("actionremarks"),p.supplier_id,req.param("lastupdateddt")
 						,req.param("lastupdatedby"));
 				
 				}
 			log.info('Updated Successfully.');
 			response.message 	= 'Updated Successfully.';
 			response.data  		= req.param('poid');
 			response.status  	= true;
 			res.send(response);
 			
 		})
 		.error(function(err){
 			log.error(err);
 			response.status  	= false;
 			response.message 	= 'Internal error.';
 			response.data  		= err;
 			res.send(response);
 		});
 	} else{
 	
 		purchaseReturnHdr.create(returnhdr)
 		.then(function(data){
 			
 			for(var i = 0; i < detailsLength; i++){
 				
 				returnDetails[i].return_id = data.return_id;
 			

 				saveOrUpdateRe(returnDetails[i]);
 				if(req.param("status")!=null&&req.param('status')=='Approved')
 		 		{
 		 				console.log("Approved",req.param('returnlist')[i].productid);
 		 		stockLedgerService.insertStockLedger(
 		 				req.param('returnlist')[i].productid,req.param("companyid"),req.param("storeid"),req.param("batchno"),
 		 				0,req.param('returnlist')[i].invoiceqty,req.param('returnlist')[i].uomid,req.param("retrunrefno"),req.param("returndate")
 		 				,req.param("cancelremark"));
 		 		
 				productSerialCodesService.updateProductSerialCodes(req.param("companyid"),p.purchase_id,req.param('returnlist')[i].productid,
 						req.param("storeid"),req.param("batchno"));
 		 		}
 			}
 			
 			if(req.param("status")!=null&&req.param("status")=='Approved'){
 				//To update account Receivable
 				accountRecevable.insertAccountRecevable(req.param("companyid"),req.param("storeid"),new Date(),null,req.param("invoiceno"),
 						req.param("invoicedate"),null,req.param("invoiceamount"),req.param("actionremarks"),p.supplier_id,req.param("lastupdateddt")
 						,req.param("lastupdatedby"));
 				
 				}
 			log.info('Saved successfully.');
 			response.message	= 'Saved successfully.';
 			response.data  		= data.return_id;
 			response.status 	= true;
 			res.send(response);
 		})
 		.error(function(err){
 			log.error(err);
 			response.status  	= false;
 			response.message 	= 'Internal error.';
 			response.data  		= err;
 			res.send(response);
 		});
 		
 		
 	}
 	

 }
 function saveOrUpdateRe(purchasereturndtl) {
	 console.log(purchasereturndtl);
	 purchaseReturnDtl.upsert(purchasereturndtl)
	 
		.then(function(data){
			
		}).error(function(err){
			log.error(err);
		});
	}
 
 function deletePurchaseReturnDtl(condition){
		var response = {
				status	: Boolean,
				message : String,
				data	: String
		}
		purchaseReturnDtl.destroy({where : [condition]})
		.then(function(data){
			
			if(data >= '1'){
				log.info(data+' Removed.');
				response.status  	= true;
				response.message 	= data+' Removed removed.';
			} else{
				log.info('No data found.');
				response.status  	= true;
				response.message 	= 'No data found.';
			}
			return response;
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			return response;
		});
	}
 
 
 
 
 
 
 
