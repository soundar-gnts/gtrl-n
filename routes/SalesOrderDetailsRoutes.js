/**
 * File Name	:	SalesOrderDetailsRoutes.js
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

var soService = require('../services/SalesOrderDetailsService.js');
var Sync = require('synchronize');

module.exports = function(app, server){
	
//	app.post('/savesalesorderdatadetails', function(req, res){
//		
//		var salesOrderDetail = {
//			salesorder_dtl_id	: req.param('salesorderdtlid'),
//			salesorder_id		: req.param('salesorderid'),
//			product_id			: req.param('productid'),
//			uom_id				: req.param('uomid'),
//			rate				: req.param('rate'),
//			order_qty			: req.param('orderqty'),
//			order_value			: req.param('ordervalue'),
//			discount_prcnt		: req.param('discountprcnt'),
//			tax_ptcnt			: req.param('taxptcnt'),
//			tax_value			: req.param('taxvalue'),
//			basic_value			: req.param('basicvalue'),
//			discount_value		: req.param('discountvalue'),
//			
//		}
//		
//	});
//	var response;
//	var setParam = function(req, res, next){}
//	var s = function(req, res){
//		console.log('2');
//		
//	}
//	app.post('/getsalesorderdatadetails', function(req, res){
//
//		var condition 	= "";
//		var soDetailsId = req.param('podtlid');
//		var soId 		= req.param('poid');
//		var status		= req.param('status');
//		
//		if(soId != null)
//			condition = "salesorder_id="+soId;
//		
//		if(soDetailsId!=null)
//			if(condition === "")
//				condition = "salesorder_dtl_id='"+soDetailsId+"'";
//		
//			else
//				condition = condition+" and salesorder_dtl_id='"+soDetailsId+"'";
//		
//		if(status!=null)
//			if(condition === "")
//				condition = "status='"+status+"'";
//		
//			else
//				condition = condition+" and status='"+status+"'";
//		
//		var response = soService.getSalesOrderDetails(condition);
//		console.log('2');
//		res.send(response);
//	});
//	
//	
//	
//	app.post('/deletesalesorderdatadetails', function(req, res){
//		
//		var salesorderdtlid = req.param('salesorderdtlid');
//		var response = soService.deleteSalesOrderDetail(salesorderdtlid);
//		
//		res.send(response);
//	
//	});
	
}