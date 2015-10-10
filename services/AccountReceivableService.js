/**
 * @Filename 		: AccountReceivableService.js
 * @Description 	: To write Business Logic for AccountReceivableService. 
 * @Author 			: Saranya G
 * @Date 			: October 09, 2015
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
var accountreceivables  = require('../models/AccountReceivables.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response  			= {
							status	: Boolean,
							message : String,
							data	: String
							};

// To get Account Receivable List based on user param

exports.getAccountReceivableDetails = function(req, res) {
	
	var condition 		= "";
	var accountid		= req.param("accountid");
	var accrcbleid		= req.param("accrcbleid");
	var companyid		= req.param("companyid");
	var storeid			= req.param("storeid");
	var invoiceno		= req.param("invoiceno");
	var status			= req.param("status");
	
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
	
	accountreceivables.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}

// To Save Save/Update AccountReceivable Details

exports.saveAccountReceivables = function(req, res) {
	
	accountreceivables.upsert({

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
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
		
}


