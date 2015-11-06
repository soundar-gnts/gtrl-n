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
var accounts 			= require('../models/Accounts.js');
var accountreceivables  = require('../models/AccountReceivables.js');
var log 				= require('../config/logger').logger;
var appmsg				= require('../config/Message.js');
var path 				= require('path');
var filename			= path.basename(__filename);

// To get Account Receivable List based on user param
exports.getAccountReceivableDetails = function(condition, selectedAttributes, callback) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
		}
	accountreceivables.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes	: selectedAttributes})
	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getAccountReceivableDetails >>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>> getAccountReceivableDetails >>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>> getAccountReceivableDetails >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}

// To Save Save/Update AccountReceivable Details
exports.saveOrUpdateAccountReceivable = function(accountReceivable, callback) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
		}
	log.info(filename+'.saveOrUpdateAccountReceivable()');
	
	if(accountReceivable.accrcble_id != null){
		accountreceivables.upsert(accountReceivable)
		.then(function(data){
			log.info(appmsg.ACCOUNTRECEIVABLEDITSUCCESS);
			response.message 	= appmsg.ACCOUNTRECEIVABLEDITSUCCESS;
			response.status  	= true;
			response.data	 	= accountReceivable.accrcble_id;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		accountreceivables.create(accountReceivable)
		.then(function(data){
			log.info(appmsg.ACCOUNTRECEIVABLESAVESUCCESS);
			response.message 	= appmsg.ACCOUNTRECEIVABLESAVESUCCESS;
			response.status  	= true;
			response.data	 	= data.accrcble_id;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}
//For Insert New Record in Account Receivable Table
exports.insertAccountReceivable = function(supplierid,companyid,storeid,entrydate,accountid,invoiceno,
		invoicedate,invoiceamount,outstandingamount,remarks,lastupdateddt,lastupdatedby) {
	var response = {
			status	: Boolean,
			message : String,
			data	: String
		}
	console.log(supplierid);
	var paidamnt = invoiceamount - outstandingamount
	var accreceive={
		company_id 				: companyid,
		store_id 				: storeid,
		entry_date 				: entrydate,
		account_id 				: accountid,			 
		invoice_no 				: invoiceno,
		invoice_date 			: invoicedate,	
		invoice_amount 			: invoiceamount,
		paid_amount 			: paidamnt,
		balance_amount 			: outstandingamount,
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
			accreceive.account_id=result.account_id;
			accountreceivables.create(accreceive).then(function(data){
			}).error(function(err){
				log.error(err);
			});
				
		}else{     

		}
		
	});	
	
}
