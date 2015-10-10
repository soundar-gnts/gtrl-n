/**
 * File Name	:	PurchaseReturnDtlService.js
 * Description	:	To write Business Logic For PurchaseReturnDtlService.
 * Author		:	Saranya G
 * Date			:	October 09, 2015
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
var purchaseReturnDtl 	= require('../models/PurchaseReturnDtl.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};

//SaveOrUpdate Purchase Return Details

	exports.savePurchaseReturnDtl = function(req, res){	
		
				purchaseReturnDtl.upsert({
							return_dtlid		: req.param('returndtlid'),
							return_id			: req.param('returnid'),
							company_id 			: req.param('companyid'),
							product_id 			: req.param('productid'),
							return_qty 			: req.param('returnqty'),
							uom_id 				: req.param('uomid'),
							rate 				: req.param('rate'),
							basic_value 		: req.param('basicvalue'),	
							discount_prcnt 		: req.param('discountprcnt'),
							discount_value 		: req.param('discountvalue'),
							tax_id 				: req.param('taxid'),
							tax_prnct 			: req.param('rtaxprnct'),
							tax_value 			: req.param('taxvalue')
													
					        
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
		
		exports.getPurchaseReturnDtl = function(req, res) {
			
			var condition 	=	 "";
			var returnid	=	req.param("returnid");
			var productid	=	req.param("productid");
			var returndtlid	=	req.param("returndtlid");
					
			
			if(returndtlid!=null){
				condition ="return_dtlid="+returndtlid;
			}
			if(returnid!=null){
				if(condition === ""){
					returnid="return_id='"+returnid+"'";
				}else {
					condition=condition+" and return_id='"+returnid+"'";
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
	
	exports.deletePurchaseReturnDtl = function(req, res) {		
		purchaseReturnDtl.destroy({where : {return_id : req.param('returnid'),return_dtlid : req.param('returndtlid')}})
	
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