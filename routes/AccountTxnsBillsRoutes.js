/**
 * @Filename	:	AccountTxnsBillsRoutes.js
 * @Description	:	To write Routing middlewares for Account Txns Bills Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 23, 2015
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
var accountTxnsBillsService = require('../services/AccountTxnsBillsService.js');
var accounts 				= require('../models/Accounts.js');

module.exports = function(app, server) {
	
	app.post('/getaccounttxnsbillsdetails', getAccountTxnsBillsDetails);
	app.post('/saveaccounttxnsbills', saveAccountTxnsBills);
	app.post('/deleteaccounttxnsbill', deleteAccountTxnsBill);
	
	//For delete account txns bills
	function deleteAccountTxnsBill(req, res){
		
		var txnbillid	= req.param("txnbillid");
		accountTxnsBillsService.deleteAccountTxnsBill(txnbillid,function(result){
				res.send(result);
			});
	}
	
	
	// To get Account Txns Bills List based on user param
	function getAccountTxnsBillsDetails(req, res){
		var attr 				= "";
		var condition 			= "";
		var txnbillid			= req.param("txnbillid");
		var acctxnid			= req.param("acctxnid");
		var accountid			= req.param("accountid");
		var refno				= req.param("refno");
		var status				= req.param("status");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : accounts, attributes : ['account_name']}];
		}
		
		if(txnbillid!=null){
			condition ="txnbill_id="+txnbillid;
		}
		if(acctxnid!=null){
			if(condition === ""){
				condition="acctxn_id='"+acctxnid+"'";
			}else {
				condition=condition+" and acctxn_id='"+acctxnid+"'";
			}
		}
		if(accountid!=null){
			if(condition === ""){
				condition="account_id='"+accountid+"'";
			}else {
				condition=condition+" and account_id='"+accountid+"'";
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
			attr=['txnbill_id','acctxn_id','ref_no','paid_amount'];
		}
		
		 accountTxnsBillsService.getAccountTxnsBillsDetails(condition,attr,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update Account Txns Bills Details
	function saveAccountTxnsBills(req, res){
		var billsobj ={
				txnbill_id					: req.param("txnbillid"),
				acctxn_id 					: req.param("acctxnid"),
				account_id 					: req.param("accountid"),
				ref_no 						: req.param("refno"),
				ref_date 					: req.param("refdate"),
				paid_amount 				: req.param("paidamount"),
				status 						: req.param("status")
				
			};
		 accountTxnsBillsService.saveAccountTxnsBills(billsobj,function(result){
				res.send(result);
			});
	}
}

