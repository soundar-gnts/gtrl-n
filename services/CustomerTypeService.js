/**
 * @Filename 		: CustomerTypeService.js 
 * @Description 	: To write Business Logic for m_customer_type. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 08, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var customertype 		= require('../models/CustomerType.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');

var path 				= require('path');
var filename			= path.basename(__filename);

// To get Customer Type List based on user param
exports.getCustomerTypeDetails = function(req, res) {
	var condition 		= "";
	var custgroupid		=req.param("custgroupid");
	var companyid		=req.param("companyid");
	var custgroupname	=req.param("custgroupname");
	var status			=req.param("status");
	if(custgroupid!=null){
		condition ="cust_group_id="+custgroupid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(custgroupname!=null){
		if(condition === ""){
			condition="cust_group_name like '%"+custgroupname+"%'";
		}else {
			condition=condition+" and cust_group_name like '%"+custgroupname+"%'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	customertype.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getCustomerTypeDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getCustomerTypeDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getCustomerTypeDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}


// To Save Save/Update Customer Type Details
exports.saveCustomerType = function(req, res) {
	customertype.upsert({
		cust_group_id				: req.param("custgroupid"),
		company_id 					: req.param("companyid"),
		cust_group_name 			: req.param("custgroupname"),
		discount_yn 				: req.param("discountyn"),
		status 						: req.param("status"),
		last_updated_dt 			: req.param("lastupdateddt"),
		last_updated_by 			: req.param("lastupdatedby")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveCustomerType>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info(filename+'>>saveCustomerType>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveCustomerType>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}


