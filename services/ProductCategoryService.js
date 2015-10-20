/**
 * File Name	:	ProductCategoryService.js
 * Description	:	To write Business Logic For Product Category.
 * Author		:	Haris K.A.
 * Date			:	October 05, 2015
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

var path = require('path');
var fileName=path.basename(__filename);
var log					= require('../config/logger').logger;
var common				= require('../services/CommonService.js');
var appMsg				= require('../config/Message.js');
var config 				= require('../config/config.js');
var fs 					= require("fs");
var imageUploadService 	= require('../services/imageUploadService.js')
var category 			= require('../models/ProductCategory.js');


//insert product categoryp
exports.saveOrUpdateproductCategory = function(req, res){
	log.info(fileName+'.saveOrUpdateproductCategory');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var randomNumber = common.generateOTP(6);
	var file1 = 'public/'+config.CATEGORYIMAGEFOLDER + "/"+randomNumber+'.'+req.files.img.type.split('image/')[1];
	var file2 = 'public/'+config.CATEGORYIMAGEFOLDER + "/"+'bg-'+randomNumber+'.'+req.files.bgimg.type.split('image/')[1];
	
	var productCategory = {
			
			prod_cat_id		: req.param('prodcatid'),
			prod_cat_name	: req.param('prodcatname'),
		    parent_id		: req.param('parentid'),
		    company_id		: req.param('companyid'),
		    level_no		: req.param('levelno'),
		    last_level		: req.param('lastlevel'),
		    status			: req.param('status'),
			last_updated_dt	: req.param("lastupdateddt"),
			last_updated_by	: req.param('lastupdatedby'),
			sales_count		: req.param('salescount'),
			refer_parid		: req.param('referparid'),
			prod_cat_image	: config.SERVER+'/'+file1,
			prod_cat_bgimage: config.SERVER+'/'+file2
			
	}
		
	imageUploadService.imageUpload(req.files.img.path, file1);
	imageUploadService.imageUpload(req.files.bgimg.path, file2);
			
	category.upsert(productCategory)
	.then(function(data){
		if(data){
			log.info(appMsg.PRODUCTCATEGORYSAVESUCCESS);
			response.message= appMsg.PRODUCTCATEGORYSAVESUCCESS;
			response.status = true;
			res.send(response);
		} else{
			log.info(appMsg.PRODUCTCATEGORYEDITSUCCESS);
			response.message= appMsg.PRODUCTCATEGORYEDITSUCCESS;
			response.status = true;
			res.send(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERROR;
		response.data  		= err;
		res.send(response);
	});
	
}

//get all product category
exports.getProductCategory = function(req, res){

	log.info(fileName+'.getProductCategory');

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var selectedAttributes	= "";
	var condition 			= "";
	var prodcatid 			= req.param('prodcatid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var productCatName 		= req.param('prodcatname');
	var parantId			= req.param('parentid');
	var levelNo				= req.param('levelno');
	
	if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
		selectedAttributes = ['prod_cat_id','prod_cat_name','level_no']
	}
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(prodcatid!=null)
		if(condition === "")
			condition = "Prod_cat_id='"+prodcatid+"'";
	
		else
			condition = condition+" and Prod_cat_id='"+prodcatid+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(productCatName!=null)
		if(condition === null)
			condition = "prod_cat_name='"+productCatName+"'";
	
		else
			condition = condition+" and prod_cat_name='"+productCatName+"'";
	
	if(parantId!=null)
		if(condition === null)
			condition = "parent_id='"+parantId+"'";
	
		else
			condition = condition+" and parent_id='"+parantId+"'";
	
	if(levelNo!=null)
		if(condition === null)
			condition = "level_no='"+levelNo+"'";
	
		else
			condition = condition+" and level_no='"+levelNo+"'";
	
	category.findAll({
		where		: [condition],
		attributes	: selectedAttributes
	
	})
		.then(function(categories){
			if(categories.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+categories.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+categories.length+' results.';
				response.data 		= categories;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERROR;
			response.data  		= err;
			res.send(response);
		});
}
