/**
 * File Name	:	PoService.js
 * Description	:	To write Business Logic For Purchase order header.
 * Author		:	Haris K.A.
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
 * 
 */

var log 	= require('../config/logger').logger;
var appMsg	= require('../config/Message.js');
var poHeader= require('../models/PoHeader.js');
var poDetail= require('../models/PoDetail.js');


//insert or update Purchase order details
exports.saveOrUpdatePo = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var purchaseOrder = {
			po_id			: req.param('poid'),
			company_id		: req.param('companyid'),
			po_no			: req.param('pono'),
			po_date			: req.param('podate'),
			store_id		: req.param('storeid'),
			supplier_id		: req.param('supplierid'),
			invoice_addr	: req.param('invoiceaddr'),
			shipping_addr	: req.param('shippingaddr'),
			po_remark		: req.param('poremark'),
			basic_total		: req.param('basictotal'),
			total_value		: req.param('totalvalue'),
			total_tax		: req.param('totaltax'),
			total_discount	: req.param('totaldiscount'),
			status 			: req.param('status'),
			last_updated_dt	: req.param('lastupdateddt'),
			last_updated_by	: req.param('lastupdatedby')
	}
	var purchaseDetails = [];
	var detailsLength = 0;
	if(req.param('purchasedetails') != null)
		detailsLength = req.param('purchasedetails').length;
	
	for(var i = 0; i < detailsLength; i++){
		var purchaseDetail = {
				po_id			: req.param('poid'),
				manufg_id		: req.param('purchasedetails')[i].manufgid,
				prod_id			: req.param('purchasedetails')[i].prodid,
				po_qty			: req.param('purchasedetails')[i].poqty,
				bal_qty			: req.param('purchasedetails')[i].balqty,
				uom_id			: req.param('purchasedetails')[i].uomid,
				rate			: req.param('purchasedetails')[i].rate,
				basic_value		: req.param('purchasedetails')[i].basicvalue,
				discount_prcnt	: req.param('purchasedetails')[i].discountprcnt,
				tax_id			: req.param('purchasedetails')[i].taxid,
				tax_prnct		: req.param('purchasedetails')[i].taxprnct,
				tax_value		: req.param('purchasedetails')[i].taxvalue,
				purchase_value	: req.param('purchasedetails')[i].purchasevalue,
				discount_value	: req.param('purchasedetails')[i].discountvalue
		}
		purchaseDetails.push(purchaseDetail);
	}
	
	if(req.param('poid')!=null){
	
		poHeader.upsert(purchaseOrder)
		.then(function(data){
			log.info(purchaseDetails.length);
			if(purchaseDetails.length>0){
				var condition = "po_id='"+req.param('poid')+"'";
				deletePoDetailsFn(condition);
			}
			
			for(var i = 0; i < purchaseDetails.length; i++){
				saveOrUpdatePoDetailsFn(purchaseDetails[i]);
			}
			log.info('Purchase order editted successfully.');
			response.message 	= 'Purchase order editted successfully.';
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
		
		poHeader.create(purchaseOrder)
		.then(function(data){
			
			for(var i = 0; i < detailsLength; i++){
				purchaseDetails[i].po_id = data.po_id;
				saveOrUpdatePoDetailsFn(purchaseDetails[i]);
			}
			log.info('Purchase order saved successfully.');
			response.message	= 'Purchase order saved successfully.';
			response.data  		= data.po_id;
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


//get all Purchase order details
exports.getPo = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	var fetchAssociation 	= "";
	var selectedAttributes 	= "";
	var condition 			= "";
	var poId 				= req.param('poid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var storeId				= req.param('storeid');
	var supplierId			= req.param('supplierid');
	
	if(req.param('fetchAssociation')=='yes'){
		fetchAssociation = [{model : poDetail}]
	}
	
	if(req.param('selectedAttributes')=='yes'){
		selectedAttributes = ['po_id']
	}
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(poId!=null)
		if(condition === "")
			condition = "t_po_hdr.po_id='"+poId+"'";
	
		else
			condition = condition+" and t_po_hdr.po_id='"+poId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(storeId!=null)
		if(condition === "")
			condition = "store_id='"+storeId+"'";
	
		else
			condition = condition+" and store_id='"+storeId+"'";
	
	if(supplierId!=null)
		if(condition === "")
			condition = "supplier_id='"+supplierId+"'";
	
		else
			condition = condition+" and supplier_id='"+supplierId+"'";
	
	poHeader.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(poDtls){
			if(poDtls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+poDtls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+poDtls.length+' results.';
				response.data 		= poDtls;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}

//Change Purchase order status.
exports.changePoStatus = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poHeader.findOne({where : {po_id : req.param('poid')}})
	.then(function(poHeaderDet){
		poHeaderDet.status = req.param('status');
		poHeaderDet.save();
		log.info('Your Order is '+req.param('status')+'.');
		response.status  	= true;
		response.message 	= 'Your Order is '+req.param('status')+'.';
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

exports.saveOrUpdatePoDetails = function(req, res){
	
}

function saveOrUpdatePoDetailsFn(purchaseDetail) {
	poDetail.upsert(purchaseDetail)
	.then(function(data){
		
	}).error(function(err){
		log.error(err);
	});
}

//get all Product details
exports.getPoDetails = function(req, res){

	var selectedAttributes 	= "";
	var condition 			= "";
	var poDetailsId 		= req.param('podtlid');
	var poId 				= req.param('poid');
	var status				= req.param('status');
	
	if(req.param('selectedAttributes')=='yes')
		selectedAttributes=['po_id','po_dtlid']
	
	if(poId != null)
		condition = "po_id="+poId;
	
	if(poDetailsId!=null)
		if(condition === "")
			condition = "po_dtlid='"+poDetailsId+"'";
	
		else
			condition = condition+" and po_dtlid='"+poDetailsId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	
	poDetail.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
		.then(function(poDetls){
			if(poDetls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+poDetls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+poDetls.length+' results.';
				response.data 		= poDetls;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}

exports.deletePoDetails = function(req, res){
	
}
	
	
function deletePoDetailsFn(condition){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poDetail.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Products removed.');
			response.status  	= true;
			response.message 	= data+' Products removed.';
		} else{
			log.info('No Product found.');
			response.status  	= true;
			response.message 	= 'No Product found.';
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