/**
 * @Filename 		: TxnsTypeService.js 
 * @Description 	: To write Business Logic for transaction type. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 03, 2015
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
var txnstype = require('../models/TxnsType.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
// To get full Transaction Type List
exports.getTxnsTypeDetails = function(req, res) {
	var attr 			= "";
	var condition 		= "";
	var transtypeid		=req.param("transtypeid");
	var companyid		=req.param("companyid");
	var transtypename	=req.param("transtypename");
	var status			=req.param("status");
	if(transtypeid!=null){
		condition ="trans_type_id="+transtypeid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(transtypename!=null){
		if(condition === ""){
			condition="trans_type_name like '%"+transtypename+"%'";
		}else {
			condition=condition+" and trans_type_name like '%"+transtypename+"%'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
		attr=['trans_type_id','trans_type_name','cr_dr'];
	}
	
	txnstype.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			
			log.info(appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
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




// To Save Transaction Type
exports.saveTxnsType = function(req, res) {
	txnstype.upsert({
		trans_type_id		: req.param("transtypeid"),
		company_id 			: req.param("companyid"),
		trans_type_name		: req.param("transtypename"),
		cr_dr				: req.param("crdr"),
		status				: req.param("status"),
		last_updated_dt 	: req.param("lastupdateddt"),
		last_updated_by 	: req.param("lastupdatedby")
	}).then(function(data){
		if(data){
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


