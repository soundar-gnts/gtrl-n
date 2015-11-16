/**
 * File Name	:	voucherRoutes.js
 * Description	:	To write Routing middlewares For voucherRoutes.
 * Author		:	Saranya G
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

var voucherService= require('../services/VoucherService.js');

module.exports = function(app, server){
	
	app.post('/getvoucherlist',			voucherService.getVoucher);
	app.post('/getvouchertypelist',		voucherService.getVoucherType);
	app.post('/saveorupdatevoucher',	voucherService.saveOrUpdateVoucher);
	app.post('/saveorupdatevouchertype',voucherService.saveOrUpdateVoucherType);
	
	
	//for get voucher list based on user param
	function getVoucher(req, res){
		
		var selectedAttribute	= "";
		var condition 			= "";
		var companyId 			= req.param("companyid");
		var voucherId 			= req.param("voucherid");
		var voucherCode			= req.param("vouchercode");
		var prodCatId			= req.param("prodcatid");
		var status				= req.param("status");
		
		if(companyId!=null){
			condition ="company_id="+companyId;
			}
		
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(voucherId!=null){
			if(condition === ""){
				condition="voucher_id ='"+voucherId+"'";
			}else {
				condition=condition+" and voucher_id = '"+voucherId+"'";
			}
			
		}
		if(prodCatId!=null){
			if(condition === ""){
				condition="prod_cat_id ='"+prodCatId+"'";
			}else {
				condition=condition+" and prod_cat_id = '"+prodCatId+"'";
			}
			
		}
		if(voucherCode!=null){
			if(condition === ""){			
				condition="voucher_code like '%"+voucherCode+"%'";
			}else {
				condition=condition+" and voucher_code like '%"+voucherCode+"%'";
			}
			
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			selectedAttribute=['voucher_id','voucher_code','prod_cat_id'];
		}	
		
		
		voucherService.getVoucher(condition, selectedAttribute, function(response){
			res.send(response);
		});
	}
	
	//For get voucher type list based on user param
	function getVoucherTypeList(req, res){

		var selectedAttribute	= "";
		var condition 			= "";
		var companyId 			= req.param("companyid");
		var voucherTypeId 		= req.param("vouchertypeid");
		var voucherTypeName		= req.param("vouchertypename");		
		var status				= req.param("status");
		
		if(companyId!=null){
			condition ="company_id="+companyId;
			}
		
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(voucherTypeId!=null){
			if(condition === ""){
				condition="voucher_type_id ='"+voucherTypeId+"'";
			}else {
				condition=condition+" and voucher_type_id = '"+voucherTypeId+"'";
			}
			
		}

		if(voucherTypeName!=null){
			if(condition === ""){
			
				condition="voucher_type_name like '%"+voucherTypeName+"%'";
			}else {
				condition=condition+" and voucher_type_name like '%"+voucherTypeName+"%'";
			}
			
		}
		
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			selectedAttribute=['voucher_type_id','voucher_type_name'];
		}	
		
		voucherService.getVoucherType(condition, selectedAttribute, function(response){
			res.send(response);
		});
	}
	
	function saveOrUpdateVoucher(req, res){
		
		var voucher = {
				voucher_id			: req.param('voucherid'),
				company_id			: req.param('companyid'),
				voucher_code		: req.param('vouchercode'),
				voucher_type_id     : req.param('vouchertypeid'),
				discount_level		: req.param('discountlevel'),
				discount_value		: req.param('discountvalue'),
				prod_cat_id			: req.param('prodcatid'),
				min_bill_value		: req.param('minbillvalue'),
				region_id			: req.param('regionid'),
				status    			: req.param('status'),	
				last_updated_dt		: req.param('lastupdateddt'),
		        last_updated_by		: req.param('lastupdatedby')
		    }
		voucherService.saveOrUpdateVoucher(voucher, function(response){
			res.send(response);
		});
	}
	//for save / update voucher type 
	function saveOrUpdateVoucherType(req, res){
		var voucherType = {
			voucher_type_id		: req.param('vouchertypeid'),
			company_id			: req.param('companyid'),
			voucher_type_name	: req.param('vouchertypename'),
			status    			: req.param('status'),
			last_updated_dt		: req.param('lastupdateddt'),
		    last_updated_by		: req.param('lastupdatedby')
		}
		voucherService.saveOrUpdateVoucherType(voucherType, function(response){
			res.send(response);
		});
	}
}

