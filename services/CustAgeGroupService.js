/**
 * @Filename 		: CustAgeGroupService.js 
 * @Description 	: To write Business Logic for m_cust_age_group. 
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
var custagegroup = require('../models/CustAgeGroup.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

// To get Customer Age Group based on user param
exports.getCustAgeGroupDetails = function(req, res) {
	var condition 		= "";
	var agegroupid		=req.param("agegroupid");
	var companyid		=req.param("companyid");
	var agegroupname	=req.param("agegroupname");
	var status			=req.param("status");
	if(agegroupid!=null){
		condition ="age_group_id="+agegroupid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(agegroupname!=null){
		if(condition === ""){
			condition="age_group_name like '%"+agegroupname+"%'";
		}else {
			condition=condition+" and age_group_name like '%"+agegroupname+"%'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	custagegroup.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}


// To Save Save/Update Customer Age Group Details
exports.saveCustAgeGroup = function(req, res) {
	custagegroup.upsert({
		age_group_id				: req.param("agegroupid"),
		company_id 					: req.param("companyid"),
		age_group_name 				: req.param("agegroupname"),
		discount_yn 				: req.param("discountyn"),
		status 						: req.param("status"),
		last_updated_dt 			: req.param("lastupdateddt"),
		last_updated_by 			: req.param("lastupdatedby")
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			res.send(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
		
}


