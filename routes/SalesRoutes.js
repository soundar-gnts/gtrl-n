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

var salesService = require('../services/SalesService.js');

module.exports = function(app, server){
	
	//header tables
	app.post('/savesalesdetails',	salesService.saveOrUpdateSales);
	app.post('/getsalesdetails', 	salesService.getSales);
	app.post('/changesalesstatus', 	salesService.changeSalesStatus);
	
	//details tables
	app.post('/getsalesdatadetails',salesService.getSalesDetails);
	
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
		
		
		if(req.param('salesdetails') != null)
			salesDetailsLength = req.param('salesdetails').length;
		
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
		
		salesService.saveOrUpdateSalesFn(sales, salesDetails, salesDeleteDetailsIds, , function(response){
			
		});
	}
	
	function getSales(req, res){
		
		salesService.getSalesFn(condition, function(response){
			
		});
	}
	
	function changeSalesStatus(req, res){
		
		salesService.changeSalesStatusFn(sale_id, sales, function(response){
			
		});
	}
	
	function getSalesDetails(req, res){
		
		salesService.getSalesDetailsFn(condition, function(response){
			
		});
	}
	
}