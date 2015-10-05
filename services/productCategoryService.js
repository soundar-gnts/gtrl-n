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
var config = require('../config/config.js');
var Category = require('../models/productCategory.js');
var response = {
		status	: Boolean,
		message : String
}

//insert product category
exports.productCategoryAdd = function(req, res){
	Category.findOne({where : {prod_cat_name : req.param('name')}})
	.then(function(category){
		if(!category){
			
			Category.create({
				prod_cat_name	: req.param('name'),
			    parent_id		: req.param('parantid'),
			    company_id		: req.param('companyid'),
			    level_no		: req.param('levelno'),
			    last_level		: req.param('lastlevel'),
			    status			: req.param('status'),
				last_updated_dt	: new Date(),
				last_updated_by	: req.param('updatedby'),
				sales_count		: req.param('count'),
				refer_parid		: req.param('referparid')
				
			})
			.then(function(c){
				var file1 = config.CATEGORYIMAGEFOLDER + "/"+c.Prod_cat_id+".jpeg";
				var file2 = config.CATEGORYIMAGEFOLDER + "/"+'bg'+c.Prod_cat_id+".jpeg";
				
				fs.readFile( req.files.file1.path, function (err, data) {
					fs.writeFile(file1, data, function (err) {
						if(err){
							response.message = err;
							response.status  = false;
							res.send(response);
						}
					});
				});
				
				fs.readFile( req.files.file2.path, function (err, data) {
					fs.writeFile(file2, data, function (err) {
						if(err){
							response.message = err;
							response.status  = false;
							res.send(response);
						}
					});
				});
				c.prod_cat_image = config.SERVER+'/'+file1;
				c.prod_cat_bgimage = config.SERVER+'/'+file2;
				c.save().then(function(a){
					response.message = 'Successfully Inserted.';
					response.status  = true;
					res.send(response);
				});
				
			})
			.error(function(err){
				response.message = err;
				response.status  = false;
				res.send(response);
			});
			
		} else{
			response.message = 'Category already exist.';
			response.status  = false;
			res.send(response);
			
		}
	})
	.error(function(err){
		res.send(err);
	});
}


//get all product category
exports.returnAllProductCategory = function(req, res){
	Category.findAll()
		.then(function(categories){
			if(categories.length == 0){
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				response.message = categories;
				response.status  = false;
				res.send(response);
			}
		})
		.error(function(err){
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

// get one product category
exports.returnOneProductCategory = function(req, res){
	Category.findOne({where : {Prod_cat_id : req.param('id')}})
		.then(function(category){
			if(!category){
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//get sub category
exports.returnSubProductCategory = function(req, res){
	Category.findAll({where : {parent_id : req.param('id')}})
		.then(function(category){
			if(category.length == 0){
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//get sub category
exports.returnLevelProductCategory = function(req, res){
	Category.findAll({where : {level_no : req.param('level')}})
		.then(function(category){
			if(category.length == 0){
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				response.message = category;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//delete product category
exports.deleteProductCategory = function(req, res){
	Category.findOne({where : {Prod_cat_id : req.param('id')}})
		.then(function(category){
			if(!category){
				response.message = 'Empty Category List.';
				response.status  = false;
				res.send(response);
			} else{
				category.destroy()
				.then(function(cat){
					response.message = 'Deleted Successfully.';
					response.status  = false;
					res.send(response);
				});
			}
		})
		.error(function(err){
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}