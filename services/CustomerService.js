/**
 * @Filename 		: CustomerService.js 
 * @Description 	: To write Business Logic for m_customer. 
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
var customer = require('../models/Customer.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

// To get Customer List based on user param
exports.getCustomerDetails = function(req, res) {
	var attr 	= "";
	var condition = "";
	var custid=req.param("custid");
	var companyid=req.param("companyid");
	var custcode=req.param("custcode");
	var custgroupid=req.param("custgroupid");
	var agegroupid=req.param("agegroupid");
	var cusfirstname=req.param("cusfirstname");
	var gender=req.param("gender");
	var mobileno=req.param("mobileno");
	var status=req.param("status");
	if(custid!=null){
		condition ="cust_id="+custid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(custcode!=null){
		if(condition === ""){
			condition="cust_code like '%"+custcode+"%'";
		}else {
			condition=condition+" and cust_code like '%"+custcode+"%'";
		}
	}
	if(custgroupid!=null){
		if(condition === ""){
			condition="cust_group_id='"+custgroupid+"'";
		}else {
			condition=condition+" and cust_group_id='"+custgroupid+"'";
		}
	}
	if(agegroupid!=null){
		if(condition === ""){
			condition="age_group_id='"+agegroupid+"'";
		}else {
			condition=condition+" and age_group_id='"+agegroupid+"'";
		}
	}
	if(cusfirstname!=null){
		if(condition === ""){
			condition="cus_first_name like '%"+cusfirstname+"%'";
		}else {
			condition=condition+" and cus_first_name like '%"+cusfirstname+"%'";
		}
	}
	if(gender!=null){
		if(condition === ""){
			condition="gender='"+gender+"'";
		}else {
			condition=condition+" and gender='"+gender+"'";
		}
	}
	if(mobileno!=null){
		if(condition === ""){
			condition="mobile_no='"+mobileno+"'";
		}else {
			condition=condition+" and mobile_no='"+mobileno+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['cust_id','cust_code','cus_last_name','cus_first_name'];
	}
	
	customer.findAll({where : [condition],attributes: attr}).then(function(result) {
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




// To Save Save/Update Customer Details
exports.saveCustomer = function(req, res) {
	customer.upsert({
		cust_id				: req.param("custid"),
		cust_code 			: req.param("custcode"),
		gender 				: req.param("gender"),
		credit_yn 			: req.param("credityn"),
		tin_no 				: req.param("tinno"),
		expiry_date 		: req.param("expirydate"),
		address 			: req.param("address"),
		pincode 			: req.param("pincode"),
		landline_no 		: req.param("landlineno"),
		mobile_no 			: req.param("mobileno"),
		email_id 			: req.param("emailid"),
		dob 				: req.param("dob"),
		anniv_date 			: req.param("annivdate"),
		remarks 			: req.param("remarks"),
		status 				: req.param("status"),
		last_updated_dt 	: req.param("lastupdateddt"),
		last_updated_by 	: req.param("lastupdatedby"),
		cus_last_name 		: req.param("cuslastname"),
		cus_first_name 		: req.param("cusfirstname"),
		company_id 			: req.param("companyid"),
		cust_group_id 		: req.param("custgroupid"),
		age_group_id 		: req.param("agegroupid"),
		state_id 			: req.param("stateid"),
		city_id 			: req.param("cityid")
		
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


