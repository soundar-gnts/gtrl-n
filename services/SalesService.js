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
var log					= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var path	 			= require('path');
var fileName			= path.basename(__filename);
var saleDtl 			= require('../models/SaleDtl.js');
var saleHdr 			= require('../models/SaleHeader.js');
var salesDeliveryDetail = require('../models/SalesDeliveryDetail.js');

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
			response.data  		= data.salesorder_id;
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
				console.log(data)
			for(var i = 0; i < salesDetails.length; i++){
				console.log(data.sale_id);
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
		log.info('Sale detail saved');
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

exports.getSalesFn = function(condition, fetchAssociation, selectedAttributes, callback){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saleHdr.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(saleHdrs){
			if(saleHdrs.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info('About '+saleHdrs.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+saleHdrs.length+' results.';
				response.data 		= saleHdrs;
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

exports.getSalesDetailsFn = function(condition, selectedAttributes, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saleDtl.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
	.then(function(saleDtls){
		if(saleDtls.length == 0){
			log.info(appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+saleDtls.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+saleDtls.length+' results.';
			response.data 		= saleDtls;
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

exports.saveOrUpdateSalesDeliveryDetailsFn = function(salesDelvryDetail, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesDelvryDetail.delivery_dtlid != null){
		salesDeliveryDetail.upsert(salesDelvryDetail)
		.then(function(data){
			log.info(appMsg.SALESDELIVERYDETAILSEDITSUCCESS);
			response.message 	= appMsg.SALESDELIVERYDETAILSEDITSUCCESS;
			response.data  		= salesDelvryDetail.delivery_dtlid;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		salesDeliveryDetail.create(salesDelvryDetail)
		.then(function(data){
			log.info(appMsg.SALESDELIVERYDETAILSSAVESUCCESS);
			response.message 	= appMsg.SALESDELIVERYDETAILSSAVESUCCESS;
			response.data  		= data.delivery_dtlid;
			response.status  	= true;
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

exports.getSalesDeliveryDetailsFn = function(condition, selectedAttributes, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	salesDeliveryDetail.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
	.then(function(saleDelvery){
		if(saleDelvery.length == 0){
			log.info(appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+saleDelvery.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+saleDelvery.length+' results.';
			response.data 		= saleDelvery;
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