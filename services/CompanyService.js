/**
 * @Filename 		: CompanyService.js 
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
 *	0.1			7-10-2015		Arun Jeyaraj R		changes in getList and Save method   
 * 
 */

var company = require('../models/Company.js');
var appMsg		= require('../config/Message.js');

var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
	

// To Company full LIST
exports.getcompanyDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var conpanyName=req.param("companyname");
	var status=req.param("status");
	var emailId=req.param("email_id");
	var stateId=req.param("stateid");
	var cityId=req.param("cityid");
	
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
	company.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info('No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
};

//To Save Company List

exports.saveCompanyDetails = function(req,res){
	company.upsert({
		company_id : req.param("companyid"),
		company_name :req.param("companyname"), 
		address :req.param("address"),
		pincode 	   :req.param("pincode"),
		landline_no :req.param("landlineno"), 
		mobile_no :req.param("mobileno"),
		fax_no 	   :req.param("faxno"),
		email_id :req.param("emailid"), 
		contact_person :req.param("contactperson"),
		contact_no 	   :req.param("contactno"),
		remarks :req.param("remarks"), 
		status :req.param("status"),
		state_id :req.param("stateid"), 
		city_id :req.param("cityid"),
		last_updated_dt:req.param("updateddate"),
		last_updated_by:req.param("updatedby"),
	}).then(function(err){
		if(err){
			res.send("Company Added Succesfully");}else{
				res.send("Company Updated Succesfully");
			}
		
	})
}
		