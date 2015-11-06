/**
 * @Filename	:	AccountsRoutes.js
 * @Description	:	To write Routing middlewares for Account related Table.
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
var accountsService = require('../services/AccountsService.js');
module.exports = function(app, server) {
	
	app.post('/getaccountsdetails', getAccountsDetails);
	app.post('/saveaccounts', saveAccounts);
	app.post('/deleteaccountdetails', deleteAccountDetails);
	app.post('/savevendorcustomertxns', accountsService.saveVendorCustomerTxns);
	
	function getAccountsDetails(req, res){
		
		var selectedAttributes 	= "";
		var condition 		= "";
		var accountid		=req.param("accountid");
		var companyid		=req.param("companyid");
		var storeid			=req.param("storeid");
		var accountname		=req.param("accountname");
		var accountgroup	=req.param("accountgroup");
		var status			=req.param("status");
		if(accountid!=null){
			condition ="account_id="+accountid;
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
		if(accountname!=null){
			if(condition === ""){
				condition="account_name like '%"+accountname+"%'";
			}else {
				condition=condition+" and account_name like '%"+accountname+"%'";
			}
		}
		if(accountgroup!=null){
			if(condition === ""){
				condition="account_group='"+accountgroup+"'";
			}else {
				condition=condition+" and account_group='"+accountgroup+"'";
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
			selectedAttributes=['account_id','account_group','account_name','current_balance'];
		}
		
		accountsService.getAccountsDetails(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	
	function saveAccounts(req, res){
		
		var accounts = {
				account_id					: req.param("accountid"),
				company_id 					: req.param("companyid"),
				store_id 					: req.param("storeid"),
				account_group 				: req.param("accountgroup"),
				account_name 				: req.param("accountname"),
				account_dt 					: req.param("accountdt"),
				finance_year 				: req.param("financeyear"),
				generate_voucher_yn 		: req.param("generatevoucheryn"),
				employee_id 				: req.param("employeeid"),
				bank_id 					: req.param("bankid"),
				bank_branch_id 				: req.param("bankbranchid"),
				supplier_id 				: req.param("supplierid"),
				client_id 					: req.param("clientid"),
				acct_type_id 				: req.param("accttypeid"),
				od_amoun 					: req.param("odamount"),
				open_balance 				: req.param("openbalance"),
				parked_amount 				: req.param("parkedamount"),
				current_balance 			: req.param("currentbalance"),
				aproveauth 					: req.param("aproveauth"),
				parent_account_id 			: req.param("parentaccountid"),
				selfapprv_yn 				: req.param("selfapprvyn"),
				remarks 					: req.param("remarks"),
				status 						: req.param("status"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
				
			}
		accountsService.saveAccounts(accounts, function(response){
			res.send(response);
		});
	}
	
	function deleteAccountDetails(req, res){
		var condition = "account_id='"+req.param('accountid')+"'";
		accountsService.deleteAccountDetails(condition, function(response){
			res.send(response);
		});
	}
}

