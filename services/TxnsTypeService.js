/**
 * @Filename 		: TxnsTypeService.js 
 * @Description 	: To write Business Logic for transaction type. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 03, 2015
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
var txnstype 	= require('../models/TxnsType.js');
var log 		= require('../config/logger').logger;
var response 	= {
					status	: Boolean,
					message : String,
					data	: String
					};
var appmsg		= require('../config/Message.js');

var path 		= require('path');
var filename	= path.basename(__filename);

// To get full Transaction Type List
exports.getTxnsTypeDetails = function(condition,attr,callback) {
		
	txnstype.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getTxnsTypeDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getTxnsTypeDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getTxnsTypeDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save Transaction Type
exports.saveTxnsType = function(txnstypeobj,callback) {
	txnstype.upsert(txnstypeobj).then(function(data){
		if(data){
			log.info(filename+'>>saveTxnsType>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		else{
			log.info(filename+'>>saveTxnsType>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveTxnsType>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}


