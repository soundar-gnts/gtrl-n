/**
 * @Filename 		: CompanyRoutes.js 
 * @Description 	: To write Business Logic for Company. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 *	0.1			7-10-2015		Arun Jeyaraj R		change method type for getcompanydetails
 * 
 */

var companyservice = require('../services/CompanyService.js');

module.exports = function(app, server){
	app.post('/getcompanydetails', getcompanyDetails);
	app.post('/savecompanydetails', saveCompanyDetails);
	
	// To Company full LIST
	function getcompanyDetails(req, res){
		var attr 			= "";
		var conditionQuery 	= "";
		var companyId		=req.param("companyid");
		var conpanyName		=req.param("companyname");
		var status			=req.param("status");
		var emailId			=req.param("email_id");
		var stateId			=req.param("stateid");
		var cityId			=req.param("cityid");
		
		if(companyId!=null){
			conditionQuery ="company_id="+companyId;
			}
		if(conpanyName!=null){
			if(conditionQuery === ""){
				conditionQuery ="company_name like '%"+conpanyName+"%'";
			}else {
				conditionQuery=conditionQuery+" and company_name like '%"+conpanyName+"%'";
			}	
		}
		
		if(status!=null){
			if(conditionQuery === ""){
				conditionQuery="status='"+status+"'";
			}else {
				conditionQuery=conditionQuery+" and status='"+status+"'";
			}
		}
		if(emailId!=null){
			if(conditionQuery === ""){
				conditionQuery="email_id like '%"+emailId+"%'";
			}else {
				conditionQuery=conditionQuery+" and email_id like '%"+emailId+"%'";
			}
			
		}
		if(stateId!=null){
			if(conditionQuery === ""){
				conditionQuery ="state_id="+stateId;
			}else {
				conditionQuery=conditionQuery+" and state_id="+stateId;
			}	
			}
		
		if(cityId!=null){
			if(conditionQuery === ""){
				conditionQuery ="city_id="+cityId;
			}else {
				conditionQuery=conditionQuery+" and city_id="+cityId;
			}	
			}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['company_id','email_id'];
		}
		companyservice.getcompanyDetails(conditionQuery,attr, function(result){
			res.send(result);
		});
	}
	
	//For save / update company details
	function saveCompanyDetails(req, res){
		
		var companyobj={
				company_id 			:req.param("companyid"),
				company_name 		:req.param("companyname"), 
				address 			:req.param("address"),
				pincode 	        :req.param("pincode"),
				landline_no			:req.param("landlineno"), 
				mobile_no 			:req.param("mobileno"),
				fax_no 	  			:req.param("faxno"),
				email_id 			:req.param("emailid"), 
				contact_person 		:req.param("contactperson"),
				contact_no 	  		:req.param("contactno"),
				remarks 			:req.param("remarks"), 
				status 				:req.param("status"),
				state_id 			:req.param("stateid"), 
				city_id				:req.param("cityid"),
				last_updated_dt		:req.param("updateddate"),
				last_updated_by		:req.param("updatedby"),
			};
		companyservice.saveCompanyDetails(companyobj, function(result){
			res.send(result);
		});
	}
}