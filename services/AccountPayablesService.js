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
var accountpayables 	= require('../models/AccountPayables.js');
var log 				= require('../config/logger').logger;
var response			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');
var accounts 			= require('../models/Accounts.js');
var commonService 		= require('../services/CommonService.js');

var path 				= require('path');
var filename			= path.basename(__filename);
var accountsService 	= require('../services/AccountsService.js');
var constants			= require('../config/Constants.js');
var config 				= require('../config/config.js');
var slnogenService 		= require('../services/SlnoGenService.js');

// To get Account Payables List based on user param
exports.getAccountPayablesDetails = function(condition,attr,fetchAssociation,callback) {
	
	accountpayables.findAll({where : [condition],include : fetchAssociation,attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getAccountPayablesDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getAccountPayablesDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.info(filename+'>>getAccountPayablesDetails>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

// To Save Save/Update AccountPayables Details
exports.saveAccountPayables = function(accpayobj,callback) {
	accountpayables.upsert(accpayobj).then(function(data){
		if(data){
			log.info(filename+'>>saveAccountPayables>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = accpayobj.accpayble_id;
			callback(response);
		}
		else{
			log.info(filename+'>>saveAccountPayables>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = accpayobj.accpayble_id;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveAccountPayables>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
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
	
	var refkey	= 'ACC_PAY_REF';
	var slNoCondition = {
			company_id 			: accpay.company_id,
			ref_key 			: refkey,
			autogen_yn 			: 'Y',
			status 				: 'Active'
	};
	
	accounts.findOne({where:[{supplier_id:supplierid,status:'Active'}]})
	.then(function(result){
		if(result!=null){
			accpay.account_id	=	result.account_id;
			slnogenService.getSlnoValue(slNoCondition, function(sl) {
				accpay.ref_number = sl.sno;
				
				accountpayables.create(accpay).then(function(data){
					
					//For update the account balance
					accountsService.updateAccountBalance(result.account_id,invoiceamount,"D");
					
					//For update the serial number sequence
					slnogenService.updateSequenceNo(sl.slid,
							accpay.last_updated_dt, accpay.last_updated_by);
					
				}).error(function(err){
					log.error(err);
				});
				
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
				aproveauth 					: 'N',
				selfapprv_yn 				: 'N',
				remarks 					: 'Nill',
				status 						: 'Active',
				last_updated_dt 			: lastupdateddt,
				last_updated_by 			: lastupdateddt
				
			}).then(function(data){
				accpay.account_id	=	data.account_id;
				slnogenService.getSlnoValue(slNoCondition, function(sl) {
					accpay.ref_number = sl.sno;
					
					accountpayables.create(accpay).then(function(data){
						
						//For update the account balance
						accountsService.updateAccountBalance(data.account_id,invoiceamount,"D");
						
						//For update the serial number sequence
						slnogenService.updateSequenceNo(sl.slid,
								accpay.last_updated_dt, accpay.last_updated_by);
						
					}).error(function(err){
						log.error(err);
					});
					
				});
					
			}).error(function(err){
				log.info(filename+'>>insertAccountPayables>>');
				log.error(err);
				console.log("Error--2->"+err);
			});

		}
		
	});
}


