/**
 * File Name	:	ProductCategoryRoutes.js
 * Description	:	To write Routing middlewares For Product Category.
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

var productCategoryService = require('../services/ProductCategoryService.js');

module.exports = function(app, server){
	
	app.post('/saveproductcategorydetails',	productCategoryService.saveOrUpdateproductCategory);
	app.post('/getproductcategorydetails', 	getProductCategory);
	
	//To get product category list based on user param
	function getProductCategory(req, res){
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
		
		if(companyId != null){
			condition = "company_id="+companyId;
		}
		
		if(prodcatid!=null){
			if(condition === ""){
				condition = "Prod_cat_id='"+prodcatid+"'";
			}
			else{
				condition = condition+" and Prod_cat_id='"+prodcatid+"'";
			}
		}
		
		if(status!=null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}
		
		if(productCatName!=null){
			if(condition === null){
				condition = "prod_cat_name='"+productCatName+"'";
			}
			else{
				condition = condition+" and prod_cat_name='"+productCatName+"'";
			}
		}
		
		if(parantId!=null){
			if(condition === null){
				condition = "parent_id='"+parantId+"'";
			}
			else{
				condition = condition+" and parent_id='"+parantId+"'";
			}
		}
		
		if(levelNo!=null){
			if(condition === null){
				condition = "level_no='"+levelNo+"'";
			}
			else{
				condition = condition+" and level_no='"+levelNo+"'";
			}
		}
		
		productCategoryService.getProductCategory(condition,selectedAttributes,function(result){
			res.send(result);
		});
	}
	
}