/**
 * @Filename	:	PurchaseRoutes.js
 * @Description	:	To write Routing middlewares for Purchase related Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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

var purchasehdr 				= require('../models/PurchaseHdr.js');
var purchasedtl 				= require('../models/PurchaseDtl.js');
var product						= require('../models/Product.js');
var supplier					= require('../models/Supplier.js');
var poDetail					= require('../models/PoDetail.js');
var response 					= {
									status	: Boolean,
									message : String,
									data	: String
								 };

var purchaseService 			= require('../services/PurchaseService.js');
var path 						= require('path');
var filename					= path.basename(__filename);
var log 						= require('../config/logger').logger;
var messagesService 			= require('../services/MessagesService.js');
var config 						= require('../config/config.js');

module.exports = function(app, server) {
	//For purchase header
	app.post('/getpurchasehdrdetails',	getPurchaseHdrDetails);
	app.post('/getpurchasedetails',		getPurchaseDetails);
	app.post('/savepurchasehdrdetails', savePurchaseHdrDetails);
	app.post('/updatepurchasestatus',	updatePurchaseStatus);
	
	//For get purchase header based on user param
	function getPurchaseHdrDetails(req, res){
		var fetchAssociation	= "";
		var selectedAttributes 	= "";
		var condition 			= "";
		var purchaseid			= req.param("purchaseid");
		var companyid			= req.param("companyid");
		var poid				= req.param("poid");
		var storeid				= req.param("storeid");
		var invoiceno			= req.param("invoiceno");
		var batchno				= req.param("batchno");
		var supplierid			= req.param("supplierid");
		var grntype				= req.param("grntype");
		var paymentmode			= req.param("paymentmode");
		var status				= req.param("status");
		if(purchaseid!=null){
			condition ="t_purchase_hdr.purchase_id="+purchaseid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="t_purchase_hdr.company_id='"+companyid+"'";
			}else {
				condition=condition+" and t_purchase_hdr.company_id='"+companyid+"'";
			}
		}
		if(poid!=null){
			if(condition === ""){
				condition="t_purchase_hdr.po_id='"+poid+"'";
			}else {
				condition=condition+" and t_purchase_hdr.po_id='"+poid+"'";
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
				condition="t_purchase_hdr.status='"+status+"'";
			}else {
				condition=condition+" and t_purchase_hdr.status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			selectedAttributes=['purchase_id','po_id','invoice_no','invoice_amount'];
		}
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : purchasedtl, include : [{model : product, attributes : ['prod_code', 'prod_name']},{model : poDetail, attributes : ['po_qty']}]},
				{model : supplier, attributes : ['supplier_code','supplier_id']}
			];
		}
		
		purchaseService.getPurchaseHdrDetails(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	//For get purchase details
	function getPurchaseDetails(req, res){
		
		var condition = "";
		var selectedAttributes = "";
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
		purchaseService.getPurchaseDetails(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	//For save purchsase header and details
	function savePurchaseHdrDetails(req, res){
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
				tax_value 					: req.param("taxvalue"),
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
	 		req.param('purchasedtlslist').forEach(function(purchasedetail){
	 			var purchaseDtl = {
		 				po_dtlid				: purchasedetail.podtlid,
		 				purchase_dtlid 			: purchasedetail.purchasedtlid,
						purchase_id 			: req.param("purchaseid"),
						product_id 				: purchasedetail.productid,
						invoice_qty 			: purchasedetail.invoiceqty,
						rate 					: purchasedetail.rate,
						uom_id 					: purchasedetail.uomid,
						basic_value				: purchasedetail.basicvalue,
						discount_prcnt			: purchasedetail.discountprcnt,
						tax_id					: purchasedetail.taxid,
						tax_prnct				: purchasedetail.taxprnct,
						tax_value				: purchasedetail.taxvalue,
						purchase_value			: purchasedetail.purchasevalue,
						mrp						: purchasedetail.mrp,
						discount_value			: purchasedetail.discountvalue,
						// in addition
						eanserialno				: purchasedetail.eanserialno,
						storeserialno			: purchasedetail.storeserialno
		 		}
		 		purchaseDetails.push(purchaseDtl);
	 		});
	
	 	if(req.param("purchaseid")==null){
	 		purchaseService.savePurchaseHdrDetails(purchasehdrdtl, purchaseDetails, function(response){
				res.send(response);
			});
	 	}else{	 	
	 	purchasehdr.findOne({where:[{purchase_id:req.param("purchaseid")}]})
		.then(function(result){
			console.log("result.status-->"+result.status);
			log.info(filename+'>> savePurchaseHdrDetails >> Current Status-->'+result.status);
			if(result.status!=null&&result.status=='Approved'){
				
				response.status  	= false;
				response.message 	= 'Once approved, '+req.param("status")+' not possible';
				response.data 		= req.param("purchaseid");
				res.send(response);
			}else{
				purchaseService.savePurchaseHdrDetails(purchasehdrdtl, purchaseDetails, function(response){
								
					//For Sent a Message
					if(req.param("status")!=null&&req.param("status")!='Draft'){
						var messageobj={	
								company_id 				: req.param("companyid"),
								msg_type 				: 'N',
								msg_sender 				: config.PURCHASE_EMAIL,
								msg_receivers 			: config.PURCHASE_EMAIL,
								msg_subject 			: 'Reg - Purchase - '+req.param("status"),
								msg_body 				: 'Purchase Ref No : '+req.param("invoiceno")+'\nStatus :'+req.param("status"),
								client_ip 				: req.connection.remoteAddress,
								user_id 				: req.param("userid"),
								msg_status 				: 'Pending',
								msg_sent_dt 			: new Date()
							};
						messagesService.saveMessages(messageobj, function(result){
						});
					}
					res.send(response);
				});
			}
		});
	 	}
	 	
		
	}
	
	//For Update Purchase Header Status
	function updatePurchaseStatus(req, res){
		var purchaseHeader = {
				purchase_id					: req.param("purchaseid"),
				po_id 						: req.param("poid"),
				cancel_remark 				: req.param("cancelremark"),
				status 						: req.param("status"),
				action_remarks 				: req.param("actionremarks"),
				actioned_by 				: req.param("actionedby"),
				actioned_dt 				: req.param("actioneddt"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
		}
		purchaseService.updatePurchaseStatus(purchaseHeader, function(response){
			res.send(response);
		});
	}
	
}

