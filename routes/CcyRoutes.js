/**
 * @Filename 		: CcyRoutes.js 
 * @Description 	: To write Business Logic for Ccy. 
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

var currencyService = require('../services/CurrencyService.js');

module.exports = function(app, server){
	app.post('/getccydetails', getCcyDetails);
	app.post('/saveccydetails', saveCcyDetails);
	
	//For get Currency Details based on user param
	function getCcyDetails(req, res){
		var conditionQuery 		= "";
		var attr 				= "";
		var companyId			=req.param("companyid");
		var ccyName				=req.param("ccyname");
		var status				=req.param("status");
		var ccyId				=req.param("ccyid");
		var ccyCode				=req.param("ccycode");
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
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['ccy_id','ccy_code','ccy_name'];
		}
		console.log("conditionQuery 1->"+conditionQuery);
		currencyService.getCcyDetails(conditionQuery,attr, function(result){
			res.send(result);
		});
	}
	
	//For Save or update Currency Details
	function saveCcyDetails(req, res){
		var ccyobj = {
		 		 	ccy_id   		 :req.param("ccyid"),
			 		ccy_code 		 :req.param("ccycode"),
			 		ccy_name  		 :req.param("ccyname"), 
					company_id	 	 :req.param("companyid"),
					status 		 	 :req.param("status"),
					last_updated_dt	 :req.param("updateddate"),
					last_updated_by  :req.param("updatedby")
				} ;
		console.log(ccyobj);
		currencyService.saveCcyDetails(ccyobj, function(result){
			res.send(result);
		});
		
	}
}