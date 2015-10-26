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
exports.getSalesPymtDetails = function(req, res) {
	var condition 			= "";
	var salepymtid			= req.param("salepymtid");
	var saleid				= req.param("saleid");
	var billtype			= req.param("billtype");
	var cardtypeid			= req.param("cardtypeid");
	var voucherid			= req.param("voucherid");
	if(salepymtid!=null){
		condition ="sale_pymtid="+salepymtid;
	}
	if(saleid!=null){
		if(condition === ""){
			condition="sale_id='"+saleid+"'";
		}else {
			condition=condition+" and sale_id='"+saleid+"'";
		}
	}
	if(billtype!=null){
		if(condition === ""){
			condition="bill_type='"+billtype+"'";
		}else {
			condition=condition+" and bill_type='"+billtype+"'";
		}
	}
	if(cardtypeid!=null){
		if(condition === ""){
			condition="card_type_id='"+cardtypeid+"'";
		}else {
			condition=condition+" and card_type_id='"+cardtypeid+"'";
		}
	}
	
	if(voucherid!=null){
		if(condition === ""){
			condition="voucher_id='"+voucherid+"'";
		}else {
			condition=condition+" and voucher_id='"+voucherid+"'";
		}
	}
	
	salespymtdtl.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getSalesPymtDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getSalesPymtDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getSalesPymtDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}




// To Save/Update Sales Payment Details
exports.saveSalesPymtDetails = function(req, res) {
	salespymtdtl.upsert({
		sale_pymtid				: req.param("salepymtid"),
		sale_id 				: req.param("saleid"),
		bill_type 				: req.param("billtype"),
		payment_mode 			: req.param("paymentmode"),
		card_type_id 			: req.param("cardtypeid"),
		card_no 				: req.param("cardno"),
		approval_no 			: req.param("approvalno"),
		voucher_id 				: req.param("voucherid"),
		paid_amount 			: req.param("paidamount")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveSalesPymtDetails>>'+appmsg.SAVEMESSAGE);
			response.message 	= appmsg.SAVEMESSAGE;
			response.status  	= true;
			response.data		= req.param("salepymtid");
			res.send(response);
		}
		else{
			log.info(filename+'>>saveSalesPymtDetails>>'+appmsg.UPDATEMESSAGE);
			response.message 	= appmsg.UPDATEMESSAGE;
			response.status  	= true;
			response.data		= req.param("salepymtid");
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveSalesPymtDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
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
exports.deleteSalesPymtDetails = function(req, res) {
	if(req.param("salepymtid")!=null){
		salespymtdtl.destroy({where:{sale_pymtid	: req.param("salepymtid")}})
		.then(function(data){
			log.info(filename+'>> deleteSalesPymtDetails >>'+appmsg.DELETEMESSAGE);
			response.message 	= appmsg.DELETEMESSAGE;
			response.status  	= true;
			response.data		= req.param("salepymtid");
			res.send(response);
			
		}).error(function(err){
			log.info(filename+'>> deleteSalesPymtDetails >>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
		}else{
			log.info(filename+'>> deleteSalesPymtDetails >>');
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("salepymtid");
			res.send(response);
		}
}
