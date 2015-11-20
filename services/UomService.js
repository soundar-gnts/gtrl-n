/**
 * File Name	:	UomService.js
 * Description	:	To write Business Logic For Uom.
 * Author		:	Haris K.A.
 * Date			:	October 07, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 * 
 */

var path 		= require('path');
var fileName	= path.basename(__filename);
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var uom 		= require('../models/Uom.js');
var response 	= {
					status	: Boolean,
					message : String,
					data	: String
				  }

//insert or update Uom
exports.saveOrUpdateUom = function(oumobj,callback){
	log.info(fileName+'.saveOrUpdateUom');
	uom.upsert(oumobj).then(function(data){
		if(data){
			log.info(appMsg.UOMSAVESUCCESS);
			response.message = appMsg.UOMSAVESUCCESS;
			response.status  = true;
			response.data  	 = "";
			callback(response);
		} else{
			log.info(appMsg.UOMEDITSUCCESS);
			response.message = appMsg.UOMEDITSUCCESS;
			response.status  = true;
			response.data  	 = "";
			callback(response);
		}
		
	}).error(function(err){
		log.error(fileName+'.saveOrUpdateUom - '+err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}


//get UOM list based on user param
exports.getUom = function(condition, selectedAttributes, callback) {
	log.info(fileName + '.getUom');

	uom.findAll({
		where : [ condition ],
		attributes : selectedAttributes

	}).then(
			function(uoms) {
				if (uoms.length == 0) {
					log.info(fileName + '.getUom - '
							+ appMsg.LISTNOTFOUNDMESSAGE);
					response.message 	= appMsg.LISTNOTFOUNDMESSAGE;
					response.status 	= false;
					response.data 		= uoms;
					callback(response);
				} else {
					log.info(fileName + '.getUom - About ' + uoms.length
							+ ' results.');
					response.status 	= true;
					response.message 	= 'About ' + uoms.length + ' results.';
					response.data		= uoms;
					callback(response);
				}
			}).error(function(err) {
		log.error(fileName + '.getUom - ');
		log.error(err);
		response.status 	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data 		= err;
		callback(response);
	});
}
