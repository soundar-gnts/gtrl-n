/**
 * File Name	:	StateRoutes.js
 * Description	:	To write Routing middlewares For User.
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
 * 
 */

var stateService= require('../services/StateService.js');

module.exports = function(app, server){
	
	app.post('/getstatelist', getStateList);	
	app.post('/saveorupdatestate', saveOrUpdateState);
	
	//To get State List based on user param
	function getStateList(req, res){
		
		var condition 	= "";
		var stateId		= req.param("stateid");
		var stateName	= req.param("statename");
		var status		= req.param("status");
		var attr 		= "";
		
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
		
		if(req.param('isfulllist')== null||req.param('isfulllist') == 'P'){
			
			attr=['state_name','state_id'];
		}
		stateService.getStateList(condition,attr,function(result){
			res.send(result);
		});
	}
	
	//For save / update state Details
	function saveOrUpdateState(req, res){
		var stateobj={
				state_id			: req.param('stateid'),
				state_name 			: req.param('statename'),
				status				: req.param('status'),
				last_updated_dt		: req.param('lastupdateddt'),
				last_updated_by		: req.param('lastupdatedby') 
				};
		stateService.saveOrUpdateState(stateobj,function(result){
			res.send(result);
		});
		
	}
	
};

