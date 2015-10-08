/**
 * @Filename 		: m_manufacturer_service.js 
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

var manufac = require('../models/Manufacturer.js');

// To get full Manufacturer List
exports.getmanufactDetails = function(req, res) {
	var conditionQuery = "";
	var manufgId=req.param("manufgid");
	var manufgName=req.param("manufgname");
	var status=req.param("status");
	var companyId=req.param("companyid");
	var stateId=req.param("stateid");
	var cityId=req.param("cityid");
	var manufgCode=req.param("manufgcode");

	if(manufgId!=null){
		conditionQuery ="manufg_id="+manufgId;
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
	
	manufac.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	});
	}





//To Save Manufacturer List

exports.saveManufacDetails = function(req,res){
	manufac.upsert
	({
				manufg_id   :req.param("manufgid"),
				office_type :req.param("officetype"), 
				manufg_code :req.param("manufgcode"),
				manufg_name 	   :req.param("manufgname"),
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
				parent_id :req.param("parentid"), 
				company_id :req.param("companyid"),
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby"),
	}).error(function(err){
		res.send(err);
	});
	if(req.param("manufgid")===null){
	res.send('Successfully Added.');}else{
		res.send('Successfully Updated.');
	}
}
