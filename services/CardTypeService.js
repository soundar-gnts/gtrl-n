/**
 * File Name	:	CardTypeService.js
 * Description	:	To write Business Logic For CardType.
 * Author		:	Saranya G
 * Date			:	October 07, 2015
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

var cardtype 	= require('../models/CardType.js');
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var path		= require('path');
var fileName	= path.basename(__filename);
var response	= {
					status	: Boolean,
					message : String,
					data	: String
				  };

//SaveOrUpdate Card Type Details
exports.saveOrUpdateCardType = function(cardtypeobj,callback){
		
		cardtype.upsert(cardtypeobj)
			.then(function(data){
				if(data){
					log.info(fileName+'.saveOrUpdateCardType - '+appMsg.SAVEMESSAGE);
					response.message = appMsg.SAVEMESSAGE;
					response.status  = true;
					response.data	 = "";
					callback(response);
				}
				else{
					log.info(fileName+'.saveOrUpdateCardType - '+appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					response.data	 = "";
					callback(response);
				}
				
				
			}).error(function(err){
					log.info(fileName+'.saveOrUpdateCardType - '+appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
			});
}; 

//Card Type LIST based on user param
exports.getCardTypeList = function(condition,attr,callback) {
		
		cardtype.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		
		.then(function(cardtypelist){
			
			if(cardtypelist.length === 0){				
				log.info(fileName+'.getCardTypeList - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data 	 = "";
				callback(response);
			} else{
				log.info(fileName+'.getCardTypeList - '+'About '+cardtypelist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+cardtypelist.length+' results.';
				response.data 		= cardtypelist;
				callback(response);
			}
			
		})
		.error(function(err){
				log.info(fileName+'.getCardTypeList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				callback(response);
		});
	};

