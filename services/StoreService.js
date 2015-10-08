/**
 * File Name	:	StoreService.js
 * Description	:	To write Business Logic For User.
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

var store 	= require('../models/Store.js');
var storeRegion = require('../models/StoreRegion.js');


//Store LIST

	exports.getStoreList = function(req, res) {
		
		var condition 		= "";
	
		var storeId 		= req.param("storeid");
		var companyId 		= req.param("companyid");
		var storeCode 		= req.param("storecode");
		var storeName		= req.param("storename");
		var stateId=req.param("stateid");
		var cityId=req.param("cityid");
		var warehouseId=req.param("warehouseid"); 
		var stkTransRegionId=req.param('stktransregionid');
		var stkTransStoreId=req.param('stktransstoreid');
		var stkRecvRegionId=req.param('stkrecvregionid');
		var stkRecvStoreId=req.param('stkrecvstoreid');
		var status			= req.param("status");
		
		if(companyId!=null){
			condition ="company_id="+companyId;
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
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		if(storeCode!=null){
			if(condition === ""){			
				condition="store_code like '%"+storeCode+"%'";
			}else {
				condition=condition+" and store_code like '%"+storeCode+"%'";
			}
			
		}
		if(storeName!=null){
			if(condition === ""){			
				condition="store_name like '%"+storeName+"%'";
			}else {
				condition=condition+" and store_name like '%"+storeName+"%'";
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
		store.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}
// Voucher Type LIST

	exports.getStoreRegionList = function(req, res) {
		
		var condition 			= "";
		var regionId 			= req.param("regionid");
		var companyId 			= req.param("companyid");
		var regionName 		= req.param("regionname");
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
			
		storeRegion.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}


