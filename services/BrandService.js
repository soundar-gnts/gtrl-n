/**
 * @Filename 		: BrandService.js 
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

var brand = require('../models/Brand.js');
var appMsg		= require('../config/Message.js');
var log = require('../config/logger').logger;
var path = require('path');
var fileName=path.basename(__filename);
var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
// To Brand full LIST
exports.getBrandDetails = function(req, res) {
	var attr 	= "";
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
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['brand_id','company_id','brand_name'];
	}
	brand.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info(fileName+'.getBrandDetails - No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			res.send(response);
		} else{
			
			log.info(fileName+'.getBrandDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	})
	.error(function(err){
		log.error(fileName+'.getBrandDetails - ');
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
};

//To Save Brand List

exports.saveBrandDetails = function(req,res){
	brand.upsert({
		brand_id   :req.param("brandid"),
		brand_name :req.param("brandname"), 
		company_id :req.param("companyid"),
		status 	   :req.param("status"),
		last_updated_dt:req.param("updateddate"),
		last_updated_by:req.param("updatedby"),
	}).then(function(err){
		if(err){
			log.info(fileName+'.saveBrandDetails - '+appMsg.SAVEMESSAGE);
			response.message = appMsg.SAVEMESSAGE;
			response.status  = true;
			res.send(response);
		}
		else{
			log.info(fileName+'.saveBrandDetails - '+appMsg.UPDATEMESSAGE);
			response.message = appMsg.UPDATEMESSAGE;
			response.status  = true;
			res.send(response);
		}
		
	}).error(function(err){
		log.error(fileName+'.saveBrandDetails - ');
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}
