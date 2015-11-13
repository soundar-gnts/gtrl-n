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
var slnogen 			= require('../models/SlnoGen.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appMsg				= require('../config/Message.js');
var path 				= require('path');
var fileName			= path.basename(__filename);
// To get full Serial No Generation List
exports.getSlnoGenDetails = function(condition,attr,callback) {
	
	slnogen.findAll({where : [condition],attributes: attr}).then(function(result) {
		if(result.length === 0){
			
			log.info(fileName+'.getSlnoGenDetails - '+appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getSlnoGenDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
		log.error(fileName+'.getSlnoGenDetails - '+err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		callback(response);
	});

}

//To Update curr seqno and last seqno
exports.updateSequenceNo = function(slnoid,lastupdateddt,lastupdatedby) {
	
var values={
		slno_id 			: slnoid
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
					//res.send(response);
			});
				} else{
					log.info(fileName+'.updateSequenceNo - '+appMsg.LISTNOTFOUNDMESSAGE);
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;
					response.data	 = "";
					//res.send(response);
				}
	}).error(function(err){
		log.error(fileName+'.updateSequenceNo - ');
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}

//For get serial no sequence value
exports.getSlnoValue=function(condition, callback){
	
	var sl = {
			slid : String,
			sno : String	
		}
	slnogen.findOne({
		where : [condition],
		attributes: ['slno_id','prefix_key','prefix_cncat','suffix_key','suffix_cncat','curr_seqno']
		
	}).then(function(result) {
		if(result){
			sl.slid = result.slno_id;
			sl.sno = result.prefix_key+""+result.prefix_cncat+""+result.suffix_key+""+result.suffix_cncat+""+result.curr_seqno;
			callback(sl);
		}
		else{
			sl.sno = null;
			sl.slid = null;
			callback(sl);
		}
	});
}