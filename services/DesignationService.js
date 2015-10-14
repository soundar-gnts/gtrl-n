/**
 * @Filename 		: DesignationService.js 
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

var designation = require('../models/Designation.js');
var appMsg		= require('../config/Message.js');

var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};
// To Get Bank full LIST
exports.getDesignDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var designationName=req.param("designationname");
	var status=req.param("status");
	var designId=req.param("designationid");
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
		
	}designation.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info('No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
};

exports.saveDesignDetails = function(req,res){

	designation.upsert({
		designation_id    :req.param("designationid"),
		designation_name  :req.param("designationname"), 
			     	company_id :req.param("companyid"),
				  status 	   :req.param("status"),
				last_updated_dt:req.param("updateddate"),
				last_updated_by:req.param("updatedby")} ).then(function(err){

					if(err){
						log.info('Saved Successfully.');
						response.message = 'Saved Successfully.';
						response.status  = true;
						res.send(response);
					}
					else{
						log.info('Updated Successfully.');
						response.message = 'Updated Successfully.';
						response.status  = true;
						res.send(response);
					}
					
				}).error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}
