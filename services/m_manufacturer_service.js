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
 * 
 * 
 */

var manufac = require('../models/m_manufacturer.js');

// To get full Manufacturer List
exports.getmanufactDetails = function(req, res) {
	manufac.findAll({ where :{ company_id:req.param('companyid')}}).then(function(err, result) {
		if(err)
			res.send(err);
		else
			res.send(result);
	})
	}




//To Save Manufacturer List

exports.saveManufacDetails = function(req,res){
	manufac.create
	({
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
			}).then(function(err,result){
				if(err){
				res.send(err);}else{
					res.send('Successfully Added.');
				}
			});
		
}


