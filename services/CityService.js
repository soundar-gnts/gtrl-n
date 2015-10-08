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

var city = require('../models/City.js');
	

//SaveOrUpdate City Details

	exports.saveOrUpdateCity = function(req, res){
		city.create({
			
			city_id			: req.param('cityid'),
			city_name		: req.param('cityname'),
			state_id		: req.param('stateid'),
			status    		: req.param('status'),	
			last_updated_dt	: new Date(),
	        last_updated_by	: req.param('lastupdatedby')
			})
			
			.error(function(err){
				res.send(err);
			});
		
			if(req.param('cityid') == null)
			{
			res.send("Inserted Successfully ");
			}
			else
			{
			res.send("Updated Successfully");
			}
	} 

	//City Full LIST

	exports.getCityList = function(req, res) {
		
		var condition  	= "";		
		var cityId		= req.param("cityid");
		var cityName	= req.param("cityname");
		var status		= req.param("status");
		var stateId		= req.param("stateid");
		
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

		  city.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
		        if(err)
		            res.send(err);
		        else
		            res.send(result);
		    }); 
		}