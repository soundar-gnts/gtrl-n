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
var slnogen = require('../models/SlnoGen.js');


//insert or update Purchase order details
exports.saveOrUpdatePo = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var purchaseDetails			= [];
	var detailsLength			= 0;
	var purchaseDeleteDetailsIds= [];
	var purchaseDelDetailsLength= 0;
	
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
	
	if(req.param('purchasedetails') != null)
		detailsLength = req.param('purchasedetails').length;
	
	for(var i = 0; i < detailsLength; i++){
		var purchaseDetail = {
				po_id			: req.param('poid'),
				po_dtlid		: req.param('purchasedetails')[i].podtlid,
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
	
	if(req.param('purchasedeletedetails') != null)
		purchaseDelDetailsLength = req.param('purchasedeletedetails').length;
	
	for(var i = 0; i < purchaseDelDetailsLength; i++){
		var purchaseDeleteDetailsId = {
			po_dtlid	: req.param('purchasedeletedetails')[i].podtlid,
		}
		purchaseDeleteDetailsIds.push(purchaseDeleteDetailsId);
	}
	
	if(req.param('poid')!=null){
	
		poHeader.upsert(purchaseOrder)
		.then(function(data){

			log.info(purchaseDeleteDetailsIds.length+' Purchase detail is going to remove.');
			log.info(purchaseDetails.length+' Purchase detail is going to update');
			
			//delete sales details from purchase order details table.
			for(var i = 0; i < purchaseDeleteDetailsIds.length; i++)
				deletePoDetailsFn("po_dtlid='"+purchaseDeleteDetailsIds[i].po_dtlid+"'");
			
			//update/save new purchase details into purchase order details table.
			for(var i = 0; i < purchaseDetails.length; i++)
				saveOrUpdatePoDetailsFn(purchaseDetails[i]);
			
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
		
		slnogen.findOne({ where : {ref_key : 'PO_NO'}})
		.then(function(slno){
			if(!slno){
				
			} else{
				purchaseOrder.po_no = slno.prefix_key+slno.prefix_cncat+slno.suffix_key+slno.suffix_cncat+slno.curr_seqno;
				
				poHeader.create(purchaseOrder)
				.then(function(data){
					slno.last_seqno = slno.curr_seqno;
					slno.curr_seqno = slno.curr_seqno+1;
					slno.save();
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
		}).error(function(err){
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
	
	if(req.param('fetchassociation')=='yes'){
		fetchAssociation = [{model : poDetail}]
	}
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['po_id','po_no']
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
		where		: [condition],
		include		: fetchAssociation,
		attributes	: selectedAttributes
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

// Cancel, Approve and Reject service (po_hdr)
exports.changePoStatus = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poHeader.findOne({where : {po_id : req.param('poid')}})
	.then(function(poHeaderDet){
		poHeaderDet.status = req.param('status');
		poHeaderDet.po_remark = req.param('poremark');
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

// insert or update purchase order details
exports.saveOrUpdatePoDetails = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var purchaseDetail = {
			po_dtlid		: req.param('podtlid'),
			po_id			: req.param('poid'),
			manufg_id		: req.param('manufgid'),
			prod_id			: req.param('prodid'),
			po_qty			: req.param('poqty'),
			bal_qty			: req.param('balqty'),
			uom_id			: req.param('uomid'),
			rate			: req.param('rate'),
			basic_value		: req.param('basicvalue'),
			discount_prcnt	: req.param('discountprcnt'),
			tax_id			: req.param('taxid'),
			tax_prnct		: req.param('taxprnct'),
			tax_value		: req.param('taxvalue'),
			purchase_value	: req.param('purchasevalue'),
			discount_value	: req.param('discountvalue')
	}
	saveOrUpdatePoDetailsFn(purchaseDetail);
	log.info('Purchase order saved successfully.');
	response.message 	= 'Purchase order saved successfully.';
	response.status  	= true;
	res.send(response);
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

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var selectedAttributes 	= "";
	var condition 			= "";
	var poDetailsId 		= req.param('podtlid');
	var poId 				= req.param('poid');
	var status				= req.param('status');
	
	if(req.param('isfulllist')=='yes')
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
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition = "po_dtlid='"+req.param('podtlid')+"'";
	deletePoDetailsFn(condition);
	log.info(data+' Product removed.');
	response.status  	= true;
	response.message 	= data+' Product removed.';
	res.send(response)
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


//For update balance qty
exports.updatePODetailBalanceQty=function(poid,prodid,qty,mode){
	poDetail.findOne({where:[{po_id:poid,prod_id:prodid}]})
	.then(function(result){
		if(result!=null){
			var balqty=0;
			if(result.bal_qty!=null){
				balqty=result.bal_qty;
			}
			if(mode=='DELETE'){
				balqty = balqty-qty;
			}else{
				balqty = balqty+qty;
			}
			poDetail.update({bal_qty:balqty},{where : {po_dtlid:result.po_dtlid}}).error(function(err){
				
			});
			
		}
	});
	
	
	
}

