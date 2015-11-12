/**
 * @Filename 		: DesignationService.js 
 * @Description 	: To write Business Logic for Designation. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
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

var designation 			= require('../models/Designation.js');
var appMsg					= require('../config/Message.js');
var log 					= require('../config/logger').logger;
var path 					= require('path');
var fileName				= path.basename(__filename);
var response 				= {
								status	: Boolean,
								message : String,
								data	: String
								};
// To Get Bank full LIST
exports.getDesignDetails = function(conditionQuery,attr,callback) {
	
designation.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info(fileName+'.getDesignDetails - No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getDesignDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
			log.error(fileName+'.getDesignDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
};
//For Save/Update Designation
exports.saveDesignDetails = function(designationobj, callback) {
	designation.upsert(designationobj).then(
			function(err) {

				if (err) {
					log.info(fileName + '.saveDesignDetails - '
							+ appMsg.SAVEMESSAGE);
					response.message 	= appMsg.SAVEMESSAGE;
					response.status 	= true;
					response.data 		= "";
					callback(response);
				} else {
					log.info(fileName + '.saveDesignDetails - '
							+ appMsg.UPDATEMESSAGE);
					response.message 	= appMsg.UPDATEMESSAGE;
					response.status 	= true;
					response.data 		= "";
					callback(response);
				}

			}).error(function(err) {
		log.error(fileName + '.saveDesignDetails - ');
		log.error(err);
		response.status 	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data 		= err;
		callback(response);
	});
}
