/**
 * File Name	:	SalesReturnDtlService.js
 * Description	:	To write Business Logic For PurchaseReturnDtlService.
 * Author		:	Anand G
 * Date			:	November 14, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */
var purchaseReturnDtl 	= require('../models/SaleDtl.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};

//SaveOrUpdate Purchase Return Details

	exports.saveSalesReturnDtl = function(req, res){	
		
				salesReturnDtl.upsert({
							
							sale_dtlid			: req.param('saledtlid'),
							sale_id				: req.param('saleid'),
							product_id 			: req.param('productid'),
							sold_qty 			: req.param('soldqty'),
							uom_id 				: req.param('uomid'),
							return_qty 			: req.param('returnqty'),
							rate 				: req.param('rate'),
							basic_value 		: req.param('basicvalue'),
							discount_prcnt 		: req.param('discountprcnt'),
							discount_value		: req.param('discountvalue'),
							tax_id 				: req.param('taxid'),
							tax_prnct 			: req.param('taxprnct'),
							tax_value 			: req.param('taxvalue'),
							sale_value			: req.param('salevalue'),
							batch_no			: req.param('batchno'),
							salesorder_dtl_id	: req.param('salesorderdtlid')
					        
							})
				
							.then(function(data){
								if(data){
									log.info(' saved successfully.');
									response.message = ' Saved successfully.';
									response.status  = true;
									res.send(response);
								}
								else{
									log.info(' Updated successfully.');
									response.message = ' Updated successfully.';
									response.status  = true;
									res.send(response);
								}
								
							}).error(function(err){
								log.error(err);
								response.status  	= false;
								response.message 	= 'Internal error.';
								response.data  		= err;
								res.send(response);
							});
					}; 


// To get Purchase Return Dtl List 
		
		exports.getSalesReturnDtl = function(req, res) {
			
			var condition 	=	 "";
			var sale_id		=	req.param("saleid");
			var product_id	=	req.param("productid");
			var sale_dtlid	=	req.param("saledtlid");
					
			
			if(returndtlid!=null){
				condition ="sale_dtlid="+saledtlid;
			}
			if(returnid!=null){
				if(condition === ""){
					returnid="sale_id='"+saleid+"'";
				}else {
					condition=condition+" and sale_id='"+saleid+"'";
				}
			}
			if(productid!=null){
				if(condition === ""){
					condition="product_id='"+productid+"'";
				}else {
					condition=condition+" and product_id='"+productid+"'";
				}
			}
			
			purchaseReturnDtl.findAll({where : [condition]})
			
			.then(function(result) {
				if(result.length === 0){
					log.info('No data found.');
					response.message = appMsg.LISTNOTFOUNDMESSAGE;
					response.status  = false;		
					response.data  = "";		
					res.send(response);
				} else{
					
					log.info('About '+result.length+' results.');
					response.status  	= true;
					response.message 	= 'About '+result.length+' results.';
					response.data 		= result;
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
			
	

//Delete Purchase Return Details
	
	exports.deleteSalesReturnDtl = function(req, res) {		
		salesReturnDtl.destroy({where : {sale_id : req.param('saleid'),return_dtlid : req.param('saledtlid')}})
	
		.then(function(result) {
			
			if(result.length === 0){
				log.info('No data found.');
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;		
				response.data  = "";		
				res.send(response);
			} else{
				
				log.info('About '+result.length+' results.');
				response.status  	= true;
				response.message 	= result+' record is deleted.';
				response.data 		= result;
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