/**
 * @Filename 		: m_company_service.js 
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

var company = require('../models/m_company.js');

// To Company full LIST
exports.getcompanyDetails = function(req, res) {
	company.findAll().then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	})
	}


//To Save Company List

exports.saveCompanyDetails = function(req,res){
	company.findOne({ where :{ company_name:req.param('companyname')}})
	.then(function(result){
		if(!result){
			company.create({
				company_name :req.param("companyname"), 
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
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby"),
			}).error(function(err){
				res.send(err);
			});	res.send('Successfully Added.');
		} else{
			res.send('Company Name already exist.');
		}
	})
	.error(function(err){
		res.send(err);
	});
}

