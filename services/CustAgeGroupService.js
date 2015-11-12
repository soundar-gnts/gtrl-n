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
var APPMSG				= require('../config/Message.js');
var path 				= require('path');
var filename			= path.basename(__filename);

// To get Customer Age Group based on user param
exports.getCustAgeGroupDetails = function(condition, callback) {
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
		}
	
	custagegroup.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getCustAgeGroupDetails>>'+APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
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
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}


// To Save Save/Update Customer Age Group Details
exports.saveCustAgeGroup = function(custAgeGrp, callback) {
	log.info(filename+'>>saveCustAgeGroup>>');
	var response 			= {
			status	: Boolean,
			message : String,
			data	: String
		}
	if(custAgeGrp.age_group_id != null){
		custagegroup.upsert(custAgeGrp).then(function(data){
			log.info(APPMSG.CUSTOMERAGEGROUPEDITSUCCESS);
			response.message = APPMSG.CUSTOMERAGEGROUPEDITSUCCESS;
			response.status  = true;
			response.data	 = custAgeGrp.age_group_id;
		}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= APPMSG.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	} else{
		custagegroup.create(custAgeGrp).then(function(data){
			log.info(APPMSG.CUSTOMERAGEGROUPSAVESUCCESS);
			response.message = APPMSG.CUSTOMERAGEGROUPSAVESUCCESS;
			response.status  = true;
			response.data	 = data.age_group_id;
		}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= APPMSG.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	}
}


