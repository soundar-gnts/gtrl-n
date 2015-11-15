/**
 * File Name	:	PurchaseReturnRoutes.js
 * Description	:	To write Routing middlewares For Purchase order details.
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

var CONSTANT	= require('../config/Constants.js');

var purchaseReturnService		= require('../services/PurchaseReturnService.js');
var purchasereturndtlservice	= require('../services/PurchaseReturnDtlService.js');
var purchasereturndetail		= require('../models/PurchaseReturnDtl.js');
var slnogenService 		= require('../services/SlnoGenService.js');
module.exports = function(app, server){
	 
	//Purchase Return Header		
	app.post('/getpurchasereturnhdrlist', getPurchaseReturnHdrList);
	app.post('/getPurchaseReturnDtllist', getPurchaseReturnDtlList);
	app.post('/saveorupdatepurchasereturn', saveOrUpdatePurchaseReturn);
	app.post('/changePurchaseReturnStatus', changePurchaseReturnStatus);	
		
	
	//Purchase Return Details	
	//app.post('/getpurchasereturndtl', getPurchaseReturnDtl);
	
	//Get Purchase Return Header List
	function getPurchaseReturnHdrList(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		 
		var status				= req.param('status');
		var fetchAssociation 	= "";
		var return_id 			= req.param('returnid');
		var po_id 				= req.param('poid');
		var return_ref_no		= req.param('returnRefNo');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model: purchasereturndetail}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['return_id','po_id']
		}
		
		if(return_id != null){
			condition = "return_id="+return_id;
		}
		
		if(po_id!=null){
			if(condition === ""){
				condition = "po_id='"+po_id+"'";
			}		
			else{
				condition = condition+" and po_id='"+po_id+"'";
			}
		}
		
		if(status!=null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}	
		
		purchaseReturnService.getPurchaseReturnHdrList(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	// Get Purchse Return Details List
	function getPurchaseReturnDtlList(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var return_id 			= req.param('returnid'); 
		//var po_id 				= req.param('poid');
		var status				= req.param('status');
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model: purchasereturndetail}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['return_id','product_id','return_qty','uom_id','rate','basic_value'];
		}
		
		if(return_id != null)
			condition = "return_id="+return_id;
		
		/*if(po_id!=null)
			if(condition === "")
				condition = "po_id='"+po_id+"'";
		
			else
				condition = condition+" and po_id='"+po_id+"'";*/
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		
		purchaseReturnService.getPurchaseReturnDtlList(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	// Save and Update Purchase Return Details
	function saveOrUpdatePurchaseReturn(req, res){
		
		var purchaseReturnDetails			= [];		 
		var purchaseReturnDeleteDetailsIds	= [];
		
		var PurchaseReturnHdr = {
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
				batch_no            : req.param('batchno')
		}
		
		if(req.param('returnlist') != null)
			req.param('returnlist').forEach(function(purchassaveupt){
				var purchaseReturnDetail = {
						return_dtlid		: purchassaveupt.returndtlid,
						return_id			: req.param('returnid'),
						company_id 			: purchassaveupt.companyid,
						product_id 			: purchassaveupt.productid,
						return_qty 			: purchassaveupt.returnqty,
						uom_id 				: purchassaveupt.uomid,
						rate 				: purchassaveupt.rate,
						basic_value 		: purchassaveupt.basicvalue,	
						discount_prcnt 		: purchassaveupt.discountprcnt,
						discount_value 		: purchassaveupt.discountvalue,
						tax_id 				: purchassaveupt.taxid,
						tax_prnct 			: purchassaveupt.taxprnct,
						tax_value 			: purchassaveupt.taxvalue
				}
				purchaseReturnDetails.push(purchaseReturnDetail);
			}); 
		
//			purchaseReturnService.saveOrUpdatePurchaseReturn(PurchaseReturnHdr, purchaseReturnDetails, function(response){
//			res.send(response);
//			});
		if(req.param('purchasereturndeletedetails') != null)
			req.param('purchasereturndeletedetails').forEach(function(prDeleteDetails){
				var purchasereturnDeleteDetailsId = {
						return_dtlid	: prDeleteDetails.returndtlid,
					}
					purchaseReturnDeleteDetailsIds.push(purchasereturnDeleteDetailsId);
			});
		
		if(req.param('status') == CONSTANT.STATUSPENDING && req.param('retrunrefno') == null){
			var slNoCondition = {
					company_id 			: PurchaseReturnHdr.company_id,
					ref_key 			: CONSTANT.PURCHAS_RETURN_NO,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			}
			slnogenService.getSlnoValu(slNoCondition, function(sl){
				
				PurchaseReturnHdr.retrun_ref_no = sl.sno;
				console.log(sl.sno);
				purchaseReturnService.saveOrUpdatePurchaseReturn(sl.slid, PurchaseReturnHdr, purchaseReturnDetails, purchaseReturnDeleteDetailsIds, function(response){
					res.send(response);
				});					
			});
		} else{
			purchaseReturnService.saveOrUpdatePurchaseReturn(null, PurchaseReturnHdr, purchaseReturnDetails, purchaseReturnDeleteDetailsIds, function(response){
				res.send(response);
			});
		} 
		
	}
	
	function changePurchaseReturnStatus(req, res){
		var PurchaseReturnHdr = {
				return_id			: req.param('returnid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby')
		}
		purchaseReturnService.changePurchaseReturnStatus(PurchaseReturnHdr, function(response){
		res.send(response);
		});
	}
	
}