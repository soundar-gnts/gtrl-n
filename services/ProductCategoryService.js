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

var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var fs = require("fs");
var imageUploadService = require('../services/imageUploadService.js')
var config = require('../config/config.js');
var category = require('../models/ProductCategory.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert product categoryp
exports.saveOrUpdateproductCategory = function(req, res){
	
	category.findOne({where : {prod_cat_id : req.param('prodcatid')}})
	.then(function(cat){
		if(!cat){
			
			category.create({
				prod_cat_name	: req.param('prodcatname'),
			    parent_id		: req.param('parentid'),
			    company_id		: req.param('companyid'),
			    level_no		: req.param('levelno'),
			    last_level		: req.param('lastlevel'),
			    status			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
				sales_count		: req.param('salescount'),
				refer_parid		: req.param('referparid')
				
			})
			.then(function(cat){
				var file1 = config.CATEGORYIMAGEFOLDER + "/"+cat.prod_cat_id+".jpeg";
				var file2 = config.CATEGORYIMAGEFOLDER + "/"+'bg'+cat.prod_cat_id+".jpeg";
				imageUploadService.imageUpload(req.files.img.path, file1);
				imageUploadService.imageUpload(req.files.bgimg.path, file2);
				cat.prod_cat_image = config.SERVER+'/'+file1;
				cat.prod_cat_bgimage = config.SERVER+'/'+file2;
				cat.save().then(function(a){
					log.info('Product category saved successfully.');
					response.message = 'Product category saved successfully.';
					response.status  = true;
					res.send(response);
				});
				
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
			
		} else{
			var file1 = config.CATEGORYIMAGEFOLDER + "/"+req.param('prodcatid')+".jpeg";
			var file2 = config.CATEGORYIMAGEFOLDER + "/"+'bg'+req.param('prodcatid')+".jpeg";
			imageUploadService.imageUpload(req.files.img.path, file1);
			imageUploadService.imageUpload(req.files.bgimg.path, file2);
			
			cat.prod_cat_image 	= config.SERVER+'/'+file1;
			cat.prod_cat_bgimage 	= config.SERVER+'/'+file2;
			
			cat.prod_cat_name		= req.param('prodcatname'),
			cat.parent_id			= req.param('parentid'),
			cat.company_id			= req.param('companyid'),
			cat.level_no			= req.param('levelno'),
			cat.last_level			= req.param('lastlevel'),
			cat.status				= req.param('status'),
			cat.last_updated_dt		= new Date(),
			cat.last_updated_by		= req.param('lastupdatedby'),
			cat.sales_count			= req.param('salescount'),
			cat.refer_parid			= req.param('referparid')
			cat.save();
			log.info('Product category editted successfully.');
			response.message = 'Product category editted successfully.';
			response.status  = false;
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
}

//get all product category
exports.getProductCategory = function(req, res){

	var condition 		= "";
	var prodcatid 		= req.param('prodcatid')
	var companyId 		= req.param('companyid');
	var status			= req.param('status');
	var productCatName 	= req.param('prodcatname');
	var parantId		= req.param('parentid');
	var levelNo			= req.param('levelno');
	
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
	
	category.findAll({where : [condition]})
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
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}
