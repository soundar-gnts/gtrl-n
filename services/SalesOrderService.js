/**
 * File Name	:	SalesOrderService.js
 * Description	:	To write Business Logic For Sales order header.
 * Author		:	Haris K.A.
 * Date			:	October 10, 2015
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

var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var soHeader	= require('../models/SalesOrderHeader.js');
var soDetail	= require('../models/SalesOrderDetail.js');
var common		= require('../services/CommonService.js');

//insert or update Sales order details
exports.saveOrUpdateSalesOrderFn = function(salesOrder, salesDetails, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesOrder.salesorder_id != null){
		soHeader.upsert(salesOrder)
		.then(function(data){
			log.info(salesDetails.length);
			if(salesDetails.length>0){
				var condition = "salesorder_id='"+salesOrder.salesorder_id+"'";
				deleteSalesOrderDetailsFn(condition);
			}
			
			for(var i = 0; i < salesDetails.length; i++){
				saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
			}
			log.info('Sales order editted successfully.');
			response.message 	= 'Sales order editted successfully.';
			response.data  		= salesOrder.salesorder_id;
			response.status  	= true;
			res.send(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	} else{
		//sens otp to mobile number
		salesOrder.otp_code			= common.generateOTP(4);
		salesOrder.sal_ordr_number	= common.generateOTP(12);
		soHeader.create(salesOrder)
		.then(function(data){
			
			for(var i = 0; i < salesDetails.length; i++){
				salesDetails[i].salesorder_id = data.salesorder_id;
				saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
			}
			log.info('Sales order saved successfully.');
			response.message	= 'Sales order saved successfully.';
			response.data  		= data.salesorder_id;
			response.status 	= true;
			res.send(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	}
	
}

function saveOrUpdateSalesOrderDetailsFn(salesDetail) {
	soDetail.upsert(salesDetail)
	.then(function(data){
		
	}).error(function(err){
		log.error(err);
	});
}

//get all Sales order details
exports.getSalesOrder = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	var fetchAssociation 	= "";
	var selectedAttributes 	= "";
	var condition 			= "";
	var soId 				= req.param('salesorderid');
	var companyId 			= req.param('companyid');
	var status				= req.param('status');
	var storeId				= req.param('storeid');
	var salesOrderNumber	= req.param('salordrnumber');
	var otpCode				= req.param('otpcode');
	var customerId			= req.param('customerid');
	
	if(req.param('fetchassociation')=='yes'){
		fetchAssociation = [{model : soDetail}]
	}
	
	if(req.param('isfulllist')=='p'){
		selectedAttributes = ['salesorder_id']
	}
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(soId!=null)
		if(condition === "")
			condition = "t_salesorder_hdr.salesorder_id='"+soId+"'";
	
		else
			condition = condition+" and t_salesorder_hdr.salesorder_id='"+soId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	if(storeId!=null)
		if(condition === "")
			condition = "store_id='"+storeId+"'";
	
		else
			condition = condition+" and store_id='"+storeId+"'";
	
	if(salesOrderNumber!=null)
		if(condition === "")
			condition = "sal_ordr_number='"+salesOrderNumber+"'";
	
		else
			condition = condition+" and sal_ordr_number='"+salesOrderNumber+"'";
	
	if(otpCode!=null)
		if(condition === "")
			condition = "otp_code='"+otpCode+"'";
	
		else
			condition = condition+" and otp_code='"+otpCode+"'";
	
	if(customerId!=null)
		if(condition === "")
			condition = "customer_id='"+customerId+"'";
	
		else
			condition = condition+" and customer_id='"+customerId+"'";
	
	soHeader.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(soDtls){
			if(soDtls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+soDtls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+soDtls.length+' results.';
				response.data 		= soDtls;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}

//OTP Verification
exports.salesOrderOtpVerification = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	soHeader.findOne({where : {salesorder_id : req.param('salesorderid')}})
	.then(function(soHeaderDet){
		if(soHeaderDet.otp_code == req.param('otpcode')){
//			soHeaderDet.sal_ordr_number	= 'Active';
			soHeaderDet.status			= 'Active';
			soHeaderDet.delivery_remark = req.param('deliveryremark');
			soHeaderDet.save();
			log.info('Your Order is '+req.param('status')+'.');
			response.status  	= true;
			response.message 	= 'Your Sales Order is '+req.param('status')+'.';
			res.send(response);
		} else{
			
			log.info('Invalid OTP.');
			response.status  	= false;
			response.message 	= 'Invalid OTP.';
			res.send(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}

//get all Sales order details
exports.getSalesOrderDetails = function(req, res){

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var selectedAttributes 	= "";
	var condition 			= "";
	var soDetailsId 		= req.param('salesorderdtlid');
	var soId 				= req.param('salesorderid');
	var status				= req.param('status');
	
	if(req.param('isfulllist')=='p')
		selectedAttributes=['salesorder_dtl_id','salesorder_id']
	
	if(soId != null)
		condition = "salesorder_id="+soId;
	
	if(soDetailsId!=null)
		if(condition === "")
			condition = "salesorder_dtl_id='"+soDetailsId+"'";
	
		else
			condition = condition+" and salesorder_dtl_id='"+soDetailsId+"'";
	
	soDetail.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
		.then(function(soDetls){
			if(soDetls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+soDetls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+soDetls.length+' results.';
				response.data 		= soDetls;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}

function deleteSalesOrderDetailsFn(condition){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	soDetail.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Sales details removed.');
			response.status  	= true;
			response.message 	= data+' Sales details removed.';
		} else{
			log.info('No Sales details found.');
			response.status  	= true;
			response.message 	= 'No Sales details found.';
		}
		return response;
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		return response;
	});
}