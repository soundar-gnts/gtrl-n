/**
 * @Filename 		: AccountTxnsBillsService.js
 * @Description 	: To write Business Logic for Account Txns Bills. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 23, 2015
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
var accounttxnsbills = require('../models/AccountTxnsBills.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

var path = require('path');
var filename=path.basename(__filename);

// To get Account Txns Bills List based on user param
exports.getAccountTxnsBillsDetails = function(req, res) {
	var attr 			= "";
	var condition 		= "";
	var txnbillid		=req.param("txnbillid");
	var acctxnid		=req.param("acctxnid");
	var accountid		=req.param("accountid");
	var refno			=req.param("refno");
	var status			=req.param("status");
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
	
	accounttxnsbills.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getAccountTxnsBillsDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getAccountTxnsBillsDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getAccountTxnsBillsDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}




// To Save Save/Update Account Txns Bills Details
exports.saveAccountTxnsBills = function(req, res) {
	accounttxnsbills.upsert({
		txnbill_id					: req.param("txnbillid"),
		acctxn_id 					: req.param("acctxnid"),
		account_id 					: req.param("accountid"),
		ref_no 						: req.param("refno"),
		ref_date 					: req.param("refdate"),
		paid_amount 				: req.param("paidamount"),
		status 						: req.param("status")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveAccountTxnsBills>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = req.param("txnbillid");
			res.send(response);
		}
		else{
			log.info(filename+'>>saveAccountTxnsBills>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = req.param("txnbillid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveAccountTxnsBills>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}
//To Delete Account Txns Bill Detail
exports.deleteAccountTxnsBill = function(req, res) {
	if(req.param("txnbillid")!=null){
		accounttxnsbills.destroy({where:{
			txnbill_id					: req.param("txnbillid")		
	}}).then(function(data){
		if(data){
			log.info(filename+'>>deleteAccountTxnsBill>>'+appmsg.DELETEMESSAGE);
			response.message = appmsg.DELETEMESSAGE;
			response.status  = true;
			response.data	 = req.param("txnbillid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>deleteAccountTxnsBill>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("txnbillid");
			res.send(response);
	}
}


