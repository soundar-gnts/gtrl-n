/**
 * File Name	:	FeedBackService.js
 * Description	:	To write Business Logic For FeedBack.
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

var feedbackservice 		= require('../models/FeedBack.js');
var log 					= require('../config/logger').logger;
var appMsg					= require('../config/Message.js');
var path					= require('path');
var fileName				= path.basename(__filename);

var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
	

//SaveOrUpdate FeedBack Details

	exports.saveOrUpdateFeedBack = function(req, res){	

		feedbackservice.upsert({
			
			feedback_id		: req.param('feedbackid'),
			company_id		: req.param('companyid'),
			cust_id         : req.param('custid'),
			feedback		: req.param('feedback'),
			status    		: req.param('status'),	
			last_updated_dt	: req.param('lastupdateddt'),
	        last_updated_by	: req.param('lastupdatedby')
	        
			})
			.then(function(data){
				if(data){
					log.info(fileName+'.saveOrUpdateFeedBack - '+appMsg.SAVEMESSAGE);
					response.message = appMsg.SAVEMESSAGE;
					response.status  = true;
					res.send(response);

				}
				else{
					log.info(fileName+'.saveOrUpdateFeedBack - '+appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					res.send(response);
				}
				

				
			}).error(function(err){
				log.info(fileName+'.saveOrUpdateFeedBack - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});
	}; 

	//FeedBack List

	exports.getFeedBackList = function(req, res) {	
		
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
			

		feedbackservice.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		  
		  .then(function(result){
			  
				if(result.length === 0){
					
					log.info(fileName+'.getFeedBackList - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data 	 = "";
					res.send(response);
				} else{

					log.info(fileName+'.getFeedBackList - About '+result.length+' results.');					
					response.status  	= true;
					response.message 	= 'About '+result.length+' results.';
					response.data 		= result;
					res.send(response);
				}
				
			})
			
			.error(function(err){
				log.error(fileName+'.getFeedBackList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});
		};