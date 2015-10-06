/**
 * File Name	:	state.js
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

var city = require('../models/city.js');

//City List
exports.cityList = function(req, res){

	city.findAll({where : {status : "Active"}})
	.then(function(user){
		if(user){
			res.send(user);
		} else{
			res.send("failure");
		}
	})
	.error(function(err){
		res.send(err);
	});
}


//Insert into m_city table

exports.saveCity = function(req, res){
	
	city.findOne({where : {city_name : req.param('cityname')}})
	.then(function(result){
		if(!result){
		
			city.create({				
				city_name		: req.param('cityname'),		
				status    		: req.param('status'),	
				last_updated_dt	: new Date(),
		        last_updated_by	: "Saranya"
				
			}).error(function(err){
				res.send(err);
			});
		
			res.send('Successfully Saved.');
		} else{
			res.send('Cityname already exist.');
		}
	})
	.error(function(err){
		res.send(err);
	});
}

exports.saveCity = function(req, res){
	
	city.findOrCreate({where : {city_name : req.param('cityname')}})
	.then(function(result){
		if(!result){
		
			city.create({				
			
				city_name		: req.param('cityname'),
				state_id		: req.param('stateid'),
				status    		: req.param('status'),	
				last_updated_dt	: new Date(),
		        last_updated_by	: "Saranya"
				
			}).error(function(err){
				res.send(err);
			});
		
			res.send('Successfully Saved.');
		} else{
			res.send('Cityname already exist.');
		}
	})
	.error(function(err){
		res.send(err);
	});
}

//Update City Details

exports.updateCity = function(req, res){
	city.update({
		city_name: req.param('cityname'),
		state_id : req.param('stateid'),
		status: req.param('status'),
		last_updated_dt: new Date(),
		last_updated_by: "Saranya" },
		{ where: { city_id: req.param('cityid')}} )
	.then(function(affectedRows) {
	
                	 city.findAll().then(function(tasks) {
                			
                         console.log(affectedRows) 
                			if(affectedRows==1)
                			{
                			res.send('Successfully Updated.');
                			}
                			else
                				{
                				res.send('No records');
                				}
                	
                   })
                 })
} 