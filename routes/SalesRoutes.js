/**
 * File Name	:	SalesRoutes.js
 * Description	:	To write Routing middlewares For Sales details.
 * Author		:	Haris K.A.
 * Date			:	October 17, 2015
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

var salesService	= require('../services/SalesService.js');
var saleDtl			= require('../models/SaleDtl.js');
var CONSTANT		= require('../config/Constants.js');

var slnogenService	= require('../services/SlnoGenService.js');

module.exports = function(app, server){
	
	//header tables
	app.post('/getsalesdetails', 	getSales);
	app.post('/getsalesdatadetails',getSalesDetails);
	app.post('/savesalesdetails',	saveOrUpdateSales);
	
	// slaes delivery details table
	app.post('/getsalesdeliverydetails',		getSalesDeliveryDetails);
	app.post('/savesalesdeliverydetails',		saveOrUpdateSalesDeliveryDetails);
	
	function getSales(req, res){
		
		var fetchAssociation 	= "";
		var selectedAttributes 	= "";
		var condition 			= "";
		var saleId 				= req.param('saleid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var storeId				= req.param('storeid');
		var billNo				= req.param('billno');
		var customerId			= req.param('customerid');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : saleDtl}]
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['sale_id','bill_no']
		}
			
		if(companyId != null)
			condition = "company_id="+companyId;
		
		if(saleId!=null)
			if(condition === "")
				condition = "sale_id='"+saleId+"'";
			
			else
				condition = condition+" and sale_id='"+saleId+"'";
			
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
			
		if(billNo!=null)
			if(condition === "")
				condition = "bill_no='"+billNo+"'";
			
			else
				condition = condition+" and sal_ordr_number='"+billNo+"'";
			
		if(customerId!=null)
			if(condition === "")
				condition = "customer_id='"+customerId+"'";
			
			else
				condition = condition+" and customer_id='"+customerId+"'";
			
		salesService.getSalesFn(condition, fetchAssociation, selectedAttributes, function(response){
			res.send(response);
		});
			
	}
	
	function getSalesDetails(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var saleDtlId 			= req.param('sale_dtlid');
		var saleId 				= req.param('sale_id');
		var status				= req.param('status');
		var batchNo				= req.param('batch_no')
		
		if(req.param('isfulllist')=='p')
			selectedAttributes=['salesorder_dtl_id','salesorder_id']
		
		if(saleId != null)
			condition = "sale_id="+saleId;
		
		if(saleDtlId!=null)
			if(condition === "")
				condition = "sale_dtlid='"+saleDtlId+"'";
		
			else
				condition = condition+" and sale_dtlid='"+saleDtlId+"'";
		
		if(batchNo!=null)
			if(condition === "")
				condition = "batch_no='"+batchNo+"'";
		
			else
				condition = condition+" and batch_no='"+batchNo+"'";
		
		
		salesService.getSalesDetailsFn(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	

	function getSalesDeliveryDetails(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var deliveryDetId		= req.param('deliverydtlid');
		var saleId				= req.param('saleid');
		var salesOrderId		= req.param('salesorderid');
		var status				= req.param('status');
		var batchNo			
		
		if(req.param('isfulllist')=='p')
			selectedAttributes=['delivery_dtlid','sale_id', 'customer_name', 'delivery_address']
		
		if(deliveryDetId != null)
			condition = "delivery_dtlid="+deliveryDetId;
		
		if(saleId!=null)
			if(condition === "")
				condition = "sale_id='"+saleId+"'";
		
			else
				condition = condition+" and sale_id='"+saleId+"'";
		
		if(salesOrderId!=null)
			if(condition === "")
				condition = "salesorder_id='"+salesOrderId+"'";
		
			else
				condition = condition+" and salesorder_id='"+salesOrderId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		
		salesService.getSalesDeliveryDetailsFn(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	
	function saveOrUpdateSales(req, res){
		
		var salesDetails			= [];
		var salesDetailsLength		= 0;
		var salesDeleteDetailsIds	= [];
		var salesDelDetailsLength	= 0;
				
		var sales = {
				sale_id			: req.param('saleid'),
				bill_no			: req.param('billno'),
				bill_date		: req.param('billdate'),
				store_id		: req.param('storeid'),
				sale_type		: req.param('saletype'),
				customer_id		: req.param('customerid'),
				basic_total		: req.param('basictotal'),
				total_tax		: req.param('totaltax'),
				discount_prcnt	: req.param('discountprcnt'),
				discount_value	: req.param('discountvalue'),
				bill_value		: req.param('billvalue'),
				total_qty		: req.param('totalqty'),
				paid_amount		: req.param('paidamount'),
				balance_amount	: req.param('balanceamount'),
				cancel_remark	: req.param('cancelremark'),
				action_remarks	: req.param('actionremarks'),
				actioned_by		: req.param('actionedby'),
				actioned_dt		: req.param('actioneddt'),
				salesorder_id	: req.param('salesorderid'),
				company_id		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param('lastupdateddt'),
				last_updated_by	: req.param('lastupdatedby')
		}
		
		
		if(req.param('salesdetails') != null){
			log.info(req.param('salesdetails').length+' Sales detail is going to update/save');
			req.param('salesdetails').forEach(function(sDetail){
				var salesDetail = {
						sale_dtlid			: req.param('salesdetails')[i].saledtlid,
						sale_id				: req.param('saleid'),
						product_id			: req.param('salesdetails')[i].productid,
						sold_qty			: req.param('salesdetails')[i].soldqty,
						uom_id				: req.param('salesdetails')[i].uomid,
						return_qty			: req.param('salesdetails')[i].returnqty,
						rate				: req.param('salesdetails')[i].rate,
						basic_value			: req.param('salesdetails')[i].basicvalue,
						discount_prcnt		: req.param('salesdetails')[i].discountprcnt,
						tax_id				: req.param('salesdetails')[i].taxid,
						tax_prnct			: req.param('salesdetails')[i].taxprnct,
						tax_value			: req.param('salesdetails')[i].taxvalue,
						sale_value			: req.param('salesdetails')[i].salevalue,
						batch_no			: req.param('salesdetails')[i].batchno,
						salesorder_dtl_id	: req.param('salesdetails')[i].salesorderdtlid,
						discount_value		: req.param('salesdetails')[i].discountvalue
				}
				salesDetails.push(salesDetail);
			});
		}
		
		if(req.param('salesdeletedetails') != null){
			log.info(req.param('salesdeletedetails').length+' Sales detail is going to remove.');
			req.param('salesdeletedetails').forEach(function(sDelDetail){
				var salesDeleteDetailsId = {
						salesorder_dtl_id	: req.param('salesdeletedetails')[i].salesorderdtlid,
					}
					salesDeleteDetailsIds.push(salesDeleteDetailsId);
			});
		}
		
		if(sales.bill_no == null && (sales.status == CONSTANT.STATUSPENDING || sales.status == CONSTANT.STATUSBILLED)){
			var slNoCondition = {
					company_id 			: req.param('companyid'),
					ref_key 			: CONSTANT.BILL_NO,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			}
			slnogenService.getSlnoValu(slNoCondition, function(sl){
				console.log(sl);
				sales.bill_no	= sl.sno;
				salesService.saveOrUpdateSales(sl.slid, sales, salesDetails, salesDeleteDetailsIds, function(response){
					res.send(response);
				});
				
			});
		} else{
			salesService.saveOrUpdateSalesFn(null, sales, salesDetails, salesDeleteDetailsIds, function(response){
				res.send(response);
			});
		}
	}
	
	function saveOrUpdateSalesDeliveryDetails(req, res){
		var salesDeliveryDetail = {
				delivery_dtlid		: req.param('deliverydtlid'),
				sale_id				: req.param('saleid'),
				cust_id				: req.param('custid'),
				customer_name		: req.param('customername'),
				delivery_address	: req.param('deliveryaddress'),
				city_id				: req.param('cityid'),
				landmark			: req.param('landmark'),
				mobile_no			: req.param('mobileno'),
				plan_delivery_dt	: req.param('plandeliverydt'),
				plan_delivery_time	: req.param('plandeliverytime'),
				deli_employee_id	: req.param('deliemployeeid'),
				exp_delivery_dt		: req.param('expdeliverydt'),
				exp_delivery_time	: req.param('expdeliverytime'),
				act_delivery_dt		: req.param('actdeliverydt'),
				act_delivery_time	: req.param('actdeliverytime'),
				receiver_name		: req.param('receivername'),
				receiver_phone		: req.param('receiverphone'),
				receiver_signature	: req.param('receiversignature'),
				status				: req.param('status'),
				undeliver_reason	: req.param('undeliverreason'),
				remarks				: req.param('remarks'),
				post_code			: req.param('postcode'),
				salesorder_id		: req.param('salesorderid')
		}
		
		salesService.saveOrUpdateSalesDeliveryDetailsFn(salesDeliveryDetail, function(response){
			res.send(response)
		});
	}
	
	
}