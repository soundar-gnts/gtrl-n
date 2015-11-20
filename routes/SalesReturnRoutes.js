/**
 * File Name	:	SalesReturnRoutes.js
 * Description	:	To write Routing middlewares for Sales related Table.
 * Author		:	Anand G
 * Date			:	November 14, 2015
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

var salesReturnService		= require('../services/SalesReturnService.js');
var salesreturndtlservice	= require('../services/SalesReturnDtlService.js');
var salesreturndetail		= require('../models/SaleDtl.js');
var slnogenService 		= require('../services/SlnoGenService.js');
module.exports = function(app, server){
	 
	//Purchase Return Header		
	app.post('/getsalesreturnhdrlist', getSalesReturnHdrList);
	app.post('/getsalesReturnDtllist', getSalesReturnDtlList);
	app.post('/saveorupdatesalesreturn', saveOrUpdateSalesReturn);
	app.post('/changesalesReturnStatus', changeSalesReturnStatus);	
		
	
	//Purchase Return Details	
	//app.post('/getpurchasereturndtl', getPurchaseReturnDtl);
	
	//Get Sales Return Header List
	function getSalesReturnHdrList(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		 
		var status				= req.param('status');
		var fetchAssociation 	= "";
		var sale_id 			= req.param('saleid');
		var bill_no				= req.param('billno');
		var company_id			= req.param('companyid');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model: salesreturndetail}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['sale_id','bill_no']
		}
		
		if(sale_id != null)
			condition = "sale_id="+sale_id;
		
		if(bill_no!=null)
			if(condition === "")
				condition = "bill_no='"+bill_no+"'";
		
			else
				condition = condition+" and bill_no='"+bill_no+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		
		salesReturnService.getSalesReturnHdrList(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	// Get Sales Return Details List
	function getSalesReturnDtlList(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var sale_id 			= req.param('saleid'); 
		//var po_id 				= req.param('poid');
		var status				= req.param('status');
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model: salesreturndetail}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['sale_id','product_id','sold_qty','uom_id','return_qty','value','basic_value'];
		}
		
		if(return_id != null)
			condition = "sale_id="+sale_id;
		
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
		
		
		salesReturnService.getSalesReturnDtlList(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	// Save and Update Purchase Return Details
	function saveOrUpdateSalesReturn(req, res){
		
		var salesReturnDetails			= [];		 
		var salesReturnDeleteDetailsIds	= [];
		
		var salesReturnHdr = {
				sale_id			: req.param('saleid'),
				bill_no			: req.param('billno'),
				bill_date 		: req.param('billdate'),
				company_id 		: req.param('companyid'),
				store_id 		: req.param('storeid'),
				sale_type 		: req.param('saletype'),
				customer_id 	: req.param('customerid'),
				basic_total 	: req.param('basictotal'),
				total_tax 		: req.param('totaltax'),
				discount_prcnt 	: req.param('discountprcnt'),
				discount_value 	: req.param('discountvalue'),
				bill_value 		: req.param('billvalue'),
				total_qty 		: req.param('totalqty'),
				paid_amount 	: req.param('paidamount'),
				balance_amount 	: req.param('balanceamount'),
				cancel_remark	: req.param('cancelremark'),
				status		   	: req.param('status'),
				action_remarks	: req.param('actionremarks'),
				actioned_by		: req.param('actionedby'),
				actioned_dt		: req.param('actioneddt'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby'),
				salesorder_id   : req.param('salesorderid')
		}
		
		if(req.param('salereturnlist') != null)
			req.param('salereturnlist').forEach(function(salessaveupt){
				var salesReturnDetail = {
						sale_dtlid			: salessaveupt.saledtlid,
						sale_id				: req.param('saleid'),
						product_id 			: salessaveupt.productid,
						sold_qty 			: salessaveupt.soldqty,
						uom_id 				: salessaveupt.uomid,
						return_qty 			: salessaveupt.returnqty,
						rate 				: salessaveupt.rate,
						basic_value 		: salessaveupt.basicvalue,	
						discount_prcnt 		: salessaveupt.discountprcnt,
						discount_value		: salessaveupt.discountvalue, 
						tax_id 				: salessaveupt.taxid,
						tax_prnct 			: salessaveupt.taxprnct,
						tax_value 			: salessaveupt.taxvalue,
						sale_value			: salessaveupt.salevalue,
						batch_no			: salessaveupt.batchno,
						salesorder_dtl_id	: salessaveupt.salesorderdtlid
						
				}
				salesReturnDetails.push(salesReturnDetail);
			}); 
		
//			purchaseReturnService.saveOrUpdatePurchaseReturn(PurchaseReturnHdr, purchaseReturnDetails, function(response){
//			res.send(response);
//			});
		if(req.param('salesreturndeletedetails') != null)
			req.param('salesreturndeletedetails').forEach(function(slDeleteDetails){
				var salesreturnDeleteDetailsId = {
						sale_dtlid	: slDeleteDetails.saledtlid,
					}
					salesReturnDeleteDetailsIds.push(salesreturnDeleteDetailsId);
			});
		
		if(req.param('status') == CONSTANT.STATUSPENDING && req.param('billno') == null){
			var slNoCondition = {
					company_id 			: salesReturnHdr.company_id,
					ref_key 			: CONSTANT.BILL_NO,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			}
			slnogenService.getSlnoValu(slNoCondition, function(sl){
				
				salesReturnHdr.bill_no = sl.sno;
				console.log(sl.sno);
				salesReturnService.saveOrUpdateSalesReturn(sl.slid, salesReturnHdr, salesReturnDetails, salesReturnDeleteDetailsIds, function(response){
					res.send(response);
				});					
			});
		} else{
			salesReturnService.saveOrUpdateSalesReturn(null, salesReturnHdr, salesReturnDetails, salesReturnDeleteDetailsIds, function(response){
				res.send(response);
			});
		} 
		
	}
	
	function changeSalesReturnStatus(req, res){
		var salesReturnHdr = {
				sale_id			: req.param('saleid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby')
		}
		salesReturnService.changeSalesReturnStatus(salesReturnHdr, function(response){
		res.send(response);
		});
	}
	
}