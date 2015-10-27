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

//insert or update Sales order details
exports.saveOrUpdateSalesOrderFn = function(salesOrder, salesDetails, salesDeleteDetailsIds, res){
	
	log.info(fileName+'.saveOrUpdateSalesOrderFn');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesOrder.salesorder_id != null){
		console.log("Edit cart");
		console.log(salesOrder);
		console.log(salesDetails);
		soHeader.upsert(salesOrder)
		.then(function(data){
			
			log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			//log.info(salesDetails.length+' Sales detail is going to update');
			
			//delete sales details from sales order detail table.
			for(var i = 0; i < salesDeleteDetailsIds.length; i++)
				deleteSalesOrderDetailsFn("salesorder_dtl_id='"+salesDeleteDetailsIds[i].salesorder_dtl_id+"'");
			
			//update/save new sales details into sales order table.
			if(salesDetails != null){
				var condition					= "prod_id='"+salesDetails.product_id+"'";
				productService.getProduct(condition, '', '', function(proDetails){
					console.log('proDetails');
					//console.log(proDetails.data[0]);
					salesDetails.discount_prcnt	= proDetails.data[0].max_discount;
					//console.log('salesDetails.discount_prcnt : '+salesDetails.discount_prcnt);
					salesDetails.basic_value		= parseInt(proDetails.data[0].mrp) * parseInt(salesDetails.order_qty);
					//console.log('salesDetails.basic_value : '+salesDetails.basic_value);
					salesDetails.discount_value	= proDetails.data[0].max_discount/100*salesDetails.basic_value;
					//console.log('salesDetails.discount_value : '+salesDetails.discount_value);
					salesDetails.order_value		= salesDetails.basic_value - salesDetails.discount_value;
					//console.log('salesDetails.order_value : '+salesDetails.order_value);
					var condition					= "tax_id='"+proDetails.data[0].sell_tax_id+"'";
					//console.log('proDetails.data.sell_tax_id : '+proDetails.data[0].sell_tax_id);
					taxService.getTax(condition, '', function(taxDetails){
						console.log('taxDetails');
						//console.log(taxDetails);
						salesDetails.tax_ptcnt		= taxDetails.data[0].cst;
						//console.log('salesDetails.tax_ptcnt : '+salesDetails.tax_ptcnt);
						salesDetails.tax_value		= taxDetails.data[0].cst/100*salesDetails.basic_value;
						//console.log('salesDetails[i].tax_value : '+salesDetails.tax_value);
						saveOrUpdateSalesOrderDetailsFn(salesDetails);
					});
					
				});
			}
			log.info(appMsg.SALESORDEREDITSUCCESS);
			response.message 	= appMsg.SALESORDEREDITSUCCESS;
			response.data  		= data;
			response.status  	= true;
			res.send(response);
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	} else{
		console.log('add cart')
		var condition = "status='cart' and customer_id='"+salesOrder.customer_id+"'";
		getSalesOrder(condition, '', '', function(result){
			if(result.status){
				console.log('Cart have')
				console.log(result.data[0].salesorder_id);
				salesDetails.salesorder_id = result.data[0].salesorder_id;
				//console.log('salesDetails.product_id : '+salesDetails.product_id);
				var condition					= "prod_id='"+salesDetails.product_id+"'";
				productService.getProduct(condition, '', '', function(proDetails){
					console.log('proDetails');
					//console.log(proDetails.data[0]);
					salesDetails.discount_prcnt	= proDetails.data[0].max_discount;
					//console.log('salesDetails.discount_prcnt : '+salesDetails.discount_prcnt);
					salesDetails.basic_value		= parseInt(proDetails.data[0].mrp) * parseInt(salesDetails.order_qty);
					//console.log('salesDetails.basic_value : '+salesDetails.basic_value);
					salesDetails.discount_value	= proDetails.data[0].max_discount/100*salesDetails.basic_value;
					//console.log('salesDetails.discount_value : '+salesDetails.discount_value);
					salesDetails.order_value		= salesDetails.basic_value - salesDetails.discount_value;
					//console.log('salesDetails.order_value : '+salesDetails.order_value);
					var condition					= "tax_id='"+proDetails.data[0].sell_tax_id+"'";
					//console.log('proDetails.data.sell_tax_id : '+proDetails.data[0].sell_tax_id);
					taxService.getTax(condition, '', function(taxDetails){
						console.log('taxDetails');
						//console.log(taxDetails);
						salesDetails.tax_ptcnt		= taxDetails.data[0].cst;
						//console.log('salesDetails.tax_ptcnt : '+salesDetails.tax_ptcnt);
						salesDetails.tax_value		= taxDetails.data[0].cst/100*salesDetails.basic_value;
						//console.log('salesDetails[i].tax_value : '+salesDetails.tax_value);
						saveOrUpdateSalesOrderDetailsFn(salesDetails);
					});
					
				});
				
				log.info(appMsg.SALESORDERSAVESUCCESS);
				response.message	= appMsg.SALESORDERSAVESUCCESS;
				response.data  		= result.data[0].salesorder_id;
				response.status 	= true;
				res.send(response);
			} else{
				console.log('Cart have not')
				salesOrder.otp_code			= common.generateOTP(4);
				soHeader.create(salesOrder)
					.then(function(data){
							
						salesDetails.salesorder_id = data.salesorder_id;
						console.log('salesDetails.product_id : '+salesDetails.product_id);
						var condition					= "prod_id='"+salesDetails.product_id+"'";
						productService.getProduct(condition, '', '', function(proDetails){
							console.log('proDetails');
							//console.log(proDetails.data[0]);
							salesDetails.discount_prcnt	= proDetails.data[0].max_discount;
							//console.log('salesDetails.discount_prcnt : '+salesDetails.discount_prcnt);
							salesDetails.basic_value		= parseInt(proDetails.data[0].mrp) * parseInt(salesDetails.order_qty);
							//console.log('salesDetails.basic_value : '+salesDetails.basic_value);
							salesDetails.discount_value	= proDetails.data[0].max_discount/100*salesDetails.basic_value;
							//console.log('salesDetails.discount_value : '+salesDetails.discount_value);
							salesDetails.order_value		= salesDetails.basic_value - salesDetails.discount_value;
							//console.log('salesDetails.order_value : '+salesDetails.order_value);
							var condition					= "tax_id='"+proDetails.data[0].sell_tax_id+"'";
							//console.log('proDetails.data.sell_tax_id : '+proDetails.data[0].sell_tax_id);
							taxService.getTax(condition, '', function(taxDetails){
								console.log('taxDetails');
								//console.log(taxDetails);
								salesDetails.tax_ptcnt		= taxDetails.data[0].cst;
								//console.log('salesDetails.tax_ptcnt : '+salesDetails.tax_ptcnt);
								salesDetails.tax_value		= taxDetails.data[0].cst/100*salesDetails.basic_value;
								//console.log('salesDetails[i].tax_value : '+salesDetails.tax_value);
								saveOrUpdateSalesOrderDetailsFn(salesDetails);
							});
							
						});
						
						log.info(appMsg.SALESORDERSAVESUCCESS);
						response.message	= appMsg.SALESORDERSAVESUCCESS;
						response.data  		= data.salesorder_id;
						response.status 	= true;
						res.send(response);
					})
					.error(function(err){
						log.error(err);
						response.status  	= false;
						response.message 	= appMsg.INTERNALERRORMESSAGE;
						response.data  		= err;
						res.send(response);
					});
			}
		});
	}
}

function saveOrUpdateSalesOrderDetailsFn(salesDetail) {
	log.info(fileName+'.saveOrUpdateSalesOrderDetailsFn');
	soDetail.upsert(salesDetail)
	.then(function(data){
		log.info('Sales order details saved.');
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}

//get all Sales order details
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
exports.getSalesOrderFn = getSalesOrder;
//OTP Verification
exports.salesOrderOtpVerification = function(req, res){
	log.info(fileName+'.salesOrderOtpVerification');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	soHeader.findOne({where : {salesorder_id : req.param('salesorderid')}})
	.then(function(soHeaderDet){
		var refkey = 'ODER_NO';
		if(soHeaderDet.otp_code == req.param('otpcode')){
			var slNoCondition = {
					company_id 			: salesOrder.company_id,
					ref_key 			: refkey,
					autogen_yn 			: 'y',
					status 				: 'Active'
			}
			slnogenServic.getSlnoValu(slNoCondition, function(sl){
				console.log(sl);
				soHeaderDet.sal_ordr_number	= sl.sno;
				soHeaderDet.status			= 'Pending';
				soHeaderDet.save()
				.then(function(data){
					slnogenService.updateSequenceNo(sl.slid,req.param('lastupdateddt'),req.param('lastupdatedby'));
					log.info('OTP has been verified successfully.');
					response.status  	= true;
					response.message 	= 'OTP has been verified successfully.';
					res.send(response);
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERRORMESSAGE;
					response.data  		= err;
					res.send(response);
				});
				
			});
			
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
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}

// Approve, Cancel and Reject service for sales_order_hdr table
exports.changeSalesOrderStatus = function(req, res){
	log.info(fileName+'.changeSalesOrderStatus');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	soHeader.findOne({where : {salesorder_id : req.param('salesorderid')}})
	.then(function(soHeaderDet){
		
		soHeader.update({status:req.param('status'),delivery_remark:req.param('deliveryremark'),
			last_updated_by:req.param('lastupdatedby'),last_updated_dt:req.param('lastupdateddt')},
				{where : {salesorder_id:req.param('salesorderid')}}).error(function(err){
			
		});
		
		//For Sales Payment Details
		if(req.param('status')!=null&&req.param('status').toLowerCase()=='confirmed'){
		salesPymtDtlService.addSalesPymtDetails(req.param('saleid'),req.param('billtype'),req.param('paymentmode')
				,req.param('cardtypeid'),req.param('cardno'),req.param('approvalno'),req.param('voucherid'),req.param('paidamount'));
		}
		
		log.info('Sales order is '+req.param('status'));
		response.status  	= true;
		response.message 	= 'Sales order is '+req.param('status');
		res.send(response);
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		res.send(response);
	});
}

//get all Sales order details
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
exports.getSalesOrderDetails = getSalesOrderDetails;

function deleteSalesOrderDetailsFn(condition){
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
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		return response;
	});
}