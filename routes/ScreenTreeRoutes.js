/**
 * File Name	:	ScreenTreeRouts.js
 * Description	:	To write Routing middlewares For Screen Tree.
 * Author		:	Haris K.A.
 * Date			:	October 09, 2015
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

var screenTreeService = require('../services/ScreenTreeService.js');

module.exports = function(app, server){
	
	app.post('/savescreentreedetails', saveOrUpdateScreenTree);
	app.post('/getscreentreedetails', 	getScreenTree);
	
	//For save / update screen tree
	function saveOrUpdateScreenTree(req, res){
		var screenTree = {
				screen_id		: req.param('screenid'),
				screen_name		: req.param('screenname'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
			}
		screenTreeService.saveOrUpdateScreenTreeFn(screenTree, function(result){
			res.send(result);
		});
	}
	//For get screen tree list based on user param.
	 function getScreenTree(req, res){
		 
		var condition 	= "";
		var screenId 	= req.param('screenid');
		var status		= req.param('status');
		var screeName 	= req.param('screenname');
		var selectedAttributes	= "";
			
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['screen_id','screen_name']
		}
			
		if(screenId!=null){
			if(condition === ""){
				condition = "screen_id='"+screenId+"'";
			}
		}		
			
		if(status!=null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}			
		if(screeName!=null){
			if(condition === ""){
				condition = "screen_name='"+screeName+"'";
			}			
			else{
				condition = condition+" and screen_name='"+screeName+"'";
			}
		}
			
		screenTreeService.getScreenTree(condition, selectedAttributes, function(result){
			res.send(result);
		});
	 }
}