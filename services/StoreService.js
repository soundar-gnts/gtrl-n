/**
 * File Name	:	StoreService.js
 * Description	:	To write Business Logic For StoreService.
 * Author		:	Saranya G
 * Date			:	October 08, 2015
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

var store 		     = require('../models/Store.js');
var storeRegion		 = require('../models/StoreRegion.js');
var log 			 = require('../config/logger').logger;
var appMsg			 = require('../config/Message.js');

var response = {
		status	: Boolean,
		message : String,
		data	: String
};

//Store List

	exports.getStoreList = function(req, res) {
		
		var conditionQuery 		= "";
	
		var storeId 			= req.param("storeid");
		var companyId 			= req.param("companyid");
		var storeCode 			= req.param("storecode");
		var storeName			= req.param("storename");
		var stateId				= req.param("stateid");
		var cityId				= req.param("cityid");
		var warehouseId			= req.param("warehouseid"); 
		var stkTransRegionId	= req.param('stktransregionid');
		var stkTransStoreId		= req.param('stktransstoreid');
		var stkRecvRegionId		= req.param('stkrecvregionid');
		var stkRecvStoreId		= req.param('stkrecvstoreid');
		var status				= req.param("status");
		
		if(companyId!=null){
			conditionQuery ="company_id="+companyId;
			}
		if(storeId!=null){
			if(conditionQuery === ""){
				conditionQuery ="store_id="+storeId;
			}else {
				conditionQuery=conditionQuery+" and store_id="+storeId;
			}	
			}
		if(stateId!=null){
			if(conditionQuery === ""){
				conditionQuery ="state_id="+stateId;
			}else {
				conditionQuery=conditionQuery+" and state_id="+stateId;
			}	
			}
		
		if(cityId!=null){
			if(conditionQuery === ""){
				conditionQuery ="city_id="+cityId;
			}else {
				conditionQuery=conditionQuery+" and city_id="+cityId;
			}	
			}
		if(status!=null){
			if(conditionQuery === ""){
				conditionQuery="status='"+status+"'";
			}else {
				conditionQuery=conditionQuery+" and status='"+status+"'";
			}
		}
		
		if(storeCode!=null){
			if(conditionQuery === ""){			
				conditionQuery="store_code like '%"+storeCode+"%'";
			}else {
				conditionQuery=conditionQuery+" and store_code like '%"+storeCode+"%'";
			}
			
		}
		if(storeName!=null){
			if(conditionQuery === ""){			
				conditionQuery="store_name like '%"+storeName+"%'";
			}else {
				conditionQuery=conditionQuery+" and store_name like '%"+storeName+"%'";
			}
			
		}
		if(warehouseId!=null){
			if(conditionQuery === ""){
				conditionQuery ="warehouse_id="+warehouseId;
			}else {
				conditionQuery=conditionQuery+" and warehouse_id="+warehouseId;
			}	
			}
		
		if(stkTransRegionId!=null){
			if(conditionQuery === ""){
				conditionQuery ="stk_trans_region_id="+stkTransRegionId;
			}else {
				conditionQuery=conditionQuery+" and stk_trans_region_id="+stkTransRegionId;
			}	
			}	
		if(stkTransStoreId!=null){
			if(conditionQuery === ""){
				conditionQuery ="stk_trans_store_id="+stkTransStoreId;
			}else {
				conditionQuery=conditionQuery+" and stk_trans_store_id="+stkTransStoreId;
			}	
			}	
		if(stkRecvRegionId!=null){
			if(conditionQuery === ""){
				conditionQuery ="stk_recv_region_id="+stkRecvRegionId;
			}else {
				conditionQuery=conditionQuery+" and stk_recv_region_id="+stkRecvRegionId;
			}	
			}	
		if(stkRecvStoreId!=null){
			if(conditionQuery === ""){
				conditionQuery ="stk_recv_store_id="+stkRecvStoreId;
			}else {
				conditionQuery=conditionQuery+" and stk_recv_store_id="+stkRecvStoreId;
			}	
			}
		store.findAll({where : [conditionQuery],order: [['last_updated_dt', 'DESC']]})
		.then(function(storelist){
			if(storelist.length === 0){
				
				log.info('No data found.');
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;	
				response.data	 = "";
				
			} else{
				
				log.info('About '+storelist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+storelist.length+' results.';
				response.data 		= storelist;
				
			}
			res.send(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	};
// Store region List

	exports.getStoreRegionList = function(req, res) {
		
		var condition 			= "";
		var regionId 			= req.param("regionid");
		var companyId 			= req.param("companyid");
		var regionName 			= req.param("regionname");
		var status				= req.param("status");
		
		if(companyId!=null){
			condition ="company_id="+companyId;
			}
		if(regionId!=null){
			if(condition === ""){
				condition="region_id='"+regionId+"'";
			}else {
				condition=condition+" and region_id='"+regionId+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
	
		if(regionName!=null){
			if(condition === ""){
			
				condition="region_name like '%"+regionName+"%'";
			}else {
				condition=condition+" and region_name like '%"+regionName+"%'";
			}
			
		}
			
		storeRegion.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]})
		.then(function(regionlist){
			if(regionlist.length === 0){
				
				log.info('No data found.');
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data	 = "";
			
			} else{
				
				log.info('About '+regionlist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+regionlist.length+' results.';
				response.data 		= regionlist;
				
			}
			res.send(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	};
	
//SaveOrUpdate StoreRegion Details

	exports.saveOrUpdateStoreRegion = function(req, res){
		
		storeRegion.upsert({
		
			region_id			: req.param('regionid'),
			company_id			: req.param('companyid'),
			region_name			: req.param('regionname'),
			all_region_yn 		: req.param('allregionyn'),
			status    			: req.param('status'),
			last_updated_dt		: req.param('lastupdateddt'),
	        last_updated_by		: req.param('lastupdatedby')	       
		
			})
			.then(function(data){
				if(data){
					log.info('Saved successfully.');
					response.message = 'Saved successfully.';
					response.status  = true;
				
				}
				else{
					log.info('Updated successfully.');
					response.message = 'Updated successfully.';
					response.status  = true;
					
				}
				res.send(response);
				
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
	}; 
	
//SaveOrUpdate Store  Details

	exports.saveOrUpdateStore = function(req, res){

						
						store.upsert({
							
							store_id			: req.param('storeid'),
							company_id			: req.param('companyid'),
							store_code			: req.param('storecode'),
							store_name    		: req.param('storename'),
							address 			: req.param('address'),
							pincode 	   		: req.param('pincode'),
							state_id 			: req.param('stateid'), 
							city_id 			: req.param('cityid'),
							landline_no 		: req.param('landlineno'),
							mobile_no 			: req.param('mobileno'),
							email_id 			: req.param('emailid'), 
							contact_person		: req.param('contactperson'),		
							contact_no			: req.param('contactno'),							
							is_warehouse 		: req.param('iswarehouse'),
							warehouse_id 	   	: req.param('warehouseid'),
							store_brand_name 	: req.param('storebrandname'),
							dl_no 				: req.param('dlno'),
							cst_no 				: req.param('cstno'),
							tin_no 				: req.param('tinno'),
							discount_percent 	: req.param('discountpercent'),
							servicetax_no		: req.param('servicetaxno'),		
							door_delivery_yn	: req.param('door_deliveryyn'),							
							stk_check_freq 		: req.param('stkcheckfreq'),
							stk_check_day		: req.param('stkcheckday'),		
							stk_check_sms		: req.param('stkchecksms'),								
							stk_check_email 	: req.param('stkcheckemail'),
							stk_transfer_yn 	: req.param('stktransferyn'),
							stk_receive_yn 		: req.param('stkreceiveyn'), 
							stk_trans_lvl 		: req.param('stktranslvl'),
							stk_recv_lvl 		: req.param('stkrecvlvl'),
							stk_trans_region_id : req.param('stktransregionid'),
							stk_trans_store_id 	: req.param('stktransstoreid'), 
							stk_recv_region_id  : req.param('stkrecvregionid'),		
							stk_recv_store_id	: req.param('stkrecvstoreid'),	
							status    			: req.param('status'),	
							last_updated_dt		: req.param('lastupdateddt'),
					        last_updated_by		: req.param('lastupdatedby')
					        
							})
							.then(function(data){
								if(data){
									log.info('Saved successfully.');
									response.message = 'Saved successfully.';
									response.status  = true;
									res.send(response);
								}
								else{
									log.info('Updated successfully.');
									response.message = 'State Updated successfully.';
									response.status  = true;
									res.send(response);
								}
								
							}).error(function(err){
								log.error(err);
								response.status  	= false;
								response.message 	= 'Internal error.';
								response.data  		= err;
								res.send(response);
							});
					}; 
