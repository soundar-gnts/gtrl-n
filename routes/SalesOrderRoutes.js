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

module.exports = function(app, server){
	
	//SalesOrder header tables
	app.post('/savesalesorderdetails',		saveOrUpdateSalesOrder);
	app.post('/getsalesorderdetails', 		soService.getSalesOrder);
	app.post('/salesorderotpverification', 	soService.salesOrderOtpVerification);
	app.post('/changesalesorderstatus', 	soService.changeSalesOrderStatus);
		
	function saveOrUpdateSalesOrder(req, res){
		
		var salesDetails			= [];
		var detailsLength			= 0;
		var salesDeleteDetailsIds	= [];
		var salesDelDetailsLength	= 0;
				
		var salesOrder = {
				salesorder_id		: req.param('salesorderid'),
				customer_id			: req.param('customerid'),
				total_tax			: req.param('totaltax'),
				Order_value			: req.param('ordervalue'),
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
		
		
		if(req.param('salesdetails') != null)
			detailsLength = req.param('salesdetails').length;
		
		for(var i = 0; i < detailsLength; i++){
			var salesDetail = {
				salesorder_dtl_id	: req.param('salesdetails')[i].salesorderdtlid,
				salesorder_id		: req.param('salesorderid'),
				product_id			: req.param('salesdetails')[i].productid,
				uom_id				: req.param('salesdetails')[i].uomid,
				rate				: req.param('salesdetails')[i].rate,
				order_qty			: req.param('salesdetails')[i].orderqty,
				order_value			: req.param('salesdetails')[i].ordervalue,
				discount_prcnt		: req.param('salesdetails')[i].discountprcnt,
				tax_ptcnt			: req.param('salesdetails')[i].taxptcnt,
				tax_value			: req.param('salesdetails')[i].taxvalue,
				basic_value			: req.param('salesdetails')[i].basicvalue,
				discount_value		: req.param('salesdetails')[i].discountvalue
			}
			salesDetails.push(salesDetail);
		}
		
		if(req.param('salesdeletedetails') != null)
			salesDelDetailsLength = req.param('salesdeletedetails').length;
		
		for(var i = 0; i < salesDelDetailsLength; i++){
			var salesDeleteDetailsId = {
				salesorder_dtl_id	: req.param('salesdeletedetails')[i].salesorderdtlid,
			}
			salesDeleteDetailsIds.push(salesDeleteDetailsId);
		}
		
		var response = soService.saveOrUpdateSalesOrderFn(salesOrder, salesDetails, salesDeleteDetailsIds, res);
		
	}
	
	//SalesOrder details tables
	app.post('/getsalesorderdatadetails', 		soService.getSalesOrderDetails);
	
}