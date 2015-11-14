/**
 * @Filename	:	productRoutes.js
 * @Description	:	To write Routing middlewares For product related table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 05, 2015
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
var productService = require('../services/ProductService.js');
var productSerialCodesService = require('../services/ProductSerialCodesService.js');
var tax					= require('../models/Tax.js');

module.exports = function(app, server) {
	app.post('/saveproduct', 		saveProductDetails);
	app.post('/getproductslist',	getProductsList);
	app.post('/getproductspec', 	getProductSpec);
	app.post('/getproductimages',	getProductImages);
	app.post('/getproductbrands',	getProductBrands);
	//For product serial codes.
	//app.post('/getproductserialcodesdetails', productSerialCodesService.getProductSerialCodesDetails);
	//app.post('/saveproductserialcodes', productSerialCodesService.saveProductSerialCodes);
	
	function saveProductDetails(req, res){
		var prodSpeclist			= [];
		var prodImagelist			= [];
		var prodBrandlist			= [];
		var product = {
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
	
		}
		
		if(req.param('prodspeclist').length != null)
			req.param('prodspeclist').forEach(function(productSpec){
				var p = {
						prod_spec_id 	: productSpec.prodspecid,
						prod_id 		: product.prod_id,
						spec_name 		: productSpec.specname,
						spec_value 		: productSpec.specvalue,
						status 			: productSpec.status,
						last_updated_dt : productSpec.lastupdateddt,
						last_updated_by	: productSpec.lastupdatedby
						
					}
				prodSpeclist.push(productSpec);
			});
		if(req.param('prodimagelist').length != null)
			req.param('prodimagelist').forEach(function(productImg){
				var p = {
						product_image_id 	: productImg.productimageid,
						prod_id 			: product.prod_id,
						company_id 			: productImg.companyid,
						store_id 			: productImg.storeid,
						product_image 		: productImg.productimage,
						status 				: productImg.status,
						lastupdated_by 		: productImg.lastupdatedby,
						lastupdated_date	: productImg.lastupdateddate
					}
				prodImagelist.push(productImg);
			});
		if(req.param('prodbrandlist').length != null)
			req.param('prodbrandlist').forEach(function(productBrand){
				var p = {
						prod_brand_id 		: productBrand.prodbrandid,
						prod_id 			: product.prod_id,
						brand_id 			: productBrand.brandid,
						company_id 			: productBrand.companyid,
						status 				: productBrand.status,
						last_updated_dt 	: productBrand.lastupdateddt,
						last_updated_by		: productBrand.lastupdatedby
				}
				prodBrandlist.push(productBrand);
			});
			
		productService.saveProductDetails(product, prodSpeclist, prodImagelist, prodBrandlist, function(response){
			res.send(response);
		});
	}
	
	function getProductsList(req, res){
		var fetchAssociation 	= "";
		var selectedAttributes 			= "";
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
			condition ="m_product.company_id="+companyid;
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
				condition="m_product.status='"+status+"'";
			}else {
				condition=condition+" and m_product.status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			selectedAttributes=['prod_id','prod_code','prod_name','uom_id','max_discount','sell_tax_id','status','last_updated_by','last_updated_dt'];
		}
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [
			                    {model : tax, attributes : ['cst','lst','surcharge','tax_on_mrp','service_tax','mrp_inclusive']}]
		}
		
		productService.getProducts(condition, selectedAttributes, fetchAssociation, function(result){
			res.send(result);
		});
	}
	
	function getProductSpec(req, res){
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
		productService.getProductSpec(condition, function(response){
			res.send(response);
		});
	}
	
	function getProductImages(req, res){
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
		productService.getProductImages(condition, function(response){
			res.send(response);
		});
	}
	
	function getProductBrands(req, res){
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
		
		productService.getProductBrands(condition, function(response){
			res.send(response);
		});
	}
}