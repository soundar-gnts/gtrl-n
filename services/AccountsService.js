/**
 * @Filename 		: AccountsService.js
 * @Description 	: To write Business Logic for t_accounts. 
 * @Author 			: SOUNDAR C 
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
var accounts = require('../models/Accounts.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};

// To get Account List based on user param
exports.getAccountsDetails = function(req, res) {
	var condition = "";
	var accountid=req.param("accountid");
	var companyid=req.param("companyid");
	var storeid=req.param("storeid");
	var accountname=req.param("accountname");
	var accountgroup=req.param("accountgroup");
	var status=req.param("status");
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
	
	accounts.findAll({where : [condition]}).then(function(result) {
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




// To Save Save/Update Account Details
exports.saveAccounts = function(req, res) {
	accounts.upsert({
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
//To Delete Account Detail
exports.deleteAccountDetails = function(req, res) {
	if(req.param("accountid")!=null){
		accounts.destroy({where:{
		account_id					: req.param("accountid")		
	}}).then(function(data){
		if(data){
			log.info('Deleted Successfully.');
			response.message = 'Deleted Successfully.';
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
	}else{
		response.status  	= false;
		response.message 	= 'JSON Error - Key Not found';
		response.data  		= "";
		res.send(response);
	}
}