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

var city 		= require('../models/masters/City.js');
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

	exports.saveOrUpdateCity = function(req, res){	

		city.upsert({
			
			city_id			: req.param('cityid'),
			city_name		: req.param('cityname'),
			state_id		: req.param('stateid'),
			status    		: req.param('status'),	
			last_updated_dt	: req.param('lastupdateddt'),
	        last_updated_by	: req.param('lastupdatedby')
	        
			})
			.then(function(data){
				if(data){
					log.info(fileName+'.saveOrUpdateCity - '+appMsg.SAVEMESSAGE);
					response.message = appMsg.SAVEMESSAGE;
					response.status  = true;
					res.send(response);
				}
				else{
					log.info(fileName+'.saveOrUpdateCity - '+appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					res.send(response);
				}
				
				
			}).error(function(err){
				log.info(fileName+'.saveOrUpdateCity - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});
	}; 

	//City Full LIST

	exports.getCityList = function(req, res) {	
		
		var condition  	= "";		
		var cityId		= req.param("cityid");
		var cityName	= req.param("cityname");
		var status		= req.param("status");
		var stateId		= req.param("stateid");
		var attr 		= "";
		
		if(cityId!=null){
			condition ="city_id="+cityId;
			}
		
		if(stateId!=null){
			if(condition === ""){
				condition="state_id ='"+stateId+"'";
			}else {
				condition=condition+" and state_id ='"+stateId+"'";
			}
		}
		
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		if(cityName!=null){
			if(condition === ""){
				condition="city_name like '%"+cityName+"%'";
			}else {
				condition=condition+" and city_name like '%"+cityName+"%'";
			}
			
		}

		if(req.param('isfulllist')== null ||req.param('isfulllist')=='P'){
			attr=['city_id','city_name'];
		}
			

		  city.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		  
		  .then(function(citylist){
			  
				if(citylist.length === 0){
					
					log.info(fileName+'.getCityList - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data 	 = "";
					res.send(response);
				} else{

					log.info(fileName+'.getCityList - About '+citylist.length+' results.');					
					response.status  	= true;
					response.message 	= 'About '+citylist.length+' results.';
					response.data 		= citylist;
					res.send(response);
				}
				
			})
			
			.error(function(err){
				log.error(fileName+'.getCityList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});
		};