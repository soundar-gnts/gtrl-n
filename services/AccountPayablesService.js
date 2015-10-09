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

// To get Account Payables List based on user param
exports.getAccountPayablesDetails = function(req, res) {
	var condition = "";
	var accpaybleid=req.param("accpaybleid");
	var companyid=req.param("companyid");
	var storeid=req.param("storeid");
	var billno=req.param("billno");
	var status=req.param("status");
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
	
	accountpayables.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = 'No data found.';
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


