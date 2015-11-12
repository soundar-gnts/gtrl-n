/**
 * @Filename 		: DesignationRoutes.js 
 * @Description 	: To write Business Logic for Designation. 
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

var designationService = require('../services/DesignationService.js');

module.exports = function(app, server){
	app.post('/getdesigndetails', getDesignDetails);
	app.post('/savedesigndetails', saveDesignDetails);
	
	//For save or update designation details
	function saveDesignDetails(req, res){
		var designationobj = {
				designation_id   		:req.param("designationid"),
				designation_name 		:req.param("designationname"), 
				company_id	 			:req.param("companyid"),
				status 	  	 			:req.param("status"),
				last_updated_dt	 		:req.param("updateddate"),
				last_updated_by	 		:req.param("updatedby")
				} ;
		designationService.saveDesignDetails(designationobj,function(result){
			res.send(result);
		});
	}
	
	//For get designation list based on user param
	function getDesignDetails(req, res){
		var conditionQuery		 = "";
		var attr 				 = "";
		var companyId			 =req.param("companyid");
		var designationName		 =req.param("designationname");
		var status				 =req.param("status");
		var designId			 =req.param("designationid");
		if(designId!=null){
			conditionQuery ="designation_id="+designId;
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
		if(designationName!=null){
			if(conditionQuery === ""){
				conditionQuery="designation_name='"+designationName+"'";
			}else {
				conditionQuery=conditionQuery+" and designation_name like '%"+designationName+"%'";
			}
			
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['designation_id','designation_name'];
		}
		designationService.getDesignDetails(conditionQuery,attr,function(result){
			res.send(result);
		});
	}
}