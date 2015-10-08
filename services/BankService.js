/**
 * @Filename 		: BankService.js 
 * @Description 	: To write Business Logic for Bank. 
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

var bank = require('../models/Bank.js');
var bankBranch = require('../models/BankBranch.js');

// To Get Bank full LIST
exports.getBankDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var bankName=req.param("bankname");
	var status=req.param("status");
	var bankId=req.param("bankid");
	var bankCode=req.param("bankcode");
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
	bank.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	});
	}

//To Get Bank Branchfull LIST
exports.getBankBranchDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var branchName=req.param("branchname");
	var status=req.param("status");
	var bankId=req.param("bankid");
	var branchId=req.param("branchid");
	var branchCode=req.param("branchcode");
	var stateId=req.param("stateid");
	var cityId=req.param("cityid");
	var emailId=req.param("email_id");
    var ifscCode=req.param("ifsccode");

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
	
	
	bankBranch.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	});
	}

//To Save Bank List

exports.saveBankDetails = function(req,res){

	 bank.create({
		 		bank_id    :req.param("bankid"),
				bank_code  :req.param("bankcode"),
				bank_name  :req.param("bankname"), 
				company_id :req.param("companyid"),
				status 	   :req.param("status"),
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby")} ).then(function(p){
					
	
			for(var i=0;i<req.param('bankbranchlist').length;i++){
	bankBranch.create({
		branch_id   :req.param("bankbranchlist")[i].branchid,
		bank_id   :p.bank_id,
		branch_code :req.param("bankbranchlist")[i].branchcode,
		branch_name :req.param("bankbranchlist")[i].branchname, 
		company_id :req.param("bankbranchlist")[i].companyid,
		ifsc_code  :req.param("bankbranchlist")[i].ifsccode,
		address :req.param("bankbranchlist")[i].address,
		pincode 	   :req.param("bankbranchlist")[i].pincode,
		landline_no :req.param("bankbranchlist")[i].landlineno, 
		fax_no 	   :req.param("bankbranchlist")[i].faxno,
		email_id :req.param("bankbranchlist")[i].emailid, 
		contact_person :req.param("bankbranchlist")[i].contactperson,
		contact_no 	   :req.param("bankbranchlist")[i].contactno,
			state_id :req.param("bankbranchlist")[i].stateid, 
		city_id :req.param("bankbranchlist")[i].cityid,
		last_updated_dt:req.param("bankbranchlist")[i].updateddate,
		last_updated_by:req.param("bankbranchlist")[i].updatedby
	}).error(function(err){
		res.send(err);
	});}
			})
			if(req.param("bankid")==undefined){
				res.send('Successfully Added.'); 
				}else{
					res.send('Successfully Updated.'); 

			}
}
