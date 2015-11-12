/**
 * File Name	:	StateService.js
 * Description	:	To write Business Logic For State.
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
 *  0.1  	October 07, 2015         Saranya G
 */

var state 		= require('../models/State.js');
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var path		= require('path');
var fileName	= path.basename(__filename);
var response 	= {
					status	: Boolean,
					message : String,
					data	: String
				 };

	//SaveOrUpdate State Details
	exports.saveOrUpdateState = function(stateobj,callback){
		state.upsert(stateobj)
			.then(function(data){
				if(data){
					log.info(fileName+'.saveOrUpdateState - '+appMsg.SAVEMESSAGE);
					response.message = appMsg.SAVEMESSAGE;
					response.status  = true;
					callback(response);
				}
				else{
					log.info(fileName+'.saveOrUpdateState - '+appMsg.UPDATEMESSAGE);
					log.info(' Updated successfully.');
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					callback(response);
				}
				
			}).error(function(err){
					log.info(fileName+'.saveOrUpdateState - '+appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
			});
	}; 

	//State  List
	exports.getStateList = function(condition,attr,callback) {
		
		state.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		  .then(function(statelist){
				if(statelist.length === 0){
					log.info(fileName+'.getStateList - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message 	= appMsg.LISTNOTFOUNDMESSAGE;
					response.status  	= false;
					response.data 	 	= "";
					callback(response);
				} else{
					log.info(fileName+'.getStateList - About '+statelist.length+' results.');	
					response.status  	= true;
					response.message 	= 'About '+statelist.length+' results.';
					response.data 		= statelist;
					callback(response);
				}
			})
			.error(function(err){
					log.info(fileName+'.getStateList - '+appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					callback(response);
			});
		};
		
	