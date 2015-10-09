/**
 * New node file
 */
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
var purchasehdr = require('../models/PurchaseHdr.js');
var purchasedtl = require('../models/PurchaseDtl.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};

// To get Purchase Header List based on user param
exports.getPurchaseHdrDetails = function(req, res) {
	var condition = "";
	var purchaseid=req.param("purchaseid");
	var companyid=req.param("companyid");
	var poid=req.param("poid");
	var storeid=req.param("storeid");
	var invoiceno=req.param("invoiceno");
	var supplierid=req.param("supplierid");
	var status=req.param("status");
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
	
	purchasehdr.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = 'No data found.';
			response.status  = false;
			response.data	 = "";
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




// To Save/Update Purchase Details
exports.savePurchaseDetails = function(req, res) {
	purchasehdr.upsert({
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
		
}
