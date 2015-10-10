/**
 * @Filename 		: StockTransferService.js
 * @Description 	: To write Business Logic for StockTransfers. 
 * @Author 			: Saranya G
 * @Date 			: October 09, 2015
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
var stocktranshdr  		= require('../models/StockTransferHdr.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response  			= {
							status	: Boolean,
							message : String,
							data	: String
							};

// To get Stock TransferHdr List based on user param

exports.getStocktransferHdr = function(req, res) {
	
	var condition 		= "";
	var transferid		= req.param("transferid");
	var transferrefno	= req.param("transferrefno");
	var companyid		= req.param("companyid");
	var fromStoreid		= req.param("fromStoreid");
	var to_store_id		= req.param("tostoreid");
	var transfer_ctgry	= req.param("transferctgry");
	var transfer_Status	= req.param("transferStatus");
	
	if(transferid!=null){
		condition ="transfer_id="+transferid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(fromStoreid!=null){
		if(condition === ""){
			condition="from_Store_id='"+fromStoreid+"'";
		}else {
			condition=condition+" and from_Store_id='"+fromStoreid+"'";
		}
	}
	if(tostoreid!=null){
		if(condition === ""){
			condition="to_store_id='"+tostoreid+"'";
		}else {
			condition=condition+" and to_store_id='"+tostoreid+"'";
		}
	}
	if(transferrefno!=null){
		if(condition === ""){
			condition="transfer_refno like '%"+transferrefno+"%'";
		}else {
			condition=condition+" and transfer_refno like '%"+transferrefno+"%'";
		}
	}
	if(transferctgry!=null){
		if(condition === ""){
			condition="transfer_ctgry like '%"+transferctgry+"%'";
		}else {
			condition=condition+" and transfer_ctgry like '%"+transferctgry+"%'";
		}
	}
	
	if(transferStatus!=null){
		if(condition === ""){
			condition="transfer_Status='"+transferStatus+"'";
		}else {
			condition=condition+" and transfer_Status='"+transferStatus+"'";
		}
	}
	
	stocktranshdr.findAll({where : [condition],order: [['actioned_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
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

// To Save Save/Update StockTransfer Details

exports.saveTransferDetails = function(req, res) {
	
	stocktranshdr.upsert({
			
		transfer_id					: req.param("transferid"),
		company_id 					: req.param("companyid"),
		transfer_refno 				: req.param("transferrefno"),
		from_Store_id 				: req.param("fromStoreid"),
		to_store_id 				: req.param("tostoreid"),
		transfer_ctgry 				: req.param("transferctgry"),
		transfer_remarks 			: req.param("transferremarks"),	
		transfer_Status 			: req.param("transferStatus"),
		basic_total 				: req.param("basictotal"),
		total_tax 					: req.param("totaltax"),
		total_value 				: req.param("totalvalue"),
		action_remarks 				: req.param("actionremarks"),
		actioned_by 				: req.param("actionedby"),
		actioned_dt 				: req.param("actioneddt"),
		transfered_by 				: req.param("transferedby"),
		
		
	}).then(function(data){
		if(data){
			log.info('Saved Successfully.');
			response.message = 'Saved Successfully.';
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info('Updated Successfully.');
			response.message = 'Updated Successfully.';
			response.status  = true;
			response.data	 = "";
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


