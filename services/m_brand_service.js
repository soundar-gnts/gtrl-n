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
 * 
 * 
 */

var brand = require('../models/m_brand.js');

// To Brand full LIST
exports.getBrandDetails = function(req, res) {
	brand.findAll({ where :{ company_id:req.param('companyid')}}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	});
	}

//To Save Brand List

exports.saveBrandDetails = function(req,res){
	brand.findOne({ where :{ brand_name:req.param('brandname'),company_id:req.param("companyid")}})
	.then(function(result){
		if(!result){
			brand.create({
				brand_name :req.param("brandname"), 
				company_id :req.param("companyid"),
				status 	   :req.param("status"),
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby"),
			}).error(function(err){
				res.send(err);
			});	res.send('Successfully Added.');
		} else{
			res.send('Brand Name already exist.');
		}
	})
	.error(function(err){
		res.send(err);
	});
}

