/**
 * @Filename 		: ProductSerialCodesService.js
 * @Description 	: To write Business Logic for t_account_payables. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 08, 2015
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
var productserialcodes 	= require('../models/ProductSerialCodes.js');
var log 				= require('../config/logger').logger;
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};
var appmsg				= require('../config/Message.js');

var path 				= require('path');
var filename			= path.basename(__filename);
var product 			= require('../models/Product.js');

// To get Product Serial Codes List based on user param
exports.getProductSerialCodesDetails = function(req, res) {
	var condition 		= "";
	var serialrefno		=req.param("serialrefno");
	var companyid		=req.param("companyid");
	var grnid			=req.param("grnid");
	var productid		=req.param("productid");
	var storeid			=req.param("storeid");
	var batchid			=req.param("batchid");
	var status			=req.param("status");
	if(serialrefno!=null){
		condition ="serial_refno="+serialrefno;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(grnid!=null){
		if(condition === ""){
			condition="grn_id='"+grnid+"'";
		}else {
			condition=condition+" and grn_id='"+grnid+"'";
		}
	}
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	if(storeid!=null){
		if(condition === ""){
			condition="store_id='"+storeid+"'";
		}else {
			condition=condition+" and store_id='"+storeid+"'";
		}
	}
	if(batchid!=null){
		if(condition === ""){
			condition="batch_id='"+batchid+"'";
		}else {
			condition=condition+" and batch_id='"+batchid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	productserialcodes.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getProductSerialCodesDetails>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>>getProductSerialCodesDetails>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductSerialCodesDetails>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}




// To Save/Update Product Serial Codes Details
exports.saveProductSerialCodes = function(req, res) {
	productserialcodes.upsert({
		serial_refno			: req.param("serialrefno"),
		company_id 				: req.param("companyid"),
		grn_id 					: req.param("grnid"),
		product_id 				: req.param("productid"),
		store_id 				: req.param("storeid"),
		batch_id 				: req.param("batchid"),
		ean_serialno 			: req.param("eanserialno"),
		store_serialno 			: req.param("storeserialno"),
		status 					: req.param("status"),
		print_status 			: req.param("printstatus")
		
	}).then(function(data){
		if(data){
			log.info(filename+'>>saveProductSerialCodes>>'+appmsg.SAVEMESSAGE);
			response.message = appmsg.SAVEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		else{
			log.info(filename+'>>saveProductSerialCodes>>'+appmsg.UPDATEMESSAGE);
			response.message = appmsg.UPDATEMESSAGE;
			response.status  = true;
			response.data	 = "";
			res.send(response);
		}
		
	}).error(function(err){
			log.info(filename+'>>saveProductSerialCodes>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
		
}

//To Insert New Product Serial.
exports.insertProductSerialCodes = function(companyid,grnid,productid,storeid,batchid,eanserialno,storeserialno) {
	
	//For get product earn serial number
	product.findOne({where:[{prod_id:productid}]})
	.then(function(result){
		
		//To get EARNSERIALNO
		if(result.ean_num_yn!=null&&result.ean_num_yn.toUpperCase()=='Y'){
			if(result.last_seq_no==null){
				eanserialno = '1';
			}else{
				eanserialno = result.last_seq_no.toString();
			}
			
		}
		productserialcodes.create({
			company_id 				: companyid,
			grn_id 					: grnid,
			product_id 				: productid,
			store_id 				: storeid,
			batch_id 				: batchid,
			ean_serialno 			: eanserialno,
			store_serialno 			: storeserialno,
			status 					: 'Available',
			print_status 			: 'Not Printed'
			
		}).then(function(data){
			
			//For update product serial sequence number
			console.log("eanserialno-->"+eanserialno);
			if(result.ean_num_yn!=null&&result.ean_num_yn=='Y'){
			product.update({last_seq_no:parseInt(eanserialno)+1},{where : {prod_id:productid}}).error(function(err){
				
			});
			}
			
		}).error(function(err){
			log.info(filename+'>>insertProductSerialCodes>>');
			log.error(err);
			
		});
		
		
	});
}
//To Update Product Serial Code Storeid.
exports.updateProductSerialStoreid= function(companyid,productid,storeid,batchid) {
			var serialcode = {	company_id 				: companyid,			
							product_id 				: productid,						
							batch_id 				: batchid,
						 }
		productserialcodes.update({store_id : storeid},{where : [serialcode]})
		.error(function(err){
			log.info(filename+'>> updateProductSerialStoreid >>');
			log.error(err);
		});	
}

//To Update Product Serial Status.
exports.updateProductSerialCodes = function(companyid,grnid,productid,storeid,batchid,status) {
	
		var serialcode = {
							company_id 				: companyid,			
							product_id 				: productid,
							store_id 				: storeid,
							batch_id 				: batchid,
						 }
		productserialcodes.update({status : status,print_status : 'Not Printed'},{where : [serialcode]})
		.error(function(err){
			
	});	
	
}
exports.insertStockLedger=function(productid,companyid,storeid,batchno,inqty,outqty,uomid,refno,refdate,refremarks){
	
	var serialcode = {
			company_id 				: companyid,			
			product_id 				: productid,
			store_id 				: storeid,
			batch_id 				: batchid,
		 }
	
	productserialcodes.findAll({where:[serialcode]})
	.then(function(result){		
		if(result.length === 0){
				productserialcodes.update({status : 'Returned',print_status : 'Not Printed'},{where : [serialcode]})

			}
			else{
				
				log.info('No data found.');
				response.message = 'No data found.';
				response.status  = false;
				response.data	 = "";
				res.send(response);
			
			}
		
		
	});
	
	
	
}
