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
var accounttxnsbills 	= require('../models/AccountTxnsBills.js');
var log 				= require('../config/logger').logger;
var response 			= {	status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');
var path 				= require('path');
var filename			= path.basename(__filename);

// To get Account Txns Bills List based on user param
exports.getAccountTxnsBillsDetails = function(condition,attr,fetchAssociation,callback) {
	
	accounttxnsbills.findAll({where : [condition],include : fetchAssociation,attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getAccountTxnsBillsDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getAccountTxnsBillsDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getAccountTxnsBillsDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save Save/Update Account Txns Bills Details
exports.saveAccountTxnsBills = function(billsobj,callback) {
	accounttxnsbills.upsert(billsobj).then(function(data){
		if(data){
			log.info(filename+'>>saveAccountTxnsBills>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = billsobj.txnbill_id;
			callback(response);
		}
		else{
			log.info(filename+'>>saveAccountTxnsBills>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = billsobj.txnbill_id;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveAccountTxnsBills>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}
//To Delete Account Txns Bill Detail
exports.deleteAccountTxnsBill = function(txnbillid,callback) {
	if(txnbillid!=null){
		accounttxnsbills.destroy({where:{
			txnbill_id					: txnbillid		
	}}).then(function(data){
		if(data){
			log.info(filename+'>>deleteAccountTxnsBill>>'+appmsg.DELETEMESSAGE);
			response.message = appmsg.DELETEMESSAGE;
			response.status  = true;
			response.data	 = txnbillid;
			callback(response);
		}else{
			log.info(filename+'>>deleteAccountTxnsBill>>'+appmsg.DELETEMESSAGE);
			response.message = appmsg.DELETEMESSAGE;
			response.status  = true;
			response.data	 = txnbillid;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>deleteAccountTxnsBill>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
	}else{
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= txnbillid;
			callback(response);
	}
}


