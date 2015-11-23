/**
 * File Name	:	storeRoutes.js
 * Description	:	To write Routing middlewares For StoreRoutes.
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
 * 
 */

var storeService		= require('../services/StoreService.js');
var state				= require('../models/State.js');
var city				= require('../models/City.js');

module.exports = function(app, server){
	
	//Store
	app.post('/getstorelist', getStoreList);
	app.post('/saveorupdatestore', saveOrUpdateStore);
	
	//Store region	
	app.post('/getstoreregionlist', getStoreRegionList);
	app.post('/saveorupdatestoreregion', saveOrUpdateStoreRegion);
	
	//To get store list based on user param
	function getStoreList(req, res){
		var conditionQuery 		= "";
		var attr 				= "";
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
		var fetchAssociation	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : state, attributes : ['state_name']},
			                    {model : city, attributes : ['city_name']}];
		}
		
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
		
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['store_id','store_code','store_name','city_id','state_id','warehouse_id'];
		}
		storeService.getStoreList(conditionQuery,attr,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	//save / update store 
	function saveOrUpdateStore(req, res){
		var storeobj = {
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
				};
		storeService.saveOrUpdateStore(storeobj,function(result){
			res.send(result);
		});
	}
	
	//For get store region list based on user param
	function getStoreRegionList(req, res){
		var attr 				= "";
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
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['region_id','region_name'];
		}
		storeService.getStoreRegionList(condition,attr,function(result){
			res.send(result);
		});
	}
	//For save/update store region
	function saveOrUpdateStoreRegion(req, res){
		var storeregionobj={
				region_id			: req.param('regionid'),
				company_id			: req.param('companyid'),
				region_name			: req.param('regionname'),
				all_region_yn 		: req.param('allregionyn'),
				status    			: req.param('status'),
				last_updated_dt		: req.param('lastupdateddt'),
		        last_updated_by		: req.param('lastupdatedby')	       
				};
		storeService.saveOrUpdateStoreRegion(storeregionobj,function(result){
			res.send(result);
		});
		
	}
}

