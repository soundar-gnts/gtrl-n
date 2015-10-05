/**
 * @Filename 		: m_product_service.js 
 * @Description 	: To write Business Logic for product. 
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

var product = require('../models/m_product.js');
var productspec = require('../models/m_product_spec.js');
var productimage = require('../models/m_product_image.js');
var productbrand = require('../models/m_prod_brand.js');

// To save product details
exports.saveproduct = function(req, res) {
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
			productspec.create({
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
			productimage.create({
				product_image_id 	: req.param('prodimagelist')[i].productimageid,
				prod_id 			: p.prod_id,
				company_id 			: req.param('prodimagelist')[i].companyid,
				store_id 			: req.param('prodimagelist')[i].storeid,
				product_image 		: req.param('prodimagelist')[i].productimage,
				status 				: req.param('prodimagelist')[i].status,
				lastupdated_by 		: req.param('prodimagelist')[i].lastupdatedby,
				lastupdated_date	: req.param('prodimagelist')[i].lastupdateddate,
				prod_cat_id			: req.param('prodimagelist')[i].prodcatid
				
			}).error(function(err) {
				res.send(err);
			});
		}
		
		
		for(var i=0;i<req.param('prodbrandlist').length;i++){
			productbrand.create({
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
		
		
	})
	.error(function(err) {
		res.send(err);
	});
	
	res.send('Successfully Saved.');
}

//To get product full list
exports.getAllProducts=function(req,res){
	product.findAll({where : {company_id:req.param('companyid')}}).then(function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
		
	})
}

//For get product specification list
exports.getProductSpec=function(req,res){
	productspec.findAll({where : {prod_id:req.param('prodid')}}).then(function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
		
	})
}
//for get products images
exports.getProductImages=function(req,res){
	productimage.findAll({where : {prod_id:req.param('prodid')}}).then(function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
		
	})
}

//for get products images
exports.getProductBrands=function(req,res){
	productbrand.findAll({where : {prod_id:req.param('prodid')}}).then(function(err,result){
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
		
	})
}

