/**
 * @Filename 		: SalesService.js
 * @Description 	: To write Business Logic for Product Sales. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 16, 2015
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
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var path = require('path');
var filename=path.basename(__filename);
//
var saledtl = require('../models/SaleDtl.js');

exports.getSaleDetail=function(productid,batchno,callback){
	console.log(productid);
	saledtl.findOne({where:[{product_id:productid,batch_no:batchno}]})
	.then(function(result){
		callback(result);
	});
}

//
exports.saveOrUpdateSalesFn = function(sales, salesDetails, salesDeleteDetailsIds, callback){
	log.info(fileName+'.saveOrUpdateSalesFn');
	
	//var refkey = 'SO_NO';
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesOrder.salesorder_id != null){
		soHeader.upsert(salesOrder)
		.then(function(data){
			
			log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			log.info(salesDetails.length+' Sales detail is going to update');
			
			//delete sales details from sales order detail table.
			for(var i = 0; i < salesDeleteDetailsIds.length; i++)
				deleteSalesOrderDetailsFn("salesorder_dtl_id='"+salesDeleteDetailsIds[i].salesorder_dtl_id+"'");
			
			//update/save new sales details into sales order table.
			for(var i = 0; i < salesDetails.length; i++)
				saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
			
			log.info(appMsg.SALESORDEREDITSUCCESS);
			response.message 	= appMsg.SALESORDEREDITSUCCESS;
			response.data  		= salesOrder.salesorder_id;
			response.status  	= true;
			res.send(response);
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERROR;
			response.data  		= err;
			res.send(response);
		});
	} else{
		
		//send otp to mobile number
		
		slnogenService.getSlnoValue(salesOrder.company_id, req.param('storeid'), refkey, 'y', 'Active', function(slno){
			if(sl == null){

				salesOrder.otp_code			= common.generateOTP(4);
				salesOrder.sal_ordr_number	= sl.sno;
				soHeader.create(salesOrder)
				.then(function(data){
					
					for(var i = 0; i < salesDetails.length; i++){
						salesDetails[i].salesorder_id = data.salesorder_id;
						saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
					}
					slnogenService.updateSequenceNo(sl.slid,req.param('lastupdateddt'),req.param('lastupdatedby'));
					log.info(appMsg.SALESORDERSAVESUCCESS);
					response.message	= appMsg.SALESORDERSAVESUCCESS;
					response.data  		= data.salesorder_id;
					response.status 	= true;
					res.send(response);
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERROR;
					response.data  		= err;
					res.send(response);
				});
				
			} else{
			log.info('Sales order saved successfully.');
			response.message	= 'Sales order saved successfully.';
			response.data  		= data.salesorder_id;
			response.status 	= true;
			res.send(response);}
		});
		
	}
	
}

exports.getSalesFn = function(condition, callback){
	
}

exports.changeSalesStatusFn = function(sale_id, sales, callback){
	
}

exports.getSalesDetailsFn = function(condition, callback){
	
}