/**
 * File Name	:	PoRoutes.js
 * Description	:	To write Routing middlewares For Purchase order details.
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

var CONSTANT			= require('../config/Constants.js');

var poService	= require('../services/PoService.js');
var poDetail	= require('../models/PoDetail.js');
var product		= require('../models/Product.js');
var supplier	= require('../models/Supplier.js');

var slnogenService 		= require('../services/SlnoGenService.js');

module.exports = function(app, server){
	
	app.post('/getpodetails', 			getPo);
	app.post('/getpodatadetails', 		getPoDetails);
	app.post('/savepodetails',			saveOrUpdatePo);
	app.post('/changepostatus', 		changePoStatus);
	
	function getPo(req, res){
		
		var fetchAssociation 	= [{model : supplier, attributes : ['supplier_code']}];
		var selectedAttributes 	= "";
		var condition 			= "";
		var poId 				= req.param('poid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var statusprogress		= req.param('statusprogress');
		var storeId				= req.param('storeid');
		var supplierId			= req.param('supplierid');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{
									model : poDetail, include : {model : product, attributes : ['prod_code', 'prod_name']}
								},
			                    {model : supplier, attributes : ['supplier_code','supplier_id']}]
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['po_id','po_no'];
			
		}
		
		if(companyId != null)
			condition = "t_po_hdr.company_id="+companyId;
		
		if(poId!=null)
			if(condition === "")
				condition = "t_po_hdr.po_id='"+poId+"'";
		
			else
				condition = condition+" and t_po_hdr.po_id='"+poId+"'";
		
		if(status!=null || statusprogress != null)
			if(condition === "")
				condition = "t_po_hdr.status='"+status+"' or t_po_hdr.status='"+statusprogress+"'";
		
			else
				condition = condition+" and t_po_hdr.status='"+status+"' or t_po_hdr.status='"+statusprogress+"'";
		
		if(storeId!=null)
			if(condition === "")
				condition = "store_id='"+storeId+"'";
		
			else
				condition = condition+" and store_id='"+storeId+"'";
		
		if(supplierId!=null)
			if(condition === "")
				condition = "m_supplier.supplier_id='"+supplierId+"'";
		
			else
				condition = condition+" and m_supplier.supplier_id='"+supplierId+"'";
		
		poService.getPo(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	function getPoDetails(req, res){
		
		var selectedAttributes 	= ['po_id','po_dtlid'];
		var condition 			= "";
		var poDetailsId 		= req.param('podtlid');
		var poId 				= req.param('poid');
		var status				= req.param('status');
		
		if(req.param('isfulllist')=='y')
			selectedAttributes="";
		
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
		
		
		poService.getPoDetails(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	
	function saveOrUpdatePo(req, res){
		
		var purchaseDetails			= [];
		var detailsLength			= 0;
		var purchaseDeleteDetailsIds= [];
		var purchaseDelDetailsLength= 0;
		
		var purchaseOrder = {
				po_id			: req.param('poid'),
				company_id		: parseInt(req.param('companyid')),
				po_no			: req.param('pono'),
				po_date			: req.param('podate'),
				store_id		: parseInt(req.param('storeid')),
				supplier_id		: req.param('supplierid'),
				invoice_addr	: req.param('invoiceaddr'),
				shipping_addr	: req.param('shippingaddr'),
				po_remark		: req.param('poremark'),
				basic_total		: parseFloat(req.param('basictotal')),
				total_value		: parseFloat(req.param('totalvalue')),
				total_tax		: parseFloat(req.param('totaltax')),
				total_discount	: parseFloat(req.param('totaldiscount')),
				status 			: req.param('status'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby'),
				terms_condition	: req.param('termscondition'),
				payment_terms	: req.param('paymentterms'),
				payment_mode	: req.param('paymentmode'),
		}
		
		if(req.param('purchasedetails') != null)
			req.param('purchasedetails').forEach(function(poDetail){
				var purchaseDetail = {
						po_id			: req.param('poid'),
						po_dtlid		: poDetail.podtlid,
						manufg_id		: poDetail.manufgid,
						prod_id			: parseInt(poDetail.prodid),
						po_qty			: parseInt(poDetail.poqty),
						bal_qty			: parseInt(poDetail.balqty),
						uom_id			: parseInt(poDetail.uomid),
						rate			: parseFloat(poDetail.rate),
						basic_value		: parseFloat(poDetail.basicvalue),
						discount_prcnt	: parseFloat(poDetail.discountprcnt),
						tax_id			: parseInt(poDetail.taxid),
						tax_prnct		: parseFloat(poDetail.taxprnct),
						tax_value		: parseFloat(poDetail.taxvalue),
						purchase_value	: parseFloat(poDetail.purchasevalue),
						discount_value	: parseFloat(poDetail.discountvalue)
				}
				purchaseDetails.push(purchaseDetail);
			});
		console.log(';;;;;;;;;;;;;;;;;');
		console.log(purchaseOrder);
		console.log(purchaseDetails);
		if(req.param('purchasedeletedetails') != null)
			req.param('purchasedeletedetails').forEach(function(poDeleteDetails){
				var purchaseDeleteDetailsId = {
						po_dtlid	: poDeleteDetails.podtlid,
					}
					purchaseDeleteDetailsIds.push(purchaseDeleteDetailsId);
			});
		if(req.param("autogenyn") == 'y' && req.param('status') == CONSTANT.STATUSPENDING && req.param('pono') == null){
			var slNoCondition = {
					company_id 			: purchaseOrder.company_id,
					ref_key 			: CONSTANT.PURCHASE_NO,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			}
			slnogenService.getSlnoValue(slNoCondition, function(sl){
				
				purchaseOrder.po_no = sl.sno;
				poService.saveOrUpdatePo(sl.slid, purchaseOrder, purchaseDetails, purchaseDeleteDetailsIds, function(response){
					res.send(response);
				});
					
			});
		} else{
			poService.saveOrUpdatePo(null, purchaseOrder, purchaseDetails, purchaseDeleteDetailsIds, function(response){
				res.send(response);
			});
		}
		
	}
	
	function changePoStatus(req, res){
		var purchaseOrder = {
				po_id			: req.param('poid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby')
		}
		poService.changePoStatus(purchaseOrder, function(response){
			res.send(response);
		});
	}
	
}