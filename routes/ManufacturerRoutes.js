/**
 * @Filename 		: ManufacturerRoutes.js 
 * @Description 	: To write Business Logic for Manufacturer. 
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

var manufacturerservice = require('../services/ManufacturerService.js');
var city 				= require('../models/City.js');
var state 				= require('../models/State.js');

module.exports = function(app, server){
	app.post('/getmanufactdetails', getmanufactDetails);
	app.post('/savemanufacdetails', saveManufacDetails);
	
	//For save / update manufactuer details
	function saveManufacDetails(req, res){
		var manufactobj = {
				manufg_id 				  :req.param("manufgid"),
				office_type 		      :req.param("officetype"), 
				manufg_code				  :req.param("manufgcode"),
				manufg_name 		      :req.param("manufgname"),
				address					  :req.param("address"),
				pincode 		   		  :req.param("pincode"),
				landline_no 			  :req.param("landlineno"), 
				mobile_no 				  :req.param("mobileno"),
				fax_no 	  				  :req.param("faxno"),
				email_id				  :req.param("emailid"), 
				contact_person			  :req.param("contactperson"),
				contact_no 	 			  :req.param("contactno"),
				remarks					  :req.param("remarks"), 
				status 					  :req.param("status"),
				state_id 				  :req.param("stateid"), 
				city_id					  :req.param("cityid"),
				parent_id 				  :req.param("parentid"), 
				company_id 				  :req.param("companyid"),
				last_updated_dt			  :req.param("updateddate"),
				last_updated_by			  :req.param("updatedby"),
		};
		
		manufacturerservice.saveManufacDetails(manufactobj,function(result){
			res.send(result);
		});
	}
	
	//To get Manufacturer details based on user param
	function getmanufactDetails(req, res){
		var conditionQuery 		= "";
		var attr 				= "";
		var manufgId			= req.param("manufgid");
		var manufgName			= req.param("manufgname");
		var status				= req.param("status");
		var companyId			= req.param("companyid");
		var stateId				= req.param("stateid");
		var cityId				= req.param("cityid");
		var manufgCode			= req.param("manufgcode");
		var fetchAssociation 	= "";

		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : state, attributes : ['state_name']},{model : city, attributes : ['city_name']}]
		}
		
		if(manufgId!=null){
			conditionQuery ="manufg_id="+manufgId;
			}
		if(companyId!=null){
			if(conditionQuery === ""){
				conditionQuery ="m_manufacturer.company_id="+companyId;
			}else {
				conditionQuery=conditionQuery+" and m_manufacturer.company_id="+companyId;
			}	
		}
		
		if(status!=null){
			if(conditionQuery === ""){
				conditionQuery="m_manufacturer.status='"+status+"'";
			}else {
				conditionQuery=conditionQuery+" and m_manufacturer.status='"+status+"'";
			}
		}
		if(manufgName!=null){
			if(conditionQuery === ""){
				conditionQuery="manufg_name='"+manufgName+"'";
			}else {
				conditionQuery=conditionQuery+" and manufg_name like '%"+manufgName+"%'";
			}
			
		}
		if(manufgCode!=null){
			if(conditionQuery === ""){
				conditionQuery="manufg_code='"+manufgCode+"'";
			}else {
				conditionQuery=conditionQuery+" and manufg_code like '%"+manufgCode+"%'";
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
			attr=['manufg_id','manufg_name','manufg_code'];
		}
		manufacturerservice.getmanufactDetails(conditionQuery,attr,fetchAssociation,function(result){
			res.send(result);
		});
	}
}