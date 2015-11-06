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
var accounts 			= require('../models/Accounts.js');
var log 				= require('../config/logger').logger;
var response 			= {
		status	: Boolean,
		message : String,
		data	: String
		};
var appmsg				= require('../config/Message.js');
var path 				= require('path');
var filename			= path.basename(__filename);
var accounttxns 		= require('../models/AccountTransactions.js');
var accounttxnsbills 	= require('../models/AccountTxnsBills.js');
var accountreceivables  = require('../models/AccountReceivables.js');
var accountpayables 	= require('../models/AccountPayables.js');

// To get Account List based on user param
exports.getAccountsDetails = function(condition, selectedAttributes, callback) {
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
			}
	accounts.findAll({where : [condition],attributes: selectedAttributes}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getAccountsDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getAccountsDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getAccountsDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save Save/Update Account Details
exports.saveAccounts = function(accounts, callback) {
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
			}
	if(accounts.account_id != null){
		accounts.upsert(accounts)
		.then(function(data){
			log.info(filename+'>>saveAccounts>>'+appmsg.ACCOUNTEDITSUCCESS);
			response.message = appmsg.ACCOUNTEDITSUCCESS;
			response.status  = true;
			response.data	 = accounts.account_id;
		}).error(function(err){
			log.info(filename+'>>saveAccounts>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		accounts.create(accounts)
		.then(function(data){
			log.info(filename+'>>saveAccounts>>'+appmsg.ACCOUNTSAVESUCCESS);
			response.message = appmsg.ACCOUNTSAVESUCCESS;
			response.status  = true;
			response.data	 = data.account_id;
		}).error(function(err){
			log.info(filename+'>>saveAccounts>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}
//To Delete Account Detail
exports.deleteAccountDetails = function(condition, callback) {
	log.info(filename+'.deleteAccountDetails()');
	accounts.destroy({where:[condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Account details removed.');
			response.status  	= true;
			callback(response);
		} else{
			log.info('No Account details found.');
			response.status  	= true;
			callback(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
	
}

//To update account balance
exports.updateAccountBalance = function(accountid,transamount,crdr) {

	accounts.findOne({where:[{account_id:accountid}]}).then(function(data){
	if(data){
		var currentbalance = 0;
		var amount = 0;
		var newbalance=0;
		if(data.current_balance!=null){
			currentbalance = data.current_balance;
		}
		if(transamount!=null){
			if(crdr!=null && crdr.toUpperCase()=='D'){
				newbalance = currentbalance + transamount;
			}else{
				newbalance = currentbalance - transamount;
			}
			
		}
		accounts.update({current_balance:newbalance},{where : {account_id:accountid}}).error(function(err){
			
		});
		
		log.info(filename+'>>updateAccountBalance>>'+appmsg.UPDATEMESSAGE);
		response.message = appmsg.UPDATEMESSAGE;
		response.status  = true;
		response.data	 = accountid;
		//res.send(response);
	}
	
	}).error(function(err){
		log.info(filename+'>>updateAccountBalance>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		//res.send(response);
});

}

//To Save Vendor/Customer Payable/Receivable
exports.saveVendorCustomerTxns = function(req, res) {

	var accountid		=req.param("accountid");
	var companyid		=req.param("companyid");
	var storeid			=req.param("storeid");
	var refno			=req.param("refno");
	var entrydate		=req.param("entrydate");
	var transamount		=req.param("transamount");
	var paymentmode		=req.param("paymentmode");
	var crdr			=req.param("crdr");
	var remarks			=req.param("remarks");
	var transtypeid		=req.param("transtypeid");
	var lastupdateddt	=req.param("lastupdateddt");
	var lastupdatedby	=req.param("lastupdatedby");
	
	var txnstatus			='Pending';
	
	accounts.findOne({where:[{account_id:accountid}]}).then(function(data){
	if(data){
		var currentbalance = 0;
		var amount = 0;
		var newbalance=0;
		if(data.current_balance!=null){
			currentbalance = data.current_balance;
		}
		if(transamount!=null){
			if(crdr!=null && crdr.toUpperCase()=='D'){
				newbalance = currentbalance + transamount;
			}else{
				newbalance = currentbalance - transamount;
			}
			
		}
		//For Insert New Record in Account Transactions
		accounttxns.create({
			company_id 				: companyid,
			store_id 				: storeid,
			entry_date 				: entrydate,
			account_id 				: accountid,
			trans_type_id 			: transtypeid,
			open_balance 			: currentbalance,
			trans_amount 			: transamount,
			close_balance 			: newbalance,
			payment_mode 			: paymentmode,
			ref_no					: refno,
			ref_date				: entrydate,
			txn_remarks				: remarks,
			status 					: 'Pending',
			last_updated_dt 		: lastupdateddt,
			last_updated_by 		: lastupdatedby
			
		}).then(function(data){
			
			//For insert new record in account txns bills table
			accounttxnsbills.create({
				acctxn_id 					: data.acctxn_id,
				account_id 					: accountid,
				ref_no 						: refno,
				ref_date 					: entrydate,
				paid_amount 				: transamount,
				status 						: 'Active'
				
			}).then(function(data){
				
			}).error(function(err){});
			
			console.log("data.balance_amount-transamount==="+data.balance_amount-transamount)
					
			if(crdr!=null && crdr.toUpperCase()=='C'){
				
			//For update balance and paid amount
			accountpayables.findOne({where:[{account_id:accountid,store_id:storeid}]}).then(function(data){
				if(data){
					console.log("txnstatus=1=>"+txnstatus);
					accountpayables.update({paid_amount:data.paid_amount+transamount,balance_amount:data.balance_amount-transamount,status:txnstatus},
							{where : {account_id:accountid,store_id:storeid}}).then(function() {
								if(data.balance_amount-transamount<=0){
									txnstatus ='Paid';
									console.log("txnstatus=1=>"+txnstatus);
									accountpayables.update({status:txnstatus},
											{where : {account_id:accountid,store_id:storeid}}).then(function() {}).error(function(err){
										
									});
								
								}
								
							}).error(function(err){
						
					});
				}
			});
		}else{
			//For update balance and paid amount
			accountreceivables.findOne({where:[{account_id:accountid,store_id:storeid}]}).then(function(data){
				if(data){
					console.log("txnstatus=2=>"+txnstatus);
					accountreceivables.update({paid_amount:data.paid_amount+transamount,balance_amount:data.balance_amount-transamount,status:txnstatus},
							{where : {account_id:accountid,store_id:storeid}}).then(function() {
								if(data.balance_amount-transamount<=0){
									txnstatus ='Paid';
									console.log("txnstatus=1=>"+txnstatus);
									accountreceivables.update({status:txnstatus},
											{where : {account_id:accountid,store_id:storeid}}).then(function() {}).error(function(err){
										
									});
								
								}
								
							}).error(function(err){
						
					});
				}
			});
		}
				
			
		}).error(function(err){
			
		});
			
		//For update account balance
		accounts.update({current_balance:newbalance},{where : {account_id:accountid}}).error(function(err){
			
		});
		
		
		log.info(filename+'>>saveVendorCustomerTransactions>>'+appmsg.UPDATEMESSAGE);
		response.message = appmsg.UPDATEMESSAGE;
		response.status  = true;
		response.data	 = accountid;
		res.send(response);
	}
	
	}).error(function(err){
		log.info(filename+'>>saveVendorCustomerTransactions>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
});

}
