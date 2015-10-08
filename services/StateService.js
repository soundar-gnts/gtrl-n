/**
 * File Name	:	StateService.js
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
 *  0.1  	October 07, 2015         Saranya G
 */

var state = require('../models/State.js');


//SaveOrUpdate State Details

	exports.saveOrUpdateState = function(req, res){
		state.upsert({
			state_id			: req.param('stateid'),
			state_name 			: req.param('statename'),
			status				: req.param('status'),
			last_updated_dt		: new Date(),
			last_updated_by		: req.param('lastupdatedby') 
			})
			.error(function(err){
				res.send(err);
			});
		console.log(req.param('stateid'));
		if( req.param('stateid') == null)
			{
			res.send("Inserted Successfully ");
			}
		else
			{
			res.send("Updated Successfully");
			}
	} 

//State full LIST

	exports.getStateList = function(req, res) {
		var condition 	= "";
		var stateId		= req.param("stateid");
		var stateName	= req.param("statename");
		var status		= req.param("status");
		
		if(stateId!=null){
			condition ="state_id="+stateId;
			}
		
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(stateName!=null){
			if(condition === ""){
				condition="state_name='"+stateName+"'";
			}else {
				condition=condition+" and state_name like '%"+stateName+"%'";
			}
			
		}
		state.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}

