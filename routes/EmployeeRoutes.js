/**
 * @Filename	:	EmployeeRoutes.js
 * @Description	:	To write Routing middlewares for Employee Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 06, 2015
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
var employeeService 	= require('../services/EmployeeService.js');
var commonService 		= require('../services/CommonService.js');
module.exports = function(app, server) {
	app.post('/getemployeedetails', getEmployeeDetails);
	app.post('/saveemployee', saveEmployee);
	
	//For save / update employee
	function saveEmployee(req, res){
		
		var employeedtl = {
				employee_id			: req.param("employeeid"),
				company_id			: req.param("companyid"),
				employee_code 		: req.param("employeecode"),
				first_name 			: req.param("firstname"),
				last_name 			: req.param("lastname"),
				primary_phone 		: req.param("primaryphone"),
				dob 				: req.param("dob"),
				gender 				: req.param("gender"),
				department 			: req.param("department"),
				store_id 			: req.param("storeid"),
				rm_employee_id 		: req.param("rmemployeeid"),
				user_id 			: req.param("userid"),
				status 				: req.param("status"),
				last_updated_dt 	: req.param("lastupdateddt"),
				last_updated_by 	: req.param("lastupdatedby"),
				email_id 			: req.param("emailid"),
				create_user_yn 		: req.param("createuseryn")
		}
		
		var userdtl = {		     
				    user_id 		: req.param("userid"),
					login_id		: req.param("emailid"),
					user_name		: req.param("firstname")+' '+req.param("lastname"),
					login_pwd		: commonService.generateOTP(4),
					employee_id		: req.param("employeeid"),
					status			: 'Active',
					company_id		: req.param("companyid"),
					otp_code		: commonService.generateOTP(6),
					last_updated_dt	: req.param("lastupdateddt"),
				    last_updated_by	: req.param("lastupdatedby")
			}
		employeeService.saveEmployee(employeedtl,userdtl,function(result){
			res.send(result);
		});
	}
	
	
	//For save  or update employee details
	function getEmployeeDetails(req, res){
		var attr 			= "";
		var condition 		= "";
		var employeeid		=req.param("employeeid");
		var companyid		=req.param("companyid");
		var employeecode	=req.param("employeecode");
		var firstname		=req.param("firstname");
		var gender			=req.param("gender");
		var storeid			=req.param("storeid");
		var status			=req.param("status");
		var emailid			=req.param("emailid");
		if(employeeid!=null){
			condition ="employee_id="+employeeid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(employeecode!=null){
			if(condition === ""){
				condition="employee_code like '%"+employeecode+"%'";
			}else {
				condition=condition+" and employee_code like '%"+employeecode+"%'";
			}
		}
		if(firstname!=null){
			if(condition === ""){
				condition="first_name like '%"+firstname+"%'";
			}else {
				condition=condition+" and first_name like '%"+firstname+"%'";
			}
		}
		if(gender!=null){
			if(condition === ""){
				condition="gender='"+gender+"'";
			}else {
				condition=condition+" and gender='"+gender+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(emailid!=null){
			if(condition === ""){
				condition="email_id='"+emailid+"'";
			}else {
				condition=condition+" and email_id='"+emailid+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['employee_id','employee_code','first_name','last_name'];
		}
		
		employeeService.getEmployeeDetails(condition,attr,function(result){
			res.send(result);
		});
	}
}

