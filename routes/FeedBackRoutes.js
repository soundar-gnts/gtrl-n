/**
 * File Name	:	FeedBackRoutes.js
 * Description	:	To write Routing middlewares For FeedBackRoutes.
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

var feedBackService = require('../services/FeedBackService.js');

module.exports = function(app, server){
	
	app.post('/getfeedbacklist', getFeedBackList);
	app.post('/saveorupdatefeedback', saveOrUpdateFeedBack);
	
	//For save / update feedback details
	function saveOrUpdateFeedBack(req, res){
		var feedbackobj ={
				feedback_id		: req.param('feedbackid'),
				company_id		: req.param('companyid'),
				cust_id         : req.param('custid'),
				feedback		: req.param('feedback'),
				status    		: req.param('status'),	
				last_updated_dt	: req.param('lastupdateddt'),
		        last_updated_by	: req.param('lastupdatedby')
				};
		feedBackService.saveOrUpdateFeedBack(feedbackobj,function(result){
			res.send(result);
		});
	} 
	
	
	//To get feedback list based on user param
	function getFeedBackList(req, res){
		var condition  		= "";		
		var feedbackid		= req.param('feedbackid');
		var companyid		= req.param('companyid');
		var custid    	    = req.param('custid');	
		var status			= req.param("status");
		
		var attr 		= "";
		
		if(feedbackid!=null){
			condition ="feedback_id="+feedbackid;
			}
		
		if(companyid!=null){
			if(condition === ""){
				condition="company_id ='"+companyid+"'";
			}else {
				condition=condition+" and company_id ='"+companyid+"'";
			}
		}
		
		if(custid!=null){
			if(condition === ""){
				condition="cust_id='"+custid+"'";
			}else {
				condition=condition+" and cust_id='"+custid+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}

		if(req.param('isfulllist')== null ||req.param('isfulllist')=='P'){
			attr=['company_id','cust_id','feedback_id'];
		}
		
		feedBackService.getFeedBackList(condition,attr,function(result){
			res.send(result);
		});
	}
	
};

