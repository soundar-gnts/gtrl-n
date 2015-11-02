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
var APPMSG		= require('../config/Message.js');
var CONSTANT	= require('../config/Constants.js');
var common		= require('../services/CommonService.js');

module.exports = function(app, server){
	
	//SalesOrder header tables
	app.post('/addtocart',					addToCartFn);
	app.post('/getsalesorderdetails', 		getSalesOrderFn);
	app.post('/getsalesorderdatadetails', 	getSalesOrderDetailsFn);
	app.post('/savesalesorderdetails',		saveOrUpdateSalesOrderFn);
	app.post('/salesorderotpverification', 	soService.salesOrderOtpVerification);
	app.post('/changesalesorderstatus', 	soService.changeSalesOrderStatus);
	
	function addToCartFn(req, res){
		
		var salesOrder = {
				customer_id			: req.param('customerid'),
				company_id			: req.param('companyid'),
				Order_value			: parseFloat(req.param('ordervalue')||'0'),
				total_qty			: req.param('totalqty'),
				status 				: req.param('status'),
				last_updated_dt		: req.param('lastupdateddt'),
				last_updated_by		: req.param('lastupdatedby'),
		}
		
		var salesDetail = {
				salesorder_dtl_id	: req.param('salesdetails')[0].salesorderdtlid,
				product_id			: req.param('salesdetails')[0].productid,
				uom_id				: req.param('salesdetails')[0].uomid,
				order_qty			: '1'
			}
		
		
		var salesDetails = [];
		salesDetails.push(salesDetail);
		var condition = "status='"+CONSTANT.STATUSCART+"' and customer_id='"+req.param('customerid')+"'";
		soService.getSalesOrder(condition, '', '', function(result){
			if(result.status){
				console.log('cart have');
				salesOrder.salesorder_id = result.data[0].salesorder_id
				soService.saveOrUpdateSalesOrder(salesOrder, salesDetails, null, function(data){
					res.send(data);
				});
			} else if(result.message == APPMSG.LISTNOTFOUNDMESSAGE){
				console.log('cart have not');
				salesOrder.otp_code			= common.generateOTP(4);
				soService.saveOrUpdateSalesOrder(salesOrder, salesDetails, null, function(data){
					res.send(data);
				});
			} else{
				res.send(result);
			}
		});
	}
	
	function getSalesOrderFn(req, res){
		
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
		
		soService.getSalesOrder(condition, selectedAttributes, fetchAssociation, function(result){
			res.send(result)
		});
		
	}
	
//SalesOrder details tables
	
	function getSalesOrderDetailsFn(req, res){
		
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
	
	function saveOrUpdateSalesOrderFn(req, res){
		
		var condition 			= "";
		
			
		var salesOrder = {
				salesorder_id		: req.param('salesorderid'),
				customer_id			: req.param('customerid'),
				total_tax			: req.param('totaltax'),
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
				shipping_mobilnum	: req.param('shippingmobilnum'),
				otp_code			: req.param('otpcode'),
				land_mark			: req.param('landmark'),
				available_hours		: req.param('availablehours')
		}
		if(req.param('ordervalue') != null)
			salesOrder.Order_value = parseFloat(req.param('ordervalue'));
		
		var salesDetails	= [];
		var salesDetailsLength	= 0;
		var salesDeleteDetailsIds	= [];
		var salesDelDetailsLength	= 0;
		
		if(req.param('salesdetails') != null)
			req.param('salesdetails').forEach(function(salesdetails){
				var salesDetail = {
						salesorder_dtl_id	: salesdetails.salesorderdtlid,
						salesorder_id		: salesOrder.salesorder_id,
						product_id			: salesdetails.productid,
						uom_id				: salesdetails.uomid,
						rate				: salesdetails.rate,
						order_qty			: salesdetails.orderqty || '1',
						order_value			: salesdetails.ordervalue,
						discount_prcnt		: salesdetails.discountprcnt,
						tax_ptcnt			: salesdetails.taxptcnt,
						tax_value			: salesdetails.taxvalue,
						basic_value			: salesdetails.basicvalue,
						discount_value		: salesdetails.discountvalue
					}
					salesDetails.push(salesDetail)
			});
		
		if(req.param('salesdeletedetails') != null)
			req.param('salesdeletedetails').forEach(function(salesdeletedetails){
				var salesDeleteDetailsId = {
						salesorder_dtl_id	: salesdeletedetails.salesorderdtlid,
					}
					salesDeleteDetailsIds.push(salesDeleteDetailsId);
			});
		
		
		
		soService.saveOrUpdateSalesOrder(salesOrder, salesDetails, salesDeleteDetailsIds, function(result){
			res.send(result);
		});
	}
	
	
	
}