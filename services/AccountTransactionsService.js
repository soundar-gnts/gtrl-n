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
var accounttxns 	= require('../models/AccountTransactions.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');
var path 			= require('path');
var filename		= path.basename(__filename);
var accountsService = require('../services/AccountsService.js');

// To get Account Txns List based on user param
exports.getaccounttransDetails = function(condition,attr,fetchAssociation,callback) {
	
	accounttxns.findAll({where : [condition],attributes: attr,include : fetchAssociation,order: [['last_updated_dt', 'DESC']]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getaccounttransDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getaccounttransDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.info(filename+'>>getaccounttransDetails>>');
		log.error(err);
		response.status  	= false;
		response.message 	= appmsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}




// To Save Save/Update accounttxns Details
exports.saveaccounttrans = function(acctxnsobj,callback) {
	accounttxns.upsert(acctxnsobj).then(function(data){
		accountsService.updateAccountBalance(acctxnsobj.account_id,acctxnsobj.trans_amount,acctxnsobj.cr_dr);
		if(data){
			log.info(filename+'>>saveaccounttxns>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = acctxnsobj.acctxn_id;
			callback(response);
		}
		else{
			log.info(filename+'>>saveaccounttxns>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = acctxnsobj.acctxn_id;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveaccounttxns>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}

