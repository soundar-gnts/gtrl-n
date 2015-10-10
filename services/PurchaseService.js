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
var appmsg			= require('../config/Message.js');

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
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
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
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
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
exports.savePurchaseHdrDetails = function(req, res) {
	purchasehdr.create({
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
		
	}).then(function(p){
		
		for(var i=0;i<req.param('purchasedtlslist').length;i++){
			purchasedtl.upsert({
				purchase_dtlid 			: req.param('purchasedtlslist')[i].purchasedtlid,
				purchase_id 			: p.purchase_id,
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
				
			}).error(function(err) {
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

//To Delete Purchase Detail
exports.deletePurchaseDetails = function(req, res) {
	if(req.param("purchasedtlid")!=null){
		purchasedtl.destroy({where:{
		purchase_dtlid					: req.param("purchasedtlid")		
	}}).then(function(data){
		if(data){
			log.info('Deleted Successfully.');
			response.message = 'Deleted Successfully.';
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

//To Save/Update Purchase Details
exports.savePurchaseDtls = function(req, res) {
	purchasedtl.upsert({
		purchase_dtlid 			: req.param('purchasedtlid'),
		purchase_id 			: req.param('purchaseid'),
		product_id 				: req.param('productid'),
		invoice_qty 			: req.param('invoiceqty'),
		rate 					: req.param('rate'),
		uom_id 					: req.param('uomid'),
		basic_value				: req.param('basicvalue'),
		discount_prcnt			: req.param('discountprcnt'),
		tax_id					: req.param('taxid'),
		tax_prnct				: req.param('taxprnct'),
		tax_value				: req.param('taxvalue'),
		purchase_value			: req.param('purchasevalue'),
		mrp						: req.param('mrp'),
		discount_value			: req.param('discountvalue')
		
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

