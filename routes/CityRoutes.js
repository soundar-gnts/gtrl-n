/**
 * File Name	:	CityRoutes.js
 * Description	:	To write Routing middlewares For CityRoutes.
 * Author		:	Saranya G
 * Date			:	October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 *  Version       Date           	Modified By             Remarks
 * 
 * 
 */

var cityService = require('../services/CityService.js');

module.exports = function(app, server){
	
	app.post('/getcitylist', getCityList);
	app.post('/saveorupdatecity', saveOrUpdateCity);
	
	//SaveOrUpdate City Details
	function saveOrUpdateCity(req, res){
		var cityobj = {
				city_id			: req.param('cityid'),
				city_name		: req.param('cityname'),
				state_id		: req.param('stateid'),
				status    		: req.param('status'),	
				last_updated_dt	: req.param('lastupdateddt'),
		        last_updated_by	: req.param('lastupdatedby')
		        
				};
		cityService.saveOrUpdateCity(cityobj, function(result){
			res.send(result);
		});
	}
	
	//City list based on user param
	function getCityList(req, res){
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
		cityService.getCityList(condition,attr, function(result){
			res.send(result);
		});
	}
	
};

