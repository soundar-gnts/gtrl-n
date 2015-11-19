/**
 * File Name	:	CityService.js
 * Description	:	To write Business Logic For City.
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

var city 		= require('../models/City.js');
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var path		= require('path');
var fileName	= path.basename(__filename);
var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
	

//SaveOrUpdate City Details
exports.saveOrUpdateCity = function(cityobj,callback){	
	city.upsert(cityobj)
			.then(function(data){
				if(data){
					log.info(fileName+'.saveOrUpdateCity - '+appMsg.SAVEMESSAGE);
					response.message = appMsg.SAVEMESSAGE;
					response.status  = true;
					response.data 	 = "";
					callback(response);
				}
				else{
					log.info(fileName+'.saveOrUpdateCity - '+appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					response.data 	 = "";
					callback(response);
				}
				
				
			}).error(function(err){
					log.info(fileName+'.saveOrUpdateCity - '+appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
			});
	}; 

	//City Full LIST
	exports.getCityList = function(condition,attr,fetchAssociation,callback) {	
	  city.findAll({where : [condition],include		: fetchAssociation,order: [['last_updated_dt', 'DESC']],attributes: attr})
		  
		  .then(function(citylist){
				if(citylist.length === 0){
					log.info(fileName+'.getCityList - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data 	 = "";
					callback(response);
				} else{

					log.info(fileName+'.getCityList - About '+citylist.length+' results.');					
					response.status  	= true;
					response.message 	= 'About '+citylist.length+' results.';
					response.data 		= citylist;
					callback(response);
				}
				
			})			
			.error(function(err){
					log.error(fileName+'.getCityList - '+appMsg.INTERNALERRORMESSAGE);
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					callback(response);
			});
		};