/**
 * @Filename 		: BrandRoutes.js 
 * @Description 	: To write Business Logic for Brand. 
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

var brandservice = require('../services/BrandService.js');

module.exports = function(app, server){
	app.post('/getbranddetails', getBrandDetails);
	app.post('/savebranddetails', saveBrandDetails);
	
	// To Brand full based on user param
	function getBrandDetails(req, res){
		var attr 				= "";
		var conditionQuery 		= "";
		var companyId			=req.param("companyid");
		var brandName			=req.param("brandname");
		var status				=req.param("status");
		var brandId				=req.param("brandid");
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
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['brand_id','company_id','brand_name'];
		}
		brandservice.getBrandDetails(conditionQuery,attr, function(result){
			res.send(result);
		});
		
	}
	//To Save Brand List
	function saveBrandDetails(req, res){
		var brandobj={
				brand_id   :req.param("brandid"),
				brand_name :req.param("brandname"), 
				company_id :req.param("companyid"),
				status 	   :req.param("status"),
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby"),
			};
		brandservice.saveBrandDetails(brandobj, function(result){
			res.send(result);
		});
	}
}