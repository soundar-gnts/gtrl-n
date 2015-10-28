/**
 * File Name	:	SalesOrderRoutes.js
 * Description	:	To write Routing middlewares For Sales order details.
 * Author		:	Haris K.A.
 * Date			:	October 10, 2015
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

var soService	= require('../services/SalesOrderService.js');
var soDetail	= require('../models/SalesOrderDetail.js');
var product		= require('../models/Product.js');
var productImage= require('../models/ProductImage.js');

module.exports = function(app, server){
	
	//SalesOrder header tables
	app.post('/savesalesorderdetails',		saveOrUpdateSalesOrder);
	app.post('/getsalesorderdetails', 		getSalesOrder);
	app.post('/salesorderotpverification', 	soService.salesOrderOtpVerification);
	app.post('/changesalesorderstatus', 	soService.changeSalesOrderStatus);
	app.post('/checkoutotpverification', 	soService.salesOrderOtpVerification);
	app.post('/getsalesorderdatadetails', 	getSalesOrderDetails);
	
	function getSalesOrder(req, res){
		
		var fetchAssociation 	= "";
		var selectedAttributes 	= "";
		var condition 			= "";
		var soId 				= req.param('salesorderid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var storeId				= req.param('storeid');
		var salesOrderNumber	= req.param('salordrnumber');
		var otpCode				= req.param('otpcode');
		var customerId			= req.param('customerid');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{
					model : soDetail,
					include : {model : product, attributes : ['prod_name', 'prod_desc', 'prod_image', 'mrp'], include : {model : productImage, attributes : ['product_image']}}
									
			}]
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['salesorder_id','sal_ordr_number']
		}
		
		if(companyId != null)
			condition = "t_salesorder_hdr.company_id="+companyId;
		
		if(soId!=null)
			if(condition === "")
				condition = "t_salesorder_hdr.salesorder_id='"+soId+"'";
		
			else
				condition = condition+" and t_salesorder_hdr.salesorder_id='"+soId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "t_salesorder_hdr.status='"+status+"'";
		
			else
				condition = condition+" and t_salesorder_hdr.status='"+status+"'";
		
		if(storeId!=null)
			if(condition === "")
				condition = "store_id='"+storeId+"'";
		
			else
				condition = condition+" and store_id='"+storeId+"'";
		
		if(salesOrderNumber!=null)
			if(condition === "")
				condition = "sal_ordr_number='"+salesOrderNumber+"'";
		
			else
				condition = condition+" and sal_ordr_number='"+salesOrderNumber+"'";
		
		if(otpCode!=null)
			if(condition === "")
				condition = "otp_code='"+otpCode+"'";
		
			else
				condition = condition+" and otp_code='"+otpCode+"'";
		
		if(customerId!=null)
			if(condition === "")
				condition = "customer_id='"+customerId+"'";
		
			else
				condition = condition+" and customer_id='"+customerId+"'";
		
		soService.getSalesOrderFn(condition, selectedAttributes, fetchAssociation, function(result){
			res.send(result)
		});
		
	}
	
	function saveOrUpdateSalesOrder(req, res){
		
		var condition 			= "";
		
		var salesOrder = {
				salesorder_id		: req.param('salesorderid'),
				customer_id			: req.param('customerid'),
				total_tax			: req.param('totaltax'),
				Order_value			: parseFloat(req.param('ordervalue')||'0'),
				total_qty			: req.param('totalqty'),
				delivery_type		: req.param('deliverytype'),
				delivery_remark		: req.param('deliveryremark'),
				status 				: req.param('status'),
				last_updated_dt		: req.param('lastupdateddt'),
				last_updated_by		: req.param('lastupdatedby'),
				shipping_addr		: req.param('shippingaddr'),
				company_id			: req.param('companyid'),
				shipng_adrs_city	: req.param('shipngadrscity'),
				shipping_addr_state	: req.param('shippingaddrstate'),
				shipping_addr_pincde: req.param('shippingaddrpincde'),
				shipping_addr_name	: req.param('shippingaddrname'),
				exptdelv_date		: req.param('exptdelvdate'),
				shipping_mobilnum	: req.param('shippingmobilnum'),
				otp_code			: req.param('otpcode')
		}
		
		var salesDeleteDetailsIds	= [];
		var salesDelDetailsLength	= 0;
		if(req.param('salesdetails') != null){
			var salesDetail = {
					salesorder_dtl_id	: req.param('salesdetails')[0].salesorderdtlid,
					salesorder_id		: salesOrder.salesorder_id,
					product_id			: req.param('salesdetails')[0].productid,
					uom_id				: req.param('salesdetails')[0].uomid,
					rate				: req.param('salesdetails')[0].rate,
					order_qty			: req.param('salesdetails')[0].orderqty || '1',
					order_value			: req.param('salesdetails')[0].ordervalue,
					discount_prcnt		: req.param('salesdetails')[0].discountprcnt,
					tax_ptcnt			: req.param('salesdetails')[0].taxptcnt,
					tax_value			: req.param('salesdetails')[0].taxvalue,
					basic_value			: req.param('salesdetails')[0].basicvalue,
					discount_value		: req.param('salesdetails')[0].discountvalue
				}
		}
		
			
		
		if(req.param('salesdeletedetails') != null)
			salesDelDetailsLength = req.param('salesdeletedetails').length;
		
		for(var i = 0; i < salesDelDetailsLength; i++){
			var salesDeleteDetailsId = {
				salesorder_dtl_id	: req.param('salesdeletedetails')[i].salesorderdtlid,
			}
			salesDeleteDetailsIds.push(salesDeleteDetailsId);
		}
		
		var response = soService.saveOrUpdateSalesOrderFn(salesOrder, salesDetail, salesDeleteDetailsIds, res);
	}
	
	//SalesOrder details tables
	
	function getSalesOrderDetails(req, res){
		
		var fetchAssociation 	= "";
		var selectedAttributes 	= "";
		var condition 			= "";
		var soDetailsId 		= req.param('salesorderdtlid');
		var soId 				= req.param('salesorderid');
		var status				= req.param('status');
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{
					model : product, attributes : ['prod_name', 'prod_desc', 'prod_image', 'mrp'], include : {model : productImage, attributes : ['product_image']}
									
			}]
		}
		
		if(req.param('isfulllist')=='p')
			selectedAttributes=['salesorder_dtl_id','salesorder_id']
		
		if(soId != null)
			condition = "salesorder_id="+soId;
		
		if(soDetailsId!=null)
			if(condition === "")
				condition = "salesorder_dtl_id='"+soDetailsId+"'";
		
			else
				condition = condition+" and salesorder_dtl_id='"+soDetailsId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "t_salesorder_dtl.status='"+status+"'";
		
			else
				condition = condition+" and t_salesorder_dtl.status='"+status+"'";
		
		
		soService.getSalesOrderDetails(condition, selectedAttributes, fetchAssociation, function(result){
			res.send(result)
		});
	}
	
}