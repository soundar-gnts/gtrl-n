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

module.exports = function(app, server) {
	app.post('/saveproduct', productService.saveProduct);
	app.post('/getproductslist', getProductsList);
	app.post('/getproductspec', productService.getProductSpec);
	app.post('/getproductimages', productService.getProductImages);
	app.post('/getproductbrands', productService.getProductBrands);
	//For product serial codes.
	//app.post('/getproductserialcodesdetails', productSerialCodesService.getProductSerialCodesDetails);
	//app.post('/saveproductserialcodes', productSerialCodesService.saveProductSerialCodes);
	
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
			selectedAttributes=['prod_id','prod_code','prod_name','uom_id','max_discount','sell_tax_id'];
		}
		
		productService.getProduct(condition, selectedAttributes, '', function(result){
			res.send(result);
		});
	}
	
}