/**
 * File Name	:	VoucherService.js
 * Description	:	To write Business Logic For User.
 * Author		:	Saranya G
 * Date			:	October 06, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */

var voucher 	= require('../models/Voucher.js');
var voucherType = require('../models/VoucherType.js');

//SaveOrUpdate Voucher and VoucherType Details

	exports.saveOrUpdateVoucher = function(req, res){
		
		voucherType.upsert(
			{
			voucher_type_id			: req.param('vouchertypeid'),
			company_id				: req.param('companyid'),
			voucher_type_name		: req.param('vouchertypename'),
			status    				: req.param('status'),
			last_updated_dt			: req.param('lastupdateddt'),
	        last_updated_by			: req.param('lastupdatedby')
	
			})

				.then(function(v){
			console.log(v)
					for(var i=0;i<req.param('voucherlist').length;i++){
						
						voucher.upsert({
							
							voucher_id			: req.param('voucherlist')[i].voucherid,
							company_id			: req.param('voucherlist')[i].companyid,
							voucher_code		: req.param('voucherlist')[i].vouchercode,
							voucher_type_id     : v.vouchertypeid,
							discount_level		: req.param('voucherlist')[i].discountlevel,
							discount_value		: req.param('voucherlist')[i].discountvalue,
							prod_cat_id			: req.param('voucherlist')[i].prodcatid,
							min_bill_value		: req.param('voucherlist')[i].minbillvalue,
							region_id			: req.param('voucherlist')[i].regionid,
							status    			: req.param('voucherlist')[i].status,	
							last_updated_dt		: new Date(),
					        last_updated_by		: req.param('voucherlist')[i].lastupdatedby
					        
							})
				
					}
				})
		
			.error(function(err){
				res.send(err);
			});
		
			if(req.param('voucherid') == null)
			{
			res.send("Inserted Successfully ");
			}
			else
			{
			res.send("Updated Successfully");
			}
	} 

	//Voucher LIST

	exports.getVoucherList = function(req, res) {
		
		var condition 		= "";
		var companyId 		= req.param("companyid");
		var voucherId 		= req.param("voucherid");
		var voucherCode		= req.param("vouchercode");
		var prodCatId		= req.param("prodcatid");
		var status			= req.param("status");
		
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
			
		voucher.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}
// Voucher Type LIST

	exports.getVoucherTypeList = function(req, res) {
		
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
			
		voucherType.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}


