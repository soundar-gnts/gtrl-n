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

var log 	= require('../config/logger').logger;
var appMsg	= require('../config/Message.js');
var soHeader= require('../models/SalesOrderHeader.js');
var soDetail= require('../models/SalesOrderDetail.js');


//insert or update Purchase order details
exports.saveOrUpdateSalesOrder = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var salesDetails = [];
	var salesOrder = {
			salesorder_id		: req.param('salesorderid'),
			customer_id			: req.param('customerid'),
			total_tax			: req.param('totaltax'),
			Order_value			: req.param('ordervalue'),
			total_qty			: req.param('totalqty'),
			delivery_type		: req.param('deliverytype'),
			delivery_remark		: req.param('deliveryremark'),
			status 				: req.param('status'),
			last_updated_dt		: req.param('lastupdateddt'),
			last_updated_by		: req.param('lastupdatedby'),
			shipping_addr		: req.param('shippingaddr'),
			company_id			: req.param('companyid'),
			sal_ordr_number		: req.param('salordrnumber'),
			shipng_adrs_city	: req.param('shipngadrscity'),
			shipping_addr_state	: req.param('shippingaddrstate'),
			shipping_addr_pincde: req.param('shippingaddrpincde'),
			shipping_addr_name	: req.param('shippingaddrname'),
			exptdelv_date		: req.param('exptdelvdate'),
			shipping_mobilnum	: req.param('shippingmobilnum'),
			otp_code			: req.param('otpcode')
	}
	
	for(var i = 0; i < req.param('salesdetails').length; i++){
		var salesDetail = {
			
			product_id		: req.param('salesdetails')[i].productid,
			uom_id			: req.param('salesdetails')[i].uomid,
			rate			: req.param('salesdetails')[i].rate,
			order_qty		: req.param('salesdetails')[i].orderqty,
			order_value		: req.param('salesdetails')[i].ordervalue,
			discount_prcnt	: req.param('salesdetails')[i].discountprcnt,
			tax_ptcnt		: req.param('salesdetails')[i].taxptcnt,
			tax_value		: req.param('salesdetails')[i].taxvalue,
			basic_value		: req.param('salesdetails')[i].basicvalue,
			discount_value	: req.param('salesdetails')[i].discountvalue
		}
		salesDetails[i].push(salesDetail);
	}
	
	soHeader.findOne({where : {salesorder_id : req.param('salesorderid')}})
	.then(function(sOrder){
		if(!sOrder){
			soHeader.create(salesOrder)
			.then(function(data){
				log.info(req.param('salesdetails').length+' Sales details found.');
				for(var i = 0; i < req.param('salesdetails').length; i++){
					salesDetails[i].salesorder_id = data.salesorder_id,
					soDetail.create(salesDetails[i])
					.then(function(data){
						
					})
					.error(function(err){
						log.error(err);
						response.status  	= false;
						response.message 	= 'Internal error.';
						response.data  		= err;
						res.send(response);
					});
				}
				log.info('Salse order saved successfully.');
				response.message = 'Salse order saved successfully.';
				response.status  = true;
				res.send(response);
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		} else if(sOrder.status == 'Draft'){
			soHeader.upsert(salesOrder)
			.then(function(data){
				
				soDetail.destroy({where:{salesorder_id : parseInt(req.param('salesorderid'))}})
				.then(function(d){
					log.info(d+' Deleted');
					log.info(req.param('salesdetails').length+' Sales details found for edit.');
					for(var i = 0; i < req.param('purchasedetails').length; i++){
						
						salesDetails[i].salesorder_id = req.param('salesorderid');
						soDetail.upsert(salesDetails[i])
						.then(function(data){
							
						})
						.error(function(err){
							log.error(err);
							response.status  	= false;
							response.message 	= 'Internal error.';
							response.data  		= err;
							res.send(response);
						});
					}
					
					log.info('Sales order editted successfully.');
					response.message = 'Salse order editted successfully.';
					response.status  = true;
					res.send(response);
				}).error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		} else{
			log.info('Order is approved you cannot change the details.');
			response.message = 'Order is approved you cannot change the details.';
			response.status  = false;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
	
}


//get all Purchase order details
exports.getSalesOrder = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	var condition 	= "";
	var soId 		= req.param('salesorderid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(soId!=null)
		if(condition === "")
			condition = "salesorder_id='"+soId+"'";
	
		else
			condition = condition+" and salesorder_id='"+soId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	soHeader.findAll({
		where	: [condition],
		include	: {model : soDetail}
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

//Change Purchase order status.
exports.cahngeSalesOrderStatus = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	soHeader.findOne({where : {salesorder_id : req.param('salesorderid')}})
	.then(function(soHeaderDet){
		soHeaderDet.status = req.param('status');
		psoHeaderDet.save();
		log.info('Your Order is '+req.param('status')+'.');
		response.status  	= true;
		response.message 	= 'Your Order is '+req.param('status')+'.';
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