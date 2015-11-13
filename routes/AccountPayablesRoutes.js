/**
 * @Filename	:	AccountPayablesRoutes.js
 * @Description	:	To write Routing middlewares for Account Payables related Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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
var accountPayablesService = require('../services/AccountPayablesService.js');
module.exports = function(app, server) {
	
	app.post('/getaccountpayablesdetails', getAccountPayablesDetails);
	app.post('/saveaccountpayables', saveAccountPayables);
	
	// To get Account Payables List based on user param
	function getAccountPayablesDetails(req, res){
		var attr 			= "";
		var condition 		= "";
		var accpaybleid		=req.param("accpaybleid");
		var companyid		=req.param("companyid");
		var storeid			=req.param("storeid");
		var accountid		=req.param("accountid");
		var billno			=req.param("billno");
		var status			=req.param("status");
		if(accpaybleid!=null){
			condition ="accpayble_id="+accpaybleid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(accountid!=null){
			if(condition === ""){
				condition="account_id='"+accountid+"'";
			}else {
				condition=condition+" and account_id='"+accountid+"'";
			}
		}
		if(billno!=null){
			if(condition === ""){
				condition="bill_no like '%"+billno+"%'";
			}else {
				condition=condition+" and bill_no like '%"+billno+"%'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['accpayble_id','bill_no','invoice_amount','paid_amount','balance_amount'];
		}
		
		accountPayablesService.getAccountPayablesDetails(condition,attr,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update AccountPayables Details
	function saveAccountPayables(req, res){
		
		var accpayobj = {
				accpayble_id			: req.param("accpaybleid"),
				company_id 				: req.param("companyid"),
				store_id 				: req.param("storeid"),
				entry_date 				: req.param("entrydate"),
				account_id 				: req.param("accountid"),
				bill_no 				: req.param("billno"),
				bill_date 				: req.param("billdate"),
				grn_no 					: req.param("grnno"),
				invoice_amount 			: req.param("invoiceamount"),
				paid_amount 			: req.param("paidamount"),
				balance_amount 			: req.param("balanceamount"),
				remarks 				: req.param("remarks"),
				prepared_by 			: req.param("preparedby"),
				actioned_by 			: req.param("actionedby"),
				status 					: req.param("status"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby")
				
			};
		accountPayablesService.saveAccountPayables(accpayobj,function(result){
			res.send(result);
		});
	}
}

