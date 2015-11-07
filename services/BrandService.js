/**
 * @Filename 		: BrandService.js 
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
 *	0.1			7-10-2015		Arun Jeyaraj R		changes in getList and Save method   
 * 
 */

var brand 		= require('../models/Brand.js');
var appMsg		= require('../config/Message.js');
var log 		= require('../config/logger').logger;
var path 		= require('path');
var fileName	=path.basename(__filename);
var response 	= {		status	: Boolean,
						message : String,
						data	: String
				};
// To Brand full based on user param
exports.getBrandDetails = function(conditionQuery,attr,callback) {
	
	brand.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info(fileName+'.getBrandDetails - No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getBrandDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
			log.error(fileName+'.getBrandDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
};

//To Save Brand List
exports.saveBrandDetails = function(brandobj,callback){
	brand.upsert(brandobj).then(function(err){
		if(err){
			log.info(fileName+'.saveBrandDetails - '+appMsg.SAVEMESSAGE);
			response.message 	= appMsg.SAVEMESSAGE;
			response.status  	= true;
			callback(response);
		}
		else{
			log.info(fileName+'.saveBrandDetails - '+appMsg.UPDATEMESSAGE);
			response.message 	= appMsg.UPDATEMESSAGE;
			response.status  	= true;
			callback(response);
		}
		
	}).error(function(err){
			log.error(fileName+'.saveBrandDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}
