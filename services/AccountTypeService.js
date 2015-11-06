/**
 * @Filename 		: AccountTypeService.js
 * @Description 	: To write Business Logic for Account Type
 * @Author 			: SOUNDAR C 
 * @Date 			: November 02, 2015
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
var accounttype		= require('../models/AccountType.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');

var path 			= require('path');
var filename		= path.basename(__filename);

// To get Account Type List based on user param
exports.getAccountTypeDetails = function(condition,callback) {
	
	accounttype.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getAccountTypeDetails >>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>> getAccountTypeDetails >>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>> getAccountTypeDetails >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save/Update Account Type
exports.saveAccountType = function(accounttypeobj,callback) {
	accounttype.upsert(accounttypeobj).then(function(data){
		if(data){
			log.info(filename+'>> saveAccountType >>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= accounttypeobj.acct_type_id;
			callback(response);
		}
		else{
			log.info(filename+'>> saveAccountType >>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= accounttypeobj.acct_type_id;
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>> saveAccountType >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}

//To Delete Account Type
exports.deleteAccountType = function(req, res) {
	if(req.param("accttypeid")!=null){
		accounttype.destroy({where:{acct_type_id	: req.param("accttypeid")}})
		.then(function(data){
			log.info(filename+'>> deleteAccountType >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			response.data		= req.param("accttypeid");
			res.send(response);
			
		}).error(function(err){
			log.info(filename+'>> deleteAccountType >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
		}else{
			log.info(filename+'>> deleteAccountType >>');
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("accttypeid");
			res.send(response);
		}
}
