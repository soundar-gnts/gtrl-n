/**
 * @Filename 		: CurrencyService.js 
 * @Description 	: To write Business Logic for Currency. 
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

var ccy = require('../models/Currency.js');
var appMsg		= require('../config/Message.js');
var log = require('../config/logger').logger;

var response 	= {
						status	: Boolean,
						message : String,
						data	: String
					};

// To Get Bank full LIST
exports.getCcyDetails = function(req, res) {
	var conditionQuery = "";
	var companyId=req.param("companyid");
	var ccyName=req.param("ccyname");
	var status=req.param("status");
	var ccyId=req.param("ccyid");
	var ccyCode=req.param("ccycode");
	if(ccyId!=null){
		conditionQuery ="ccy_id="+ccyId;
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
	if(ccyName!=null){
		if(conditionQuery === ""){
			conditionQuery="ccy_name='"+ccyName+"'";
		}else {
			conditionQuery=conditionQuery+" and ccy_name like '%"+ccyName+"%'";
		}
		
	}
	if(ccyCode!=null){
		if(conditionQuery === ""){
			conditionQuery="ccy_code='"+ccyCode+"'";
		}else {
			conditionQuery=conditionQuery+" and ccy_code like '%"+ccyCode+"%'";
		}
		
	}
	ccy.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]})
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


exports.saveCcyDetails = function(req,res){

	 ccy.upsert({
		 		 ccy_id    :req.param("ccyid"),
		 		ccy_code  :req.param("ccycode"),
		 		ccy_name  :req.param("ccyname"), 
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
