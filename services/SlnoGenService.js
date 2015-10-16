/**
 * @Filename 		: SlnoGenService.js 
 * @Description 	: To write Business Logic for m_slno_gen. 
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
var slnogen = require('../models/SlnoGen.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var path = require('path');
var fileName=path.basename(__filename);
// To get full Serial No Generation List
exports.getSlnoGenDetails = function(req, res) {
	var attr 			= "";
	var condition 		= "";
	var slnoid			=req.param("slnoid");
	var companyid		=req.param("companyid");
	var storeid			=req.param("storeid");
	var refkey			=req.param("refkey");
	var status			=req.param("status");
	var autogenyn=req.param("autogenyn");
	if(slnoid!=null){
		condition ="slno_id="+slnoid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(storeid!=null){
		if(condition === ""){
			condition="store_id='"+storeid+"'";
		}else {
			condition=condition+" and store_id='"+storeid+"'";
		}
	}
	if(refkey!=null){
		if(condition === ""){
			condition="ref_key like '"+refkey+"'";
		}else {
			condition=condition+" and ref_key like '"+refkey+"'";
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
		attr=['prefix_key','prefix_cncat','suffix_key','suffix_cncat','curr_seqno'];
	}
	
	
	slnogen.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			
			log.info(fileName+'.getSlnoGenDetails - '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(fileName+'.getSlnoGenDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(fileName+'.getSlnoGenDetails - '+err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});

}

//To Update curr seqno and last seqno

exports.updateSequenceNo = function(companyid,storeid,refkey,autogenyn,status,lastupdateddt,lastupdatedby) {
	
var values={
		company_id 			: companyid,
		store_id 			: storeid,
		ref_key 			: refkey,
		autogen_yn 			: autogenyn,
		status 				: status
};
	slnogen.findOne({where : [values]}).then(function(result) {
		if(result){
			slnogen.upsert({
				slno_id				: result.slno_id,
				curr_seqno 			: result.curr_seqno + 1 ,
				last_seqno 			: result.curr_seqno,
				last_updated_dt 	: lastupdateddt,
				last_updated_by 	: lastupdatedby
			}).then(function(data){
					log.info(fileName+'.updateSequenceNo - '+appMsg.UPDATEMESSAGE);
					response.message = appMsg.UPDATEMESSAGE;
					response.status  = true;
					res.send(response);
			});
				} else{
					log.info(fileName+'.updateSequenceNo - '+appmsg.LISTNOTFOUNDMESSAGE);
					response.message = appmsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data	 = "";
					res.send(response);
				}
	}).error(function(err){
		log.error(fileName+'.updateSequenceNo - '+err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}

exports.getSlnoValue=function(companyid,storeid,refkey,autogenyn,status,cb){
	var attr 	= "";
	var sno="";
	attr=['prefix_key','prefix_cncat','suffix_key','suffix_cncat','curr_seqno'];
	var values={
			company_id 			: companyid,
			store_id 			: storeid,
			ref_key 			: refkey,
			autogen_yn 			: autogenyn,
			status 				: status
	}
	slnogen.findOne({where : [values],attributes: attr}).then(function(result) {
		sno=result.prefix_key+""+result.prefix_cncat+""+result.suffix_key+""+result.suffix_cncat+""+result.curr_seqno;
		if(result)
			cb(null,sno);
		
		
	});
	
}