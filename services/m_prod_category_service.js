/**
 * File Name	:	productCategoryService.js
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
var fs = require("fs");
var imageUploadService = require('../services/imageUploadService.js')
var config = require('../config/config.js');
var Category = require('../models/m_prod_category.js');
var response = {
		status	: Boolean,
		message : String
}

//insert product category
exports.saveOrUpdateproductCategory = function(req, res){
	
	Category.findOne({where : {Prod_cat_id : req.param('Prodcatid')}})
	.then(function(category){
		if(!category){
			
			Category.create({
				prod_cat_name	: req.param('prodcatname'),
			    parent_id		: req.param('parentid'),
			    company_id		: req.param('companyid'),
			    level_no		: req.param('levelno'),
			    last_level		: req.param('lastlevel'),
			    status			: req.param('status'),
				last_updated_dt	: new Date(),
				last_updated_by	: req.param('lastupdatedby'),
				sales_count		: req.param('salescount'),
				refer_parid		: req.param('referparid')
				
			})
			.then(function(c){
				var file1 = config.CATEGORYIMAGEFOLDER + "/"+c.Prod_cat_id+".jpeg";
				var file2 = config.CATEGORYIMAGEFOLDER + "/"+'bg'+c.Prod_cat_id+".jpeg";
				imageUploadService.imageUpload(req.files.img.path, file1);
				imageUploadService.imageUpload(req.files.bgimg.path, file2);
				c.prod_cat_image = config.SERVER+'/'+file1;
				c.prod_cat_bgimage = config.SERVER+'/'+file2;
				c.save().then(function(a){
					log.info('Successfully Inserted.');
					response.message = 'Successfully Inserted.';
					response.status  = true;
					res.send(response);
				});
				
			})
			.error(function(err){
				log.error(err);
				response.message = err;
				response.status  = false;
				res.send(response);
			});
			
		} else{
			var file1 = config.CATEGORYIMAGEFOLDER + "/"+req.param('Prodcatid')+".jpeg";
			var file2 = config.CATEGORYIMAGEFOLDER + "/"+'bg'+req.param('Prodcatid')+".jpeg";
			imageUploadService.imageUpload(req.files.img.path, file1);
			imageUploadService.imageUpload(req.files.bgimg.path, file2);
			
			category.prod_cat_image 	= config.SERVER+'/'+file1;
			category.prod_cat_bgimage 	= config.SERVER+'/'+file2;
			
			category.prod_cat_name		= req.param('prodcatname'),
			category.parent_id			= req.param('parentid'),
			category.company_id			= req.param('companyid'),
			category.level_no			= req.param('levelno'),
			category.last_level			= req.param('lastlevel'),
			category.status				= req.param('status'),
			category.last_updated_dt	= new Date(),
			category.last_updated_by	= req.param('lastupdatedby'),
			category.sales_count		= req.param('salescount'),
			category.refer_parid		= req.param('referparid')
			category.save();
			log.info('Successfully Editted.');
			response.message = 'Successfully Editted.';
			response.status  = false;
			res.send(response);
			
		}
	})
	.error(function(err){
		log.error(err);
		response.message = err;
		response.status  = false;
		res.send(response);
	});
}

//get all product category
exports.getAllProductCategory = function(req, res){

	var condition 		= "";
	var companyId 		= req.param('companyid');
	var status			= req.param('status');
	var productCatName 	= req.param('prodcatname');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
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
	
	Category.findAll({where : [condition]})
		.then(function(categories){
			if(categories.length == 0){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Category List Exist');
				response.message = categories;
				response.status  = false;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

// get one product category
exports.getOneProductCategory = function(req, res){
	Category.findOne({where : {Prod_cat_id : req.param('Prodcatid')}})
		.then(function(category){
			if(!category){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('');
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//get sub category
exports.getSubProductCategory = function(req, res){
	Category.findAll({where : {parent_id : req.param('parentid')}})
		.then(function(category){
			if(category.length == 0){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('');
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//get sub category
exports.getLevelProductCategory = function(req, res){
	Category.findAll({where : {company_id : req.param('companyid'), level_no : req.param('levelno')}})
		.then(function(category){
			if(category.length == 0){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Category List Exist');
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//delete product category
exports.deleteProductCategory = function(req, res){
	Category.findOne({where : {Prod_cat_id : req.param('Prodcatid')}})
		.then(function(category){
			if(!category){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				category.destroy()
				.then(function(cat){
					log.info('Deleted Successfully.');
					response.message = 'Deleted Successfully.';
					response.status  = true;
					res.send(response);
				});
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//change status of Product Category
exports.inactiveOrActiveProductCat = function(req, res){
	Category.findOne({where : {Prod_cat_id : req.param('Prodcatid')}})
		.then(function(cat){
			if(!cat){
				log.info('Empty Category List.');
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				if(cat.status == 'Active')
					cat.status = 'Inactive';
				else
					cat.status = 'Active';
				cat.save()
				log.info('Changed status');
				response.message = 'Changed status';
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}