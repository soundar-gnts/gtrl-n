/**
 * @Filename	:	AccountTransactionRoutes.js
 * @Description	:	To write Routing middlewares for Account Transactions related Table.
 * @Author		:	Arun Jeyaraj R	
 * @Date		:	October 17, 2015
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
var accountTransactionsService 	= require('../services/AccountTransactionsService.js');
var accounts 					= require('../models/Accounts.js');

module.exports = function(app, server) {
	
	app.post('/getaccounttransdetails', getaccounttransDetails);
	app.post('/saveaccounttrans', saveaccounttrans);
	
	// To get Account Txns List based on user param
	function getaccounttransDetails(req, res){
		var attr 				= "";
		var condition 			= "";
		var acctxnid			= req.param("acctxnid");
		var companyid			= req.param("companyid");
		var storeid				= req.param("storeid");
		var accountid			= req.param("accountid");
		var employeeid			= req.param("employeeid");
		var transtypeid 		= req.param("transtypeid");
		var refno				= req.param("refno");
		var voucherno			= req.param("voucherno");
		var linkedacctxnid		= req.param("linkedacctxnid");
		var status				= req.param("status");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : accounts, attributes : ['account_name']}];
		}
		
		if(acctxnid!=null){
			condition ="acctxn_id="+acctxnid;
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
		if(voucherno!=null){
			if(condition === ""){
				condition="voucher_no like '%"+voucherno+"%'";
			}else {
				condition=condition+" and voucher_no like '%"+voucherno+"%'";
			}
		}
		if(employeeid!=null){
			if(condition === ""){
				condition="employee_id='"+employeeid+"'";
			}else {
				condition=condition+" and employee_id='"+employeeid+"'";
			}
		}
		if(transtypeid!=null){
			if(condition === ""){
				condition="trans_type_id='"+transtypeid+"'";
			}else {
				condition=condition+" and trans_type_id='"+transtypeid+"'";
			}
		}
		if(linkedacctxnid!=null){
			if(condition === ""){
				condition="linked_acctxn_id='"+linkedacctxnid+"'";
			}else {
				condition=condition+" and linked_acctxn_id='"+linkedacctxnid+"'";
			}
		}
		if(refno!=null){
			if(condition === ""){
				condition="ref_no like '%"+refno+"%'";
			}else {
				condition=condition+" and ref_no like '%"+refno+"%'";
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
			attr=['acctxn_id','voucher_no','open_balance','trans_amount','close_balance','ref_no'];
		}
		accountTransactionsService.getaccounttransDetails(condition,attr,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update accounttxns Details
	function saveaccounttrans(req, res){
		var acctxnsobj = {
				acctxn_id				: req.param("acctxnid"),
				company_id 				: req.param("companyid"),
				store_id 				: req.param("storeid"),
				entry_date 				: req.param("entrydate"),
				value_date				: req.param("valuedate"),
				account_id 				: req.param("accountid"),
				voucher_no 				: req.param("voucherno"),
				employee_id 			: req.param("employeeid"),
				trans_type_id 			: req.param("transtypeid"),
				open_balance 			: req.param("openbalance"),
				trans_amount 			: req.param("transamount"),
				close_balance 			: req.param("closebalance"),
				payment_mode 			: req.param("paymentmode"),
				ref_no					: req.param("refno"),
				ref_date				: req.param("refdate"),
				bank_name				: req.param("bankname"),
				instrument_remark		: req.param("instrumentremark"),
				txn_remarks				: req.param("txnremarks"),
				linked_acctxn_id		: req.param("linkedacctxnid"),
				action_remarks			: req.param("actionremarks"),
				prepared_by 			: req.param("preparedby"),
				actioned_by 			: req.param("actionedby"),
				status 					: req.param("status"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby"),
				cr_dr					: req.param("crdr")
				
			};
		accountTransactionsService.saveaccounttrans(acctxnsobj,function(result){
			res.send(result);
		});
	}
	
}

