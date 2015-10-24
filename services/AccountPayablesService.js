/**
 * @Filename 		: AccountPayablesService.js
 * @Description 	: To write Business Logic for t_account_payables. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 08, 2015
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
var accountpayables = require('../models/AccountPayables.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var accounts = require('../models/Accounts.js');
var commonService = require('../services/CommonService.js');

var path = require('path');
var filename=path.basename(__filename);

// To get Account Payables List based on user param
exports.getAccountPayablesDetails = function(req, res) {
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
	
	accountpayables.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getAccountPayablesDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getAccountPayablesDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.info(filename+'>>getAccountPayablesDetails>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}

// To Save Save/Update AccountPayables Details
exports.saveAccountPayables = function(req, res) {
	accountpayables.upsert({
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
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveAccountPayables>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = req.param("accpaybleid");
			res.send(response);
		}
		else{
			log.info(filename+'>>saveAccountPayables>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = req.param("accpaybleid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveAccountPayables>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}
//For Insert New record in Account Payable Table
exports.insertAccountPayables = function(companyid,storeid,entrydate,accountid,billno,billdate,grnno,invoiceamount,
		remarks,supplierid,lastupdateddt,lastupdatedby) {
	var accpay={
				company_id 				: companyid,
				store_id 				: storeid,
				entry_date 				: entrydate,
				account_id 				: accountid,
				bill_no 				: billno,
				bill_date 				: billdate,
				grn_no 					: grnno,
				invoice_amount 			: invoiceamount,
				paid_amount 			: 0,
				balance_amount 			: invoiceamount,
				remarks 				: remarks,
				prepared_by 			: null,
				actioned_by 			: null,
				status 					: 'Pending',
				last_updated_dt 		: lastupdateddt,
				last_updated_by 		: lastupdatedby
			};
	
	accounts.findOne({where:[{supplier_id:supplierid,status:'Active'}]})
	.then(function(result){
		if(result!=null){
			accpay.account_id	=	result.account_id;
			accountpayables.create(accpay).then(function(data){
			}).error(function(err){
				log.error(err);
			});
				
		}else{

			accounts.create({
				company_id 					: companyid,
				store_id 					: storeid,
				account_group 				: 'Supplier',
				account_name 				: 'Supplier-'+commonService.generateOTP(4),
				account_dt 					: entrydate,
				finance_year 				: '',
				generate_voucher_yn 		: '',
				supplier_id 				: supplierid,
				od_amoun 					: 0,
				open_balance 				: 0,
				parked_amount 				: 0,
				current_balance 			: 0,
				aproveauth 					: '',
				selfapprv_yn 				: 'N',
				remarks 					: 'Nill',
				status 						: 'Active',
				last_updated_dt 			: lastupdateddt,
				last_updated_by 			: lastupdateddt
				
			}).then(function(data){
				accpay.account_id	=	data.account_id;
				accountpayables.create(accpay).then(function(data){
				}).error(function(err){
					log.info(filename+'>>insertAccountPayables>>');
					log.error(err);
					console.log("Error--1->"+err);
				});
					
			}).error(function(err){
				log.info(filename+'>>insertAccountPayables>>');
				log.error(err);
				console.log("Error--2->"+err);
			});

		}
		
	});
}


