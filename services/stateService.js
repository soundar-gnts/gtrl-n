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

var state = require('../models/state.js');

//State List

exports.stateList = function(req, res){

	state.findAll({where : {status : "Active"}})
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


//Insert into m_state table

exports.saveState = function(req, res){
	
	state.findOne({where : {state_name : req.param('statename')}})
	.then(function(result){
		if(!result){
		
			state.create({				
				state_name		: req.param('statename'),		
				status    		: req.param('status'),	
				last_updated_dt	: new Date(),
			   // last_updated_by	: req.param('firstname')+' '+req.param('lastname')
				
			}).error(function(err){
				res.send(err);
			});
		
			res.send('Successfully Saved.');
		} else{
			res.send('Statename already exist.');
		}
	})
	.error(function(err){
		res.send(err);
	});
}


