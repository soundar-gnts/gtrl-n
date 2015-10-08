/**
 * File Name	:	CityService.js
 * Description	:	To write Business Logic For User.
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

var log = require('../config/logger').logger;
var city = require('../models/City.js');
var response = {
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
			last_updated_dt	: new Date(),
	        last_updated_by	: req.param('lastupdatedby')
			})
			.then(function(data){
				if(data){
					log.info('City saved successfully.');
					response.message = 'City saved successfully.';
					response.status  = true;
					res.send(response);
				}
				else{
					log.info('City Updated successfully.');
					response.message = 'City Updated successfully.';
					response.status  = true;
					res.send(response);
				}
				
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
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
		
		if(cityId!==null){
			condition ="city_id="+cityId;
			}
		if(stateId!==null){
			if(condition === ""){
				condition="state_id ='"+stateId+"'";
			}else {
				condition=condition+" and state_id ='"+stateId+"'";
			}
		}
		
		if(status!==null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		if(cityName!==null){
			if(condition === ""){
				condition="city_name like '%"+cityName+"%'";
			}else {
				condition=condition+" and city_name like '%"+cityName+"%'";
			}
			
		}

		  city.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]})
		  .then(function(citylist){
				if(citylist.length === 0){
					
					log.info('No data found.');
					response.message = 'No data found.';
					response.status  = false;
					res.send(response);
				} else{
					
					log.info('About '+citylist.length+' results.');
					response.status  	= true;
					response.message 	= 'About '+citylist.length+' results.';
					response.data 		= citylist;
					res.send(response);
				}
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		};