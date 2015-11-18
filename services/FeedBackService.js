/**
 * File Name	:	FeedBackService.js
 * Description	:	To write Business Logic For FeedBack.
 * Author		:	Saranya G
 * Date			:	October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */

var feedbackservice 		= require('../models/FeedBack.js');
var log 					= require('../config/logger').logger;
var appMsg					= require('../config/Message.js');
var path					= require('path');
var fileName				= path.basename(__filename);

var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
	

	//SaveOrUpdate FeedBack Details
	exports.saveOrUpdateFeedBack = function(feedbackobj, callback) {
	feedbackservice.upsert(feedbackobj).then(
			function(data) {
				if (data) {
					log.info(fileName + '.saveOrUpdateFeedBack - '
							+ appMsg.SAVEMESSAGE);
					response.message 	= appMsg.SAVEMESSAGE;
					response.status 	= true;
					response.data 		= "";
					callback(response);

				} else {
					log.info(fileName + '.saveOrUpdateFeedBack - '
							+ appMsg.UPDATEMESSAGE);
					response.message 	= appMsg.UPDATEMESSAGE;
					response.status 	= true;
					response.data 		= "";
					callback(response);
				}

			}).error(
			function(err) {
				log.info(fileName + '.saveOrUpdateFeedBack - '
						+ appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status 	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data 		= err;
				callback(response);
			});
	}; 

	//To get feedback list based on user param
	exports.getFeedBackList = function(condition,attr,fetchAssociation,callback) {	
		
		feedbackservice.findAll({where : [condition],include : fetchAssociation,order: [['last_updated_dt', 'DESC']],attributes: attr})
		  
		  .then(function(result){
				if(result.length === 0){
					log.info(fileName+'.getFeedBackList - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data 	 = "";
					callback(response);
				} else{

					log.info(fileName+'.getFeedBackList - About '+result.length+' results.');					
					response.status  	= true;
					response.message 	= 'About '+result.length+' results.';
					response.data 		= result;
					callback(response);
				}
				
			})
			.error(function(err){
				log.error(fileName+'.getFeedBackList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
			});
		};