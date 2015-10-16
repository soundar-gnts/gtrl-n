/**
 * File Name	:	VoucherService.js
 * Description	:	To write Business Logic For Voucher and VoucherType.
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

var voucher 		= require('../models/Voucher.js');
var voucherType		= require('../models/VoucherType.js');
var appMsg			= require('../config/Message.js');
var log 			= require('../config/logger').logger;
var path			= require('path');
var fileName		= path.basename(__filename);
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};

//Voucher List

	exports.getVoucherList = function(req, res) {
		
		var attr 			= "";
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
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['voucher_id','voucher_code','prod_cat_id'];
		}	
		
		voucher.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		.then(function(voucherlist){
			if(voucherlist.length === 0){
				
				log.info(fileName+'.getVoucherList - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data 	 = "";
			
				
			} else{
				log.info(fileName+'.getVoucherList - '+'About '+voucherlist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+voucherlist.length+' results.';
				response.data 		= voucherlist;
				
			}
			res.send(response);
		})
		.error(function(err){
			log.info(fileName+'.getVoucherList - '+appMsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	};
	
// Voucher Type List

	exports.getVoucherTypeList = function(req, res) {
		
		var attr 				= "";
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
			attr=['voucher_type_id','voucher_type_name'];
		}	
		
			
		voucherType.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		.then(function(vouchertypelist){
			if(vouchertypelist.length === 0){
				
				log.info(fileName+'.getVoucherTypeList - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data 	 = "";
				
			} else{
				
				log.info(fileName+'.getVoucherTypeList - '+'About '+vouchertypelist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+vouchertypelist.length+' results.';
				response.data 		= vouchertypelist;
				
			}
			res.send(response);
			
		})
		.error(function(err){
			log.info(fileName+'.getVoucherTypeList - '+appMsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	};
	
//SaveOrUpdate Voucher Type Details	
	
	exports.saveOrUpdateVoucherType = function(req, res){
			
			voucherType.upsert(
				{
				voucher_type_id			: req.param('vouchertypeid'),
				company_id				: req.param('companyid'),
				voucher_type_name		: req.param('vouchertypename'),
				status    				: req.param('status'),
				last_updated_dt			: req.param('lastupdateddt'),
		        last_updated_by			: req.param('lastupdatedby')
		   
				})	
		
		.then(function(data){
			if(data){
				log.info(fileName+'.saveOrUpdateVoucherType - '+appMsg.SAVEMESSAGE);
				response.message = appMsg.SAVEMESSAGE;
				response.status  = true;
				
			}
			else{
				log.info(fileName+'.saveOrUpdateVoucherType - '+appMsg.UPDATEMESSAGE);
				response.message = appMsg.UPDATEMESSAGE;
				response.status  = true;
				
			}
			res.send(response);
		}).error(function(err){
			log.info(fileName+'.saveOrUpdateVoucherType - '+appMsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	}; 
	
//SaveOrUpdate Voucher  Details

	exports.saveOrUpdateVoucher = function(req, res){			
						
						voucher.upsert({
							
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
					        
							})
							.then(function(data){
								if(data){
									log.info(fileName+'.saveOrUpdateVoucher - '+appMsg.SAVEMESSAGE);
									response.message = appMsg.SAVEMESSAGE;
									response.status  = true;
									
								}
								else{
									log.info(fileName+'.saveOrUpdateVoucher - '+appMsg.UPDATEMESSAGE);
									response.message = appMsg.UPDATEMESSAGE;
									response.status  = true;
									
								}
								res.send(response);
							}).error(function(err){
								log.info(fileName+'.saveOrUpdateVoucher - '+appMsg.INTERNALERRORMESSAGE);
								log.error(err);
								response.status  	= false;
								response.message 	= appMsg.INTERNALERRORMESSAGE;
								response.data  		= err;
								res.send(response);
							});
						}; 

