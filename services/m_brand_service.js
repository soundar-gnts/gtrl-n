/**
 * @Filename 		: m_brand_service.js 
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

var brand = require('../models/m_brand.js');

// To Brand full LIST
exports.getBrandDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var brandName=req.param("brandname");
	var status=req.param("status");
	var brandId=req.param("brandid");
	if(brandId!=null){
		conditionQuery ="brand_id="+brandid;
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
	if(brandName!=null){
		if(conditionQuery === ""){
			conditionQuery="brand_name='"+brandName+"'";
		}else {
			conditionQuery=conditionQuery+" and brand_name like '%"+brandName+"%'";
		}
		
	}
	brand.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	});
	}

//To Save Brand List

exports.saveBrandDetails = function(req,res){
	brand.upsert({
		brand_id   :req.param("brandid"),
		brand_name :req.param("brandname"), 
		company_id :req.param("companyid"),
		status 	   :req.param("status"),
		last_updated_dt:req.param("updateddate"),
		last_updated_by:req.param("updatedby"),
	}).error(function(err){
		res.send(err);
	});
	if(req.param("brandid")===null){
	res.send('Successfully Added.');}else{
		res.send('Successfully Updated.');
	}
}

