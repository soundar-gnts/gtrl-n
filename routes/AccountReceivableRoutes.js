/**
 * File Name	:	AccountReceivableRoutes.js
 * Description	:	To write Routing middlewares For AccountReceivableRoutes.
 * Author		:	Saranya G.
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
var accountreceivableservice = require('../services/AccountReceivableService.js');

module.exports = function(app, server){
	
	app.post('/getaccountreceivabledetails',getAccountReceivableDetails);
	app.post('/saveaccountreceivables',		saveAccountReceivables);
	
	function getAccountReceivableDetails(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var accountid			= req.param("accountid");
		var accrcbleid			= req.param("accrcbleid");
		var companyid			= req.param("companyid");
		var storeid				= req.param("storeid");
		var invoiceno			= req.param("invoiceno");
		var status				= req.param("status");
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['accrcble_id','entry_date','account_id']
		}
		
		if(accrcbleid!=null){
			condition ="accrcble_id="+accrcbleid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(accountid!=null){
			if(condition === ""){
				condition="account_id='"+accountid+"'";
			}else {
				condition=condition+" and account_id='"+accountid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(invoiceno!=null){
			if(condition === ""){
				condition="invoice_no like '%"+invoiceno+"%'";
			}else {
				condition=condition+" and invoice_no like '%"+invoiceno+"%'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		accountreceivableservice.getAccountReceivableDetails(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	
	function saveAccountReceivables(req, res){
		
		var accountReceivable = {
				accrcble_id				: req.param("accrcbleid"),
				company_id 				: req.param("companyid"),
				store_id 				: req.param("storeid"),
				entry_date 				: req.param("entrydate"),
				account_id 				: req.param("accountid"),
				invoice_no 				: req.param("invoiceno"),
				invoice_date 			: req.param("invoicedate"),	
				invoice_amount 			: req.param("invoiceamount"),
				paid_amount 			: req.param("paidamount"),
				balance_amount 			: req.param("balanceamount"),
				remarks 				: req.param("remarks"),
				prepared_by 			: req.param("preparedby"),
				actioned_by 			: req.param("actionedby"),
				status 					: req.param("status"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby")
				
			}
		accountreceivableservice.saveAccountReceivables(accountReceivable, function(response){
			res.send(response);
		});
	}
}