/**
 * @Filename 		: SalesPymtDtlService.js
 * @Description 	: To write Business Logic for Sales Pymt Dtl
 * @Author 			: SOUNDAR C 
 * @Date 			: October 26, 2015
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
var salespymtdtl 	= require('../models/SalesPymtDtl.js');
var log 			= require('../config/logger').logger;
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
						};
var appmsg			= require('../config/Message.js');

var path 			= require('path');
var filename		= path.basename(__filename);

// To get Sales Payment Details List based on user param
exports.getSalesPymtDetails = function(condition, callback) {
	
	salespymtdtl.findAll({where : [condition]})
	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getSalesPymtDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>>getSalesPymtDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getSalesPymtDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}




// To Save/Update Sales Payment Details
exports.saveSalesPymtDetails = function(salesPymntDetails, callback) {
	log.info(filename+'>>saveSalesPymtDetails>>');
	if(	salespymtdtl.sale_pymtid != null){
		salespymtdtl.upsert(salesPymntDetails)
		.then(function(data){
			log.info(appmsg.SALESPAYMENTDETAILEDITSUCCESS);
			response.message 	= appmsg.SALESPAYMENTDETAILEDITSUCCESS;
			response.status  	= true;
			response.data		= salespymtdtl.sale_pymtid;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		salespymtdtl.create(salesPymntDetails)
		.then(function(data){
			log.info(appmsg.SALESPAYMENTDETAILSAVESUCCESS);
			response.message 	= appmsg.SALESPAYMENTDETAILSAVESUCCESS;
			response.status  	= true;
			response.data		= data.sale_pymtid;
			callback(response);
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

//To add New Record in Sales Payment Details
exports.addSalesPymtDetails = function(saleid,billtype,paymentmode,cardtypeid,cardno,approvalno,voucherid,paidamount) {
	salespymtdtl.create({
		sale_id 				: saleid,
		bill_type 				: billtype,
		payment_mode 			: paymentmode,
		card_type_id 			: cardtypeid,
		card_no 				: cardno,
		approval_no 			: approvalno,
		voucher_id 				: voucherid,
		paid_amount 			: paidamount
		
	}).then(function(data){
			log.info(filename+'>> addSalesPymtDetails >>'+appmsg.SAVEMESSAGE);
	}).error(function(err){
			log.info(filename+'>> addSalesPymtDetails >>');
			log.error(err);
	});
		
}


//To Delete Sales Payment  Detail
exports.deleteSalesPymtDetails = function(condition, callback) {
	log.info(filename+'>> deleteSalesPymtDetails >>');
	
	salespymtdtl.destroy({where:[condition]})
		.then(function(data){
			if(data >= '1'){
				log.info(data+' Sales payment details removed.');
				response.status  	= true;
				callback(response);
			} else{
				log.info('No Sales payment details found.');
				response.status  	= true;
				callback(response);
			}
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
		
}
