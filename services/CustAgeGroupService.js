/**
 * @Filename 		: CustAgeGroupService.js 
 * @Description 	: To write Business Logic for m_cust_age_group. 
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
var custagegroup 		= require('../models/CustAgeGroup.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
						};
var appmsg				= require('../config/Message.js');

var path 				= require('path');
var filename			= path.basename(__filename);

// To get Customer Age Group based on user param
exports.getCustAgeGroupDetails = function(condition,callback) {
	
	custagegroup.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getCustAgeGroupDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getCustAgeGroupDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getCustAgeGroupDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save Save/Update Customer Age Group Details
exports.saveCustAgeGroup = function(agegroupobj,callback) {
	custagegroup.upsert(agegroupobj).then(function(data){
		if(data){
			log.info(filename+'>>saveCustAgeGroup>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		else{
			log.info(filename+'>>saveCustAgeGroup>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			callback(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveCustAgeGroup>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
		
}


