/**
 * @Filename 		: ProductService.js 
 * @Description 	: To write Business Logic for Product. 
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

var product = require('../models/Product.js');
var productspec = require('../models/ProductSpec.js');
var productimage = require('../models/ProductImage.js');
var productbrand = require('../models/ProdBrand.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};

var appmsg			= require('../config/Message.js');

var path = require('path');
var filename=path.basename(__filename);

// To save product details
exports.saveProduct = function(req, res) {
	product.create({
		prod_id			: req.param('prodid'),
		company_id		: req.param('companyid'),
		prod_code		: req.param('prodcode'),
		prod_name		: req.param('prodname'),
		prod_desc 		: req.param('proddesc'),
		manufg_id 		: req.param('manufgid'),
		brand_id 		: req.param('brandid'),
		max_discount 	: req.param('maxdiscount'),
		min_stock_lvl 	: req.param('minstocklvl'),
		max_stock_lvl 	: req.param('maxstocklvl'),
		prod_cat_lvl1 	: req.param('prodcatlvl1'),
		prod_cat_lvl2 	: req.param('prodcatlvl2'),
		prod_cat_lvl3 	: req.param('prodcatlvl3'),
		prod_cat_lvl4 	: req.param('prodcatlvl4'),
		prod_cat_lvl5 	: req.param('prodcatlvl5'),
		buy_price 		: req.param('buyprice'),
		buy_unit 		: req.param('buyunit'),
		buy_tax_id 		: req.param('buytaxid'),
		sell_price 		: req.param('sellprice'),
		sell_unit 		: req.param('sellunit'),
		sell_tax_id 	: req.param('selltaxid'),
		mrp 			: req.param('mrp'),
		uom_id 			: req.param('uomid'),
		cash_discount 	: req.param('cashdiscount'),
		direct_purchase : req.param('directpurchase'),
		is_billable 	: req.param('isbillable'),
		is_bundle 		: req.param('isbundle'),
		zero_rate 		: req.param('zerorate'),
		machine_wt 		: req.param('machinewt'),
		status 			: req.param('status'),
		last_updated_dt : req.param('lastupdateddt'),
		last_updated_by : req.param('lastupdatedby'),
		prod_cat_id 	: req.param('prodcatid'),
		online_yn 		: req.param('onlineyn'),
		corporate_yn 	: req.param('corporateyn'),
		wholesale_yn 	: req.param('wholesaleyn'),
		ean_num_yn 		: req.param('eannumyn')
	
	})
	.then(function(p){
		for(var i=0;i<req.param('prodspeclist').length;i++){
			productspec.upsert({
				prod_spec_id 	: req.param('prodspeclist')[i].prodspecid,
				prod_id 		: p.prod_id,
				spec_name 		: req.param('prodspeclist')[i].specname,
				spec_value 		: req.param('prodspeclist')[i].specvalue,
				status 			: req.param('prodspeclist')[i].status,
				last_updated_dt : req.param('prodspeclist')[i].lastupdateddt,
				last_updated_by	: req.param('prodspeclist')[i].lastupdatedby
				
			}).error(function(err) {
				res.send(err);
			});
		}
		
		for(var i=0;i<req.param('prodimagelist').length;i++){
			productimage.upsert({
				product_image_id 	: req.param('prodimagelist')[i].productimageid,
				prod_id 			: p.prod_id,
				company_id 			: req.param('prodimagelist')[i].companyid,
				store_id 			: req.param('prodimagelist')[i].storeid,
				product_image 		: req.param('prodimagelist')[i].productimage,
				status 				: req.param('prodimagelist')[i].status,
				lastupdated_by 		: req.param('prodimagelist')[i].lastupdatedby,
				lastupdated_date	: req.param('prodimagelist')[i].lastupdateddate,
				//prod_cat_id			: req.param('prodimagelist')[i].prodcatid
				
			}).error(function(err) {
				res.send(err);
			});
		}
		
		
		for(var i=0;i<req.param('prodbrandlist').length;i++){
			productbrand.upsert({
				prod_brand_id 		: req.param('prodbrandlist')[i].prodbrandid,
				prod_id 			: p.prod_id,
				brand_id 			: req.param('prodbrandlist')[i].brandid,
				company_id 			: req.param('prodbrandlist')[i].companyid,
				status 				: req.param('prodbrandlist')[i].status,
				last_updated_dt 	: req.param('prodbrandlist')[i].lastupdateddt,
				last_updated_by		: req.param('prodbrandlist')[i].lastupdatedby
				
			}).error(function(err) {
				res.send(err);
			});
		}
		
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveProduct>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info(filename+'>>saveProduct>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveProduct>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}

//To get product full list
exports.getProductsList=function(req,res){
	var attr 			= "";
	var condition 		= "";
	var companyid		=req.param("companyid");
	var prodid			=req.param("prodid");
	var prodcode		=req.param("prodcode");
	var prodname		=req.param("prodname");
	var manufgid		=req.param("manufgid");
	var brandid			=req.param("brandid");
	var prodcatid		=req.param("prodcatid");
	var status			=req.param("status");
	
	
	if(companyid!=null){
		condition ="company_id="+companyid;
	}
	if(prodid!=null){
		if(condition === ""){
			condition="prod_id='"+prodid+"'";
		}else {
			condition=condition+" and prod_id='"+prodid+"'";
		}
	}
	if(prodcode!=null){
		if(condition === ""){
			condition="prod_code like '%"+prodcode+"%'";
		}else {
			condition=condition+" and prod_code like '%"+prodcode+"%'";
		}
	}
	if(prodname!=null){
		if(condition === ""){
			condition="prod_name like '%"+prodname+"%'";
		}else {
			condition=condition+" and prod_name like '%"+prodname+"%'";
		}
	}
	if(manufgid!=null){
		if(condition === ""){
			condition="manufg_id='"+manufgid+"'";
		}else {
			condition=condition+" and manufg_id='"+manufgid+"'";
		}
	}
	if(brandid!=null){
		if(condition === ""){
			condition="brand_id='"+brandid+"'";
		}else {
			condition=condition+" and brand_id='"+brandid+"'";
		}
	}
	if(prodcatid!=null){
		if(condition === ""){
			condition="prod_cat_id='"+prodcatid+"'";
		}else {
			condition=condition+" and prod_cat_id='"+prodcatid+"'";
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
		attr=['prod_id','prod_code','prod_name','uom_id'];
	}
	product.findAll({where : [condition],attributes: attr}).then(function(result){
		if(result.length === 0){
			
			log.info(filename+'>>getProductsList>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getProductsList>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductsList>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}

//For get product specification list
exports.getProductSpec=function(req,res){
	var condition 		= "";
	var prodspecid		=req.param("prodspecid");
	var prodid			=req.param("prodid");
	var specname		=req.param("specname");
	var status			=req.param("status");
	if(prodspecid!=null){
		condition ="prod_spec_id="+prodspecid;
	}
	if(prodid!=null){
		if(condition === ""){
			condition="prod_id='"+prodid+"'";
		}else {
			condition=condition+" and prod_id='"+prodid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	if(specname!=null){
		if(condition === ""){
			condition="spec_name like '%"+specname+"%'";
		}else {
			condition=condition+" and spec_name like '%"+specname+"%'";
		}
	}
	productspec.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductSpec>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getProductSpec>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductSpec>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}
//for get products images
exports.getProductImages=function(req,res){
	var condition 			= "";
	var productimageid		=req.param("productimageid");
	var prodid				=req.param("prodid");
	var companyid			=req.param("companyid");
	var storeid				=req.param("storeid");
	var status				=req.param("status");
	if(productimageid!=null){
		condition ="product_image_id="+productimageid;
	}
	if(prodid!=null){
		if(condition === ""){
			condition="prod_id='"+prodid+"'";
		}else {
			condition=condition+" and prod_id='"+prodid+"'";
		}
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
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	productimage.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductImages>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>>getProductImages>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductImages>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}

//for get products images
exports.getProductBrands=function(req,res){
	var condition 		= "";
	var prodbrandid		=req.param("prodbrandid");
	var prodid			=req.param("prodid");
	var companyid		=req.param("companyid");
	var brandid			=req.param("brandid");
	var status			=req.param("status");
	if(prodbrandid!=null){
		condition ="prod_brand_id="+prodbrandid;
	}
	if(prodid!=null){
		if(condition === ""){
			condition="prod_id='"+prodid+"'";
		}else {
			condition=condition+" and prod_id='"+prodid+"'";
		}
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(brandid!=null){
		if(condition === ""){
			condition="brand_id='"+brandid+"'";
		}else {
			condition=condition+" and brand_id='"+brandid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	productbrand.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductBrands>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>>getProductBrands>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductBrands>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}

