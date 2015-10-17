/**
 * @Filename 		: WishorderListService.js 
 * @Description 	: To write Business Logic for t_wishorder_list. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 17, 2015
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
var wishorderlist = require('../models/WishorderList.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');

var path = require('path');
var filename=path.basename(__filename);

// To get Wishorder List based on user param
exports.getWishorderList = function(req, res) {
	var condition 		= "";
	var wishid			=req.param("wishid");
	var companyid		=req.param("companyid");
	var productid		=req.param("productid");
	var customerid		=req.param("customerid");
	var status			=req.param("status");
	if(wishid!=null){
		condition ="wish_id="+wishid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	if(customerid!=null){
		if(condition === ""){
			condition="customer_id='"+customerid+"'";
		}else {
			condition=condition+" and customer_id='"+customerid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	wishorderlist.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getWishorderList>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getWishorderList>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getWishorderList>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}


// To Save Save/Update Wishorder List Details
exports.saveWishorderList = function(req, res) {
	wishorderlist.upsert({
		wish_id					: req.param("wishid"),
		company_id 				: req.param("companyid"),
		customer_id 			: req.param("customerid"),
		product_id 				: req.param("productid"),
		status 					: req.param("status"),
		rating 					: req.param("rating")
		
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveWishorderList>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info(filename+'>>saveWishorderList>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveWishorderList>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}

