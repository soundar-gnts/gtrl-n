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

var path			= require('path');
var fileName		= path.basename(__filename);
var log 			= require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var soHeader		= require('../models/SalesOrderHeader.js');
var soDetail		= require('../models/SalesOrderDetail.js');
var product			= require('../models/Product.js');
var productImage	= require('../models/ProductImage.js');
var common			= require('../services/CommonService.js');
var slnogenService	= require('../services/SlnoGenService.js');
var productService	= require('../services/ProductService.js');
var taxService		= require('../services/TaxService.js');
var salesPymtDtlService = require('../services/SalesPymtDtlService.js');

//save or update salesorder header
var saveOrUpdateSalesOrderHeader = function(salesOrder, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesOrder.salesorder_id != null){
		soHeader.upsert(salesOrder)
		.then(function(data){
			log.info(appMsg.SALESORDEREDITSUCCESS);
			response.message 	= appMsg.SALESORDEREDITSUCCESS;
			response.data  		= salesOrder.salesorder_id;
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
		soHeader.create(salesOrder)
		.then(function(data){
			log.info(appMsg.SALESORDERSAVESUCCESS);
			response.message	= appMsg.SALESORDERSAVESUCCESS;
			response.data  		= data.salesorder_id;
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

//save or update sales order details function
var saveOrUpdateSalesOrderDetails = function(salesDetail, callback) {

	log.info(fileName+'.saveOrUpdateSalesOrderDetailsFn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesDetail.salesorder_dtl_id != null){
		soDetail.upsert(salesDetail)
		.then(function(data){
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		soDetail.create(salesDetail)
		.then(function(data){
			
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

//insert or update Sales order details
var saveOrUpdateSalesOrder = function(salesOrder, salesDetails, salesDeleteDetailsIds, callback){
	
	saveOrUpdateSalesOrderHeader(salesOrder, function(header){
		if(header.status){
			if(salesDetails != null){
				salesDetails.forEach(function(salesDetail){
					
					salesDetail.salesorder_id = header.data;
					var pdCondition					= "prod_id='"+salesDetail.product_id+"'";
					productService.getProduct(pdCondition, '', '', function(proDetails){
						
						console.log('proDetails');
						
						//console.log(proDetails.data[0]);
						salesDetail.discount_prcnt	= proDetails.data[0].max_discount;
						//console.log('salesDetails.discount_prcnt : '+salesDetails.discount_prcnt);
						salesDetail.basic_value		= parseInt(proDetails.data[0].mrp) * parseInt(salesDetail.order_qty);
						//console.log('salesDetails.basic_value : '+salesDetails.basic_value);
						salesDetail.discount_value	= proDetails.data[0].max_discount/100*salesDetail.basic_value;
						//console.log('salesDetails.discount_value : '+salesDetails.discount_value);
						salesDetail.order_value		= salesDetail.basic_value - salesDetail.discount_value;
						//console.log('salesDetails.order_value : '+salesDetails.order_value);
						var taxCondition					= "tax_id='"+proDetails.data[0].sell_tax_id+"'";
						//console.log('proDetails.data.sell_tax_id : '+proDetails.data[0].sell_tax_id);
						taxService.getTax(taxCondition, '', function(taxDetails){
							console.log('taxDetails');
							//console.log(taxDetails);
							salesDetail.tax_ptcnt		= taxDetails.data[0].cst;
							//console.log('salesDetails.tax_ptcnt : '+salesDetails.tax_ptcnt);
							salesDetail.tax_value		= taxDetails.data[0].cst/100*salesDetail.basic_value;
							//console.log('salesDetails[i].tax_value : '+salesDetails.tax_value);
							saveOrUpdateSalesOrderDetails(salesDetail, function(detail){
								console.log(detail);
							});
						});
					});
				});
				
			}
			callback(header);
		} else{
			callback(header);
		}
	});
}

//get Sales order header
var getSalesOrder = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getSalesOrder');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	
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
				callback(response);
			} else{
				log.info('About '+soDtls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+soDtls.length+' results.';
				response.data 		= soDtls;
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

//get Sales order details
var getSalesOrderDetails = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getSalesOrderDetails');

	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	
	soDetail.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(soDetls){
			if(soDetls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info('About '+soDetls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+soDetls.length+' results.';
				response.data 		= soDetls;
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


