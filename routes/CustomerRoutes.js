/**
 * @Filename	:	CustomerRoutes.js
 * @Description	:	To write Routing middlewares For Customer related tables.
 * @Author		:	SOUNDAR C
 * @Date		:	October 08, 2015
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
var customerService 	= require('../services/CustomerService.js');
var customerTypeService = require('../services/CustomerTypeService.js');
var custAgeGroupService = require('../services/CustAgeGroupService.js');
var state				= require('../models/State.js');
var city				= require('../models/City.js');


module.exports = function(app, server) {
	//For Customer
	app.post('/getcustomerdetails', getCustomerDetails);
	app.post('/savecustomer', saveCustomer);
	//For Customer Type
	app.post('/getcustomertypedetails', getCustomerTypeDetails);
	app.post('/savecustomertype', saveCustomerType);
	//For Customer age group
	app.post('/getcustagegroupdetails', getCustAgeGroupDetails);
	app.post('/savecustagegroup', saveCustAgeGroup);
	
	// To get Customer Age Group based on user param
	function getCustAgeGroupDetails(req, res){
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
		custAgeGroupService.getCustAgeGroupDetails(condition,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update Customer Age Group Details
	function saveCustAgeGroup(req, res){
		var agegroupobj={
				age_group_id				: req.param("agegroupid"),
				company_id 					: req.param("companyid"),
				age_group_name 				: req.param("agegroupname"),
				discount_yn 				: req.param("discountyn"),
				status 						: req.param("status"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
				
			};
		custAgeGroupService.saveCustAgeGroup(agegroupobj,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update Customer Type Details
	function saveCustomerType(req, res){
		var custtypeobj={
				cust_group_id				: req.param("custgroupid"),
				company_id 					: req.param("companyid"),
				cust_group_name 			: req.param("custgroupname"),
				discount_yn 				: req.param("discountyn"),
				status 						: req.param("status"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
				
			};
		customerTypeService.saveCustomerType(custtypeobj,function(result){
			res.send(result);
		});
	}
	
	// To get Customer Type List based on user param
	function getCustomerTypeDetails(req, res){
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
		
		customerTypeService.getCustomerTypeDetails(condition,function(result){
			res.send(result);
		});
	}
	
	
	// To get Customer List based on user param
	function getCustomerDetails(req, res){
		var attr 			= "";
		var condition 		= "";
		var custid			=req.param("custid");
		var companyid		=req.param("companyid");
		var custcode		=req.param("custcode");
		var custgroupid		=req.param("custgroupid");
		var agegroupid		=req.param("agegroupid");
		var cusfirstname	=req.param("cusfirstname");
		var gender			=req.param("gender");
		var mobileno		=req.param("mobileno");
		var status			=req.param("status");
				
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
		
		customerService.getCustomerDetails(condition,attr,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update Customer Details
	function saveCustomer(req, res){
		var customerobj = {
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
				
			};
		customerService.saveCustomer(customerobj, function(result){
			res.send(result);
		});
	}
	
	//For get customer details based on user param
	function getCustomerDetails(req, res){
		var selectedAttributes 			= "";
		var condition 			= "";
		var custid				=req.param("custid");
		var companyid			=req.param("companyid");
		var custcode			=req.param("custcode");
		var custgroupid			=req.param("custgroupid");
		var agegroupid			=req.param("agegroupid");
		var cusfirstname		=req.param("cusfirstname");
		var gender				=req.param("gender");
		var mobileno			=req.param("mobileno");
		var status				=req.param("status");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : state, attributes : ['state_name']},
			                    {model : city, attributes : ['city_name']}];
		}
		
		if(custid!=null){
			condition ="cust_id="+custid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="m_customer.company_id='"+companyid+"'";
			}else {
				condition=condition+" and m_customer.company_id='"+companyid+"'";
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
				condition="m_customer.status='"+status+"'";
			}else {
				condition=condition+" and m_customer.status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			selectedAttributes=['cust_id','cust_code','cus_last_name','cus_first_name'];
		}
		customerService.getCustomerDetails(condition, selectedAttributes,fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	//For save / update customer
	function saveCustomer(req, res){
		var customer = {
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
		
		}
		customerService.saveCustomer(customer, function(response){
			res.send(response);
		});
	}
	
	//For get customer type details based on user param
	function getCustomerTypeDetails(req, res){
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
		
		customerTypeService.getCustomerTypeDetails(condition, function(response){
			res.send(response);
		})
	}
	
	//For save / update customer type 
	function saveCustomerType(req, res){
		var custType = {
				cust_group_id				: req.param("custgroupid"),
				company_id 					: req.param("companyid"),
				cust_group_name 			: req.param("custgroupname"),
				discount_yn 				: req.param("discountyn"),
				status 						: req.param("status"),
				last_updated_dt 			: req.param("lastupdateddt"),
				last_updated_by 			: req.param("lastupdatedby")
				
			}
		customerTypeService.saveCustomerType(custType, function(response){
			res.send(response);
		});
	}
	
	//For get customer age group list based on user param
	function getCustAgeGroupDetails(req, res){
		
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
		
		custAgeGroupService.getCustAgeGroupDetails(condition, function(response){
			res.send(response);
		});
	}
	
	//For save / update customer age group
	function saveCustAgeGroup(req, res){
		var custAgeGrp = {
		age_group_id				: req.param("agegroupid"),
		company_id 					: req.param("companyid"),
		age_group_name 				: req.param("agegroupname"),
		discount_yn 				: req.param("discountyn"),
		status 						: req.param("status"),
		last_updated_dt 			: req.param("lastupdateddt"),
		last_updated_by 			: req.param("lastupdatedby")
		
	}
		custAgeGroupService.saveCustAgeGroup(custAgeGrp, function(response){
			res.send(response);
		});
	}
}

