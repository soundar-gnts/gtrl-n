/**
 * @Filename 		: CurrencyService.js 
 * @Description 	: To write Business Logic for Currency. 
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

var ccy 			= require('../models/Currency.js');
var appMsg			= require('../config/Message.js');
var log 			= require('../config/logger').logger;
var path 			= require('path');
var fileName		= path.basename(__filename);
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
					};

// To Get Bank full LIST
exports.getCcyDetails = function(conditionQuery,attr,callback) {
	console.log("conditionQuery->"+conditionQuery);
	ccy.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		console.log("result->"+result);
		if(result.length === 0){
			
			log.info(fileName+'.getCcyDetails - No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getCcyDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
			log.error(fileName+'.getCcyDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
};

//For Save or update Currency Details
exports.saveCcyDetails = function(ccyobj,callback){

	 ccy.upsert(ccyobj).then(function(err){

					if(err){
						log.info(fileName+'.saveCcyDetails - '+appMsg.SAVEMESSAGE);
						response.message 	= appMsg.SAVEMESSAGE;
						response.status  	= true;
						response.data 	 	= "";
						callback(response);
					}
					else{
						log.info(fileName+'.saveCcyDetails - '+appMsg.UPDATEMESSAGE);
						response.message 	= appMsg.UPDATEMESSAGE;
						response.status  	= true;
						response.data 	 	= "";
						callback(response);
					}
					
				}).error(function(err){
						log.error(fileName+'.saveCcyDetails - ');
						log.error(err);
						response.status  	= false;
						response.message 	= appMsg.INTERNALERRORMESSAGE;
						response.data  		= err;
						callback(response);
				});
			}
