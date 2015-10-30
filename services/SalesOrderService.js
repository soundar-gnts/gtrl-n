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
var refkey = 'ODER_NO';


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
			log.info(appMsg.SALESORDERSAVESUCCESS);
			response.message	= appMsg.SALESORDERDETAILSEDITSUCCESS;
			response.data  		= salesDetail.salesorder_id;
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
	} else{
		soDetail.create(salesDetail)
		.then(function(data){
			log.info(appMsg.SALESORDERSAVESUCCESS);
			response.message	= appMsg.SALESORDERDETAILSSAVESUCCESS;
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

//delete sales order details
var deleteSalesOrderDetailsFn = function(condition, callback){
	log.info(fileName+'.deleteSalesOrderDetailsFn');
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
			callback(response);
		} else{
			log.info('No Sales details found.');
			response.status  	= true;
			response.message 	= 'No Sales details found.';
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

//add to cart edit cart add and edit sales order details
var saveOrUpdateSalesOrder = function(salesOrder, salesDetails, salesDeleteDetailsIds, callback){
	saveOrUpdateSalesOrderHeader(salesOrder, function(header){
		if(header.status){
			console.log('header.status'+header.status);
			//log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			//log.info(salesDetails.length+' Sales detail is going to update');
			
			if(salesDeleteDetailsIds != null)
				salesDeleteDetailsIds.forEach(function(salesDelDetail){
					deleteSalesOrderDetailsFn("salesorder_dtl_id='"+salesDelDetail.salesorder_dtl_id+"'", function(result){
						log.info(result);
					});
				});
			
			if(salesDetails != null)
				salesDetails.forEach(function(salesDetail){
					
					salesDetail.salesorder_id = header.data;
					var pdCondition					= "prod_id='"+salesDetail.product_id+"'";
					productService.getProduct(pdCondition, '', '', function(proDetails){
						
						console.log('proDetails');
						
						//salesDetail.discount_prcnt	= proDetails.data[0].max_discount;
						//console.log('salesDetail.discount_prcnt : '+salesDetail.discount_prcnt);
						salesDetail.rate = proDetails.data[0].mrp;
						salesDetail.basic_value		= parseInt(proDetails.data[0].mrp) * parseInt(salesDetail.order_qty);
						console.log('salesDetail.basic_value : '+salesDetail.basic_value);
						//salesDetail.discount_value	= proDetails.data[0].max_discount/100*salesDetail.basic_value;
						//console.log('salesDetail.discount_value : '+salesDetail.discount_value);
						//salesDetail.order_value		= salesDetail.basic_value - salesDetail.discount_value;
						salesDetail.order_value		= salesDetail.basic_value;
						console.log('salesDetail.order_value : '+salesDetail.order_value);
						var taxCondition					= "tax_id='"+proDetails.data[0].sell_tax_id+"'";
						console.log('proDetails.data.sell_tax_id : '+proDetails.data[0].sell_tax_id);
						taxService.getTax(taxCondition, '', function(taxDetails){
							console.log('taxDetails');
							salesDetail.tax_ptcnt		= taxDetails.data[0].cst;
							console.log('salesDetail.tax_ptcnt : '+salesDetail.tax_ptcnt);
							salesDetail.tax_value		= taxDetails.data[0].cst/100*salesDetail.basic_value;
							console.log('salesDetails[i].tax_value : '+salesDetail.tax_value);
							saveOrUpdateSalesOrderDetails(salesDetail, function(detail){
								console.log(detail);
							});
							
						});
					});
				});
				
			
			callback(header);
		} else{
			console.log('header.status'+header.status);
			callback(header);
		}
	});
}

//OTP Verification
var salesOrderOtpVerification = function(req, res){
	log.info(fileName+'.salesOrderOtpVerification');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition = "salesorder_id='"+req.param('salesorderid')+"'";
	getSalesOrder(condition, '', '', function(result){
		if(result.status){
			if(result.data[0].otp_code == req.param('otpcode')){
				var p = {
						salesorderid		: result.data[0].salesorder_id,
						salordrnumber		: result.data[0].sal_ordr_number,
						shipngadrscity		: result.data[0].shipng_adrs_city,
						shippingaddrstate	: result.data[0].shipping_addr_state,
						shippingaddr_pincde	: result.data[0].shipping_addr_pincde,
						shippingaddr_name	: result.data[0].shipping_addr_name,
						shippingmobilnum	: result.data[0].shipping_mobilnum,
						landmark			: result.data[0].land_mark
						
				}
				if(result.data[0].status == 'cart'){
					
					var slNoCondition = {
							company_id 			: req.param('companyid'),
							ref_key 			: refkey,
							autogen_yn 			: 'Y',
							status 				: 'Active'
					}
					slnogenService.getSlnoValu(slNoCondition, function(sl){
						result.data[0].sal_ordr_number	= sl.sno;
						result.data[0].status			= 'Pending';
						saveOrUpdateSalesOrderHeader(result.data[0].dataValues, function(data){
							slnogenService.updateSequenceNo(sl.slid,req.param('lastupdateddt'),req.param('lastupdatedby'));
							log.info('OTP has been verified successfully.');
							response.status  	= true;
							response.message 	= 'OTP has been verified successfully.';
							p.salesorderid		= sl.no;
							response.data  		= p;
							res.send(response);
						});
					});
				}
				log.info('Your OTP has been already verified.');
				response.status  	= true;
				response.message 	= 'Your OTP has been already verified.';
				response.data  		= p;
				console.log(response);
				res.send(response);
				
			} else{
				log.info('Invalid OTP.');
				response.status  	= false;
				response.message 	= 'Invalid OTP.';
				res.send(response);
			}
			
		} else{
			res.send(result);
		}
	});
}

// Approve, Cancel and Reject service for sales_order_hdr table
var changeSalesOrderStatus = function(req, res){
	log.info(fileName+'.changeSalesOrderStatus');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	var salesOrder = {
		salesorder_id		: req.param('salesorderid'),
		status 				: req.param('status'),
		last_updated_dt		: req.param('lastupdateddt'),
		last_updated_by		: req.param('lastupdatedby'),
	}
	
	saveOrUpdateSalesOrderHeader(salesOrder, function(result){
		if(result.status){
			//TO DO : need clarification
//			if(salesOrder.status.toLowerCase()=='confirmed'){
//				salesPymtDtlService.addSalesPymtDetails(req.param('saleid'),
//														req.param('billtype'),
//														req.param('paymentmode'),
//														req.param('cardtypeid'),
//														req.param('cardno'),
//														req.param('approvalno'),
//														req.param('voucherid'),
//														req.param('paidamount'));
//			}
			log.info('Sales order is '+req.param('status'));
			response.status  	= true;
			response.message 	= 'Sales order is '+req.param('status');
			res.send(response);
		} else{
			res.send(result);
		}
		
	});
}

module.exports = {
		getSalesOrder				: getSalesOrder,
		getSalesOrderDetails		: getSalesOrderDetails,
		saveOrUpdateSalesOrder		: saveOrUpdateSalesOrder,
		salesOrderOtpVerification	: salesOrderOtpVerification,
		changeSalesOrderStatus		: changeSalesOrderStatus
}

