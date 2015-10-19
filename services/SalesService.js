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
 * 0.1				19-10-2015	Haris K.A.			
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
var saleDtl = require('../models/SaleDtl.js');
var saleHdr = require('../models/SaleHeader.js');

exports.getSaleDetail=function(productid,batchno,callback){
	console.log(productid);
	saleDtl.findOne({where:[{product_id:productid,batch_no:batchno}]})
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
	if(sales.sale_id != null){
		saleHdr.upsert(sales)
		.then(function(data){
			
			log.info(salesDeleteDetailsIds.length+' Sale detail is going to remove.');
			log.info(salesDetails.length+' Sale detail is going to update');
			
			//delete sale details from sale detail table.
			for(var i = 0; i < salesDeleteDetailsIds.length; i++)
				deleteSaleDetailsFn("sale_dtlid='"+salesDeleteDetailsIds[i].sale_dtlid+"'", function(result){
					if(!result.status)
						callback(result);
				});
			
			//update/save new sale details into sale detail table.
			for(var i = 0; i < salesDetails.length; i++)
				saveOrUpdateSaleDetailsFn(salesDetails[i], function(result){
					if(!result.status)
						callback(result);
				});
			
			log.info(appMsg.SALESEDITSUCCESS);
			response.message 	= appMsg.SALESEDITSUCCESS;
			response.data  		= salesOrder.salesorder_id;
			response.status  	= true;
			callback(response);
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
				
		saleHdr.create(sales)
		.then(function(data){
				
			for(var i = 0; i < salesDetails.length; i++){
				salesDetails[i].sale_id = data.sale_id;
				saveOrUpdateSaleDetailsFn(salesDetails[i], function(result){
					if(!result.status)
						callback(result);
				});
			}
			log.info(appMsg.SALESSAVESUCCESS);
			response.message	= appMsg.SALESSAVESUCCESS;
			response.data  		= data.sale_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
		

		
	}
	
}

function saveOrUpdateSaleDetailsFn(saleDetail, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	log.info(fileName+'.saveOrUpdateSaleDetailsFn');
	saleDtl.upsert(saleDetail)
	.then(function(data){
		log.error('Sale detail saved');
		response.status  	= true;
		callback(response);
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});

}

function deleteSaleDetailsFn(condition, callback){
	log.info(fileName+'.deleteSaleDetailsFn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	saleDtl.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Sale details removed.');
			response.status  	= true;
			callback(response);
		} else{
			log.info('No Sales details found.');
			response.status  	= true;
			callback(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

exports.getSalesFn = function(condition, callback){
	
}

exports.changeSalesStatusFn = function(sale_id, sales, callback){
	
}

exports.getSalesDetailsFn = function(condition, callback){
	
}