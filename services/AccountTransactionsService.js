/**
 * @Filename 		: AccountTransactionsService.js
 * @Description 	: To write Business Logic for t_account_txns. 
 * @Author 			: Arun Jeyaraj R 
 * @Date 			: October 17, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var accounttxns = require('../models/AccountTransactions.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var path = require('path');
var filename=path.basename(__filename);

// To get Account Txns List based on user param
exports.getaccounttransDetails = function(req, res) {
	var attr 			= "";
	var condition 		= "";
	var acctxnid		=req.param("acctxnid");
	var companyid		=req.param("companyid");
	var storeid			=req.param("storeid");
	var accountid		=req.param("accountid");
	var employeeid		=req.param("employeeid");
	var transtypeid 	=req.param("transtypeid");
	var refno			=req.param("refno");
	var voucherno		=req.param("voucherno");
	var linkedacctxnid	=req.param("linkedacctxnid");
	var status			=req.param("status");
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
	
	accounttxns.findAll({where : [condition],attributes: attr,order: [['last_updated_dt', 'DESC']]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getaccounttransDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getaccounttransDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.info(filename+'>>getaccounttransDetails>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}




// To Save Save/Update accounttxns Details
exports.saveaccounttrans = function(req, res) {
	accounttxns.upsert({
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
		last_updated_by 		: req.param("lastupdatedby")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveaccounttxns>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = req.param("acctxnid");
			res.send(response);
		}
		else{
			log.info(filename+'>>saveaccounttxns>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = req.param("acctxnid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveaccounttxns>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}

