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

var path				= require('path');
var fileName			= path.basename(__filename);
var log 				= require('../config/logger').logger;
var APPMSG				= require('../config/Message.js');
var CONSTANT			= require('../config/Constants.js');

var soHeader			= require('../models/SalesOrderHeader.js');
var soDetail			= require('../models/SalesOrderDetail.js');
var product				= require('../models/Product.js');
var productImage		= require('../models/ProductImage.js');

var slnogenService		= require('../services/SlnoGenService.js');
var productService		= require('../services/ProductService.js');
var taxService			= require('../services/TaxService.js');
var salesPymtDtlService = require('../services/SalesPymtDtlService.js');
var messageService 		= require('../services/MessagesService.js');
var pushNotfctnService	= require('../services/PushNotificationService.js');

var common				= require('../services/CommonService.js');

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
				log.info(APPMSG.LISTNOTFOUNDMESSAGE);
				response.message = APPMSG.LISTNOTFOUNDMESSAGE;
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
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
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
				log.info(APPMSG.LISTNOTFOUNDMESSAGE);
				response.message = APPMSG.LISTNOTFOUNDMESSAGE;
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
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

//save or update salesorder header
var saveOrUpdateSalesOrderHeader = function(salesOrder, callback){
	log.info(fileName+'.saveOrUpdateSalesOrderHeader');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if sales order header id exist then update, else create new entry
	if(salesOrder.salesorder_id != null){
		soHeader.upsert(salesOrder)
		.then(function(data){
			log.info(APPMSG.SALESORDEREDITSUCCESS);
			response.message 	= APPMSG.SALESORDEREDITSUCCESS;
			response.data  		= salesOrder.salesorder_id;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		soHeader.create(salesOrder)
		.then(function(data){
			log.info(APPMSG.SALESORDERSAVESUCCESS);
			response.message	= APPMSG.SALESORDERSAVESUCCESS;
			response.data  		= data.salesorder_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

//save or update sales order details function
var saveOrUpdateSalesOrderDetails = function(salesDetail, callback) {

	log.info(fileName+'.saveOrUpdateSalesOrderDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if sales order detail id exist then update, else create new entry
	if(salesDetail.salesorder_dtl_id != null){
		soDetail.upsert(salesDetail)
		.then(function(data){
			log.info(APPMSG.SALESORDERDETAILSEDITSUCCESS);
			response.message	= APPMSG.SALESORDERDETAILSEDITSUCCESS;
			response.data  		= salesDetail.salesorder_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		soDetail.create(salesDetail)
		.then(function(data){
			log.info(APPMSG.SALESORDERDETAILSSAVESUCCESS);
			response.message	= APPMSG.SALESORDERDETAILSSAVESUCCESS;
			response.data  		= data.salesorder_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
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
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

//add to cart edit cart add and edit sales order details
var saveOrUpdateSalesOrder = function(slid, salesOrder, salesDetails, salesDeleteDetailsIds, callback){
	log.info(fileName+'.saveOrUpdateSalesOrder');
	saveOrUpdateSalesOrderHeader(salesOrder, function(header){
		//if condition is true inserted successfully, else there is an error while inserting header
		if(header.status){
			log.info('header.status'+header.status);
			//log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			//log.info(salesDetails.length+' Sales detail is going to update/save');
			
			//if slid exist, serial number generated, so need to update slnoGen table 
			if(slid != null)
				slnogenService.updateSequenceNo(slid, salesOrder.last_updated_dt, salesOrder.last_updated_by);
			
			//check any selected product is need to remove, if yes then remove
			if(salesDeleteDetailsIds != null)
				salesDeleteDetailsIds.forEach(function(salesDelDetail){
					deleteSalesOrderDetailsFn("salesorder_dtl_id='"+salesDelDetail.salesorder_dtl_id+"'", function(result){
						log.info(result);
					});
				});
			
			//check any selected product need to edit or is there any new product, if yes then edit/create
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
			if(result.data[0].status == CONSTANT.STATUSCANCELLED){
				log.info('Your Order is '+CONSTANT.STATUSCANCELLED);
				response.status  	= true;
				response.message 	= 'Your Order is '+CONSTANT.STATUSCANCELLED;
				res.send(response);
			} else if(result.data[0].otp_code == req.param('otpcode')){
				var p = {
						salesorderid		: result.data[0].salesorder_id,
						salordrnumber		: result.data[0].sal_ordr_number,
						shipngadrscity		: result.data[0].shipng_adrs_city,
						shippingaddrstate	: result.data[0].shipping_addr_state,
						shippingaddr_pincde	: result.data[0].shipping_addr_pincde,
						shippingaddr_name	: result.data[0].shipping_addr_name,
						shippingmobilnum	: result.data[0].shipping_mobilnum,
						landmark			: result.data[0].land_mark,
						shippingaddr		: result.data[0].shipping_addr,
						availablehours		: result.data[0].available_hours,
						orderdate			: result.data[0].order_date
						
				}
				if(result.data[0].status == CONSTANT.STATUSCART){
					
					var slNoCondition = {
							company_id 			: req.param('companyid'),
							ref_key 			: CONSTANT.SHOPPING_APP_ORDER_NO,
							autogen_yn 			: 'Y',
							status 				: 'Active'
					}
					slnogenService.getSlnoValu(slNoCondition, function(sl){
						console.log(sl.sno);
						result.data[0].sal_ordr_number	= sl.sno;
						result.data[0].status			= CONSTANT.STATUSPENDING;
						result.data[0].order_date		= new Date();
						saveOrUpdateSalesOrderHeader(result.data[0].dataValues, function(data){
							slnogenService.updateSequenceNo(sl.slid,req.param('lastupdateddt'),req.param('lastupdatedby'));
							log.info(APPMSG.SALESORDEROTPVERIFICATIONSUCCESS);
							response.status  	= true;
							response.message 	= APPMSG.SALESORDEROTPVERIFICATIONSUCCESS;
							p.salordrnumber		= sl.sno;
							p.orderdate			= result.data[0].order_date;
							response.data  		= p;
							console.log('OTP');
							console.log(p);
							res.send(response);
						});
					});
				} else{
					log.info(APPMSG.SALESORDEROTPVERIFICATIONALREADYSUCCESS);
					response.status  	= true;
					response.message 	= APPMSG.SALESORDEROTPVERIFICATIONALREADYSUCCESS;
					response.data  		= p;
					console.log('OTP');
					console.log(p);
					res.send(response);
				}
				
				
			} else{
				log.info(APPMSG.SALESORDEROTPVERIFICATIONFAILURE);
				response.status  	= false;
				response.message 	= APPMSG.SALESORDEROTPVERIFICATIONFAILURE;
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
	
	var salesOdr = {
		salesorder_id		: req.param('salesorderid'),
		status 				: req.param('status'),
		last_updated_dt		: req.param('lastupdateddt'),
		last_updated_by		: req.param('lastupdatedby'),
	}
	
	var condition = "salesorder_id='"+salesOrder.salesorder_id+"'";
	getSalesOrder(condition,'','', function(salesOrder){
		if(salesOrder.status){
			//check if the order is Approved/Delivered. if yes, cannot cancelled else can Cancelled/Rejected/Approved.
			if(salesOdr.status == CONSTANT.STATUSCANCELLED && (salesOrder.data[0].status == CONSTANT.STATUSAPPROVED|| salesOrder.data[0].status == CONSTANT.STATUSDELIVERED)){
				log.info('Sales order is '+salesOrder.data[0].status+'. So that you cannot '+salesOdr.status);
				response.status  	= true;
				response.message 	= 'Sales order is '+salesOrder.data[0].status+'. So that you cannot '+salesOdr.status;
				res.send(response);
			} else{
				saveOrUpdateSalesOrderHeader(salesOdr, function(result){
					
					if(result.status){

						//insert into message table when status is Cancelled/Approved/Rejected
						if(salesOdr.status == CONSTANT.STATUSCANCELLED || salesOdr.status == CONSTANT.STATUSAPPROVED || salesOdr.status == CONSTANT.STATUSREJECTED){
							var msgObj = {
									company_id 			: salesOrder.data[0].company_id,
									//msg_type			: dataTypes.STRING,
									//msg_sender			: dataTypes.STRING,
									//msg_receivers		: dataTypes.STRING,
									//msg_cc				: dataTypes.STRING,
									//msg_subject			: dataTypes.STRING,
									//msg_body			: dataTypes.STRING,
									//client_ip			: dataTypes.STRING,
									//user_id				: dataTypes.INTEGER,
									//msg_response		: dataTypes.STRING,
									//msg_status			: dataTypes.STRING,
									//msg_sent_dt			: dataTypes.DATE

							}
							messageService.saveMessages(msgObj, function(rslt){
								log.info(rslt);
							});
						}
						
						//push notification when status is Approved/Rejected/Cancelled.
						if((salesOdr.status == CONSTANT.STATUSCANCELLED &&  salesOrder.data[0].order_type == 'POS') || salesOdr.status == CONSTANT.STATUSAPPROVED || salesOdr.status == CONSTANT.STATUSREJECTED){
							var pushNotfictn = {
								company_id 				: req.param("companyid"),
								phone_no 				: req.param("phoneno"),
								message 				: req.param("message"),
								ref_date 				: req.param("refdate"),
								user_id 				: req.param("userid"),
								last_updated_dt 		: req.param("lastupdateddt"),
								last_updated_by 		: req.param("lastupdatedby")
						
							}
							pushNotfctnService.savePushNotification(pushNotfictn, function(push){
								log.info(push);
							});
						}
						
						log.info('Sales order is '+req.param('status'));
						response.status  	= true;
						response.message 	= 'Sales order is '+req.param('status');
						res.send(response);
					} else{
						res.send(result);
					}
					
				});
			}
		} else{
			res.send(salesOrder);
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

