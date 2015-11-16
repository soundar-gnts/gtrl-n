/**
 * @Filename 		: BankRoutes.js 
 * @Description 	: To write Business Logic for BankRoutes. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
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

var bankservice 		= require('../services/BankService.js');
var bank 				= require('../models/Bank.js');

module.exports = function(app, server){
	app.post('/getbankdetails', getBankDetails);
	app.post('/getbankbranchdetails', getBankBranchDetails);
	app.post('/savebankdetails', saveBankDetails);
	
	// To Get Bank full based on user param
	function getBankDetails(req, res){
		
		var conditionQuery 		= "";
		var attr 				= "";
		var companyId			= req.param("companyid");
		var bankName			= req.param("bankname");
		var status				= req.param("status");
		var bankId				= req.param("bankid");
		var bankCode			= req.param("bankcode");
		if(bankId!=null){
			conditionQuery ="bank_id="+bankId;
			}
		if(companyId!=null){
			if(conditionQuery === ""){
				conditionQuery ="company_id="+companyId;
			}else {
				conditionQuery=conditionQuery+" and company_id="+companyId;
			}	
			}
		
		if(status!=null){
			if(conditionQuery === ""){
				conditionQuery="status='"+status+"'";
			}else {
				conditionQuery=conditionQuery+" and status='"+status+"'";
			}
		}
		if(bankName!=null){
			if(conditionQuery === ""){
				conditionQuery="bank_name='"+bankName+"'";
			}else {
				conditionQuery=conditionQuery+" and bank_name like '%"+bankName+"%'";
			}
			
		}
		if(bankCode!=null){
			if(conditionQuery === ""){
				conditionQuery="bank_code='"+bankCode+"'";
			}else {
				conditionQuery=conditionQuery+" and bank_code like '%"+bankCode+"%'";
			}
			
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['bank_id','bank_code','bank_name'];
		}
		
		bankservice.getBankDetails(conditionQuery,attr, function(result){
			res.send(result);
		});
		
	}
	//To Get Bank Branchfull based on user param
	function getBankBranchDetails(req, res){
		var conditionQuery 		= "";
		var attr 				= "";
		var companyId			= req.param("companyid");
		var branchName			= req.param("branchname");
		var status				= req.param("status");
		var bankId				= req.param("bankid");
		var branchId			= req.param("branchid");
		var branchCode			= req.param("branchcode");
		var stateId				= req.param("stateid");
		var cityId				= req.param("cityid");
		var emailId				= req.param("emailid");
	    var ifscCode			= req.param("ifsccode");
	    var fetchAssociation	= "";
	    
	    if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : bank, attributes : ['bank_name','bank_code']}]
		}
	    
	    
		if(bankId!=null){
			conditionQuery ="bank_id="+bankId;
		}
		if(branchId!=null){
			if(conditionQuery === ""){
				conditionQuery ="branch_id="+branchId;
			}else {
				conditionQuery=conditionQuery+" and branch_id="+branchId;
			}	
			}
		
		if(companyId!=null){
			if(conditionQuery === ""){
				conditionQuery ="company_id="+companyId;
			}else {
				conditionQuery=conditionQuery+" and company_id="+companyId;
			}	
			}
		
		if(status!=null){
			if(conditionQuery === ""){
				conditionQuery="status='"+status+"'";
			}else {
				conditionQuery=conditionQuery+" and status='"+status+"'";
			}
		}
		if(branchName!=null){
			if(conditionQuery === ""){
				conditionQuery="branch_name='"+branchName+"'";
			}else {
				conditionQuery=conditionQuery+" and branch_name like '%"+branchName+"%'";
			}
			
		}
		if(branchCode!=null){
			if(conditionQuery === ""){
				conditionQuery="branch_code='"+branchCode+"'";
			}else {
				conditionQuery=conditionQuery+" and branch_code like '%"+branchCode+"%'";
			}
		}
		if(emailId!=null){
			if(conditionQuery === ""){
				conditionQuery="email_id like '%"+emailId+"%'";
			}else {
				conditionQuery=conditionQuery+" and email_id like '%"+emailId+"%'";
			}
			
		}
		if(ifscCode!=null){
			if(conditionQuery === ""){
				conditionQuery="ifsc_code like '%"+ifscCode+"%'";
			}else {
				conditionQuery=conditionQuery+" and ifsc_code like '%"+ifscCode+"%'";
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
			attr=['branch_id','branch_code','branch_name'];
		}
		
		bankservice.getBankBranchDetails(conditionQuery,attr,fetchAssociation, function(result){
			res.send(result);
		});
	}
	//To Save Bank and bank branch list
	function saveBankDetails(req, res){
		var bankobj={		
				bank_id      	:req.param("bankid"),
				bank_code    	:req.param("bankcode"),
				bank_name    	:req.param("bankname"), 
				company_id   	:req.param("companyid"),
				status 	     	:req.param("status"),
				last_updated_dt	:req.param("updateddate"),
				last_updated_by	:req.param("updatedby")
			};
		
		var bankbranchlist = [];
		
		if(req.param('bankbranchlist') != null){
	 		req.param('bankbranchlist').forEach(function(bankbranch){
	 			var bankbranchobj = {
	 					branch_id  			 :bankbranch.branchid,
	 					bank_id    		     :req.param("bankid"),	
	 					branch_code			 :bankbranch.branchcode,
	 					branch_name 		 :bankbranch.branchname, 
	 					company_id 			 :bankbranch.companyid,
	 					ifsc_code 			 :bankbranch.ifsccode,
	 					address 			 :bankbranch.address,
	 					pincode 	   	     :bankbranch.pincode,
	 					landline_no			 :bankbranch.landlineno, 
	 					fax_no 	   			 :bankbranch.faxno,
	 					email_id 			 :bankbranch.emailid, 
	 					contact_person 	   	 :bankbranch.contactperson,
	 					contact_no 	  		 :bankbranch.contactno,
	 					state_id  			 :bankbranch.stateid, 
	 					city_id 			 :bankbranch.cityid,
	 					last_updated_dt		 :bankbranch.updateddate,
	 					last_updated_by		 :bankbranch.updatedby
	 				}
	 			bankbranchlist.push(bankbranchobj);
	 		});
		}
		bankservice.saveBankDetails(bankobj, bankbranchlist, function(response){
			res.send(response);
		});
	}
	
}