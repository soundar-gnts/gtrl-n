/**
 * File Name	:	PoService.js
 * Description	:	To write Business Logic For Purchase order header.
 * Author		:	Haris K.A.
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
 * 
 */

var log 	= require('../config/logger').logger;
var appMsg	= require('../config/Message.js');
var poHeader= require('../models/PoHeader.js');
var poDetail= require('../models/PoDetail.js');


//insert or update Purchase order details
exports.saveOrUpdatePo = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var purchaseOrder = {
			po_id			: req.param('poid'),
			company_id		: req.param('companyid'),
			po_no			: req.param('pono'),
			po_date			: req.param('podate'),
			store_id		: req.param('storeid'),
			supplier_id		: req.param('supplierid'),
			invoice_addr	: req.param('invoiceaddr'),
			shipping_addr	: req.param('shippingaddr'),
			po_remark		: req.param('poremark'),
			basic_total		: req.param('basictotal'),
			total_value		: req.param('totalvalue'),
			total_tax		: req.param('totaltax'),
			total_discount	: req.param('totaldiscount'),
			status 			: req.param('status'),
			last_updated_dt	: req.param('lastupdateddt'),
			last_updated_by	: req.param('lastupdatedby')
	}
	poHeader.findOne({where : {po_id : req.param('poid')}})
	.then(function(pOrder){
		if(!pOrder){
			poHeader.create(purchaseOrder)
			.then(function(data){
				var poHeaderId = data.po_id;
				log.info(req.param('purchasedetails').length+' Purchase details found.');
				for(var i = 0; i < req.param('purchasedetails').length; i++){
					var purchaseDetail = {
							po_id			: poHeaderId,
							manufg_id		: req.param('purchasedetails')[i].manufgid,
							prod_id			: req.param('purchasedetails')[i].prodid,
							po_qty			: req.param('purchasedetails')[i].poqty,
							bal_qty			: req.param('purchasedetails')[i].balqty,
							uom_id			: req.param('purchasedetails')[i].uomid,
							rate			: req.param('purchasedetails')[i].rate,
							basic_value		: req.param('purchasedetails')[i].basicvalue,
							discount_prcnt	: req.param('purchasedetails')[i].discountprcnt,
							tax_id			: req.param('purchasedetails')[i].taxid,
							tax_prnct		: req.param('purchasedetails')[i].taxprnct,
							tax_value		: req.param('purchasedetails')[i].taxvalue,
							purchase_value	: req.param('purchasedetails')[i].purchasevalue,
							discount_value	: req.param('purchasedetails')[i].discountvalue
					}
					poDetail.create(purchaseDetail)
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
				log.info('Purchase order saved successfully.');
				response.message = 'Purchase order saved successfully.';
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
		} else if(pOrder.status == 'Draft'){
			poHeader.upsert(purchaseOrder)
			.then(function(data){
				
				poDetail.destroy({where:{po_id : parseInt(req.param('poid'))}})
				.then(function(d){
					log.info(d+' Deleted');
					log.info(req.param('purchasedetails').length+' Purchase details found for edit.');
					for(var i = 0; i < req.param('purchasedetails').length; i++){
						var purchaseDetail = {
								po_id			: req.param('poid'),
								manufg_id		: req.param('purchasedetails')[i].manufgid,
								prod_id			: req.param('purchasedetails')[i].prodid,
								po_qty			: req.param('purchasedetails')[i].poqty,
								bal_qty			: req.param('purchasedetails')[i].balqty,
								uom_id			: req.param('purchasedetails')[i].uomid,
								rate			: req.param('purchasedetails')[i].rate,
								basic_value		: req.param('purchasedetails')[i].basicvalue,
								discount_prcnt	: req.param('purchasedetails')[i].discountprcnt,
								tax_id			: req.param('purchasedetails')[i].taxid,
								tax_prnct		: req.param('purchasedetails')[i].taxprnct,
								tax_value		: req.param('purchasedetails')[i].taxvalue,
								purchase_value	: req.param('purchasedetails')[i].purchasevalue,
								discount_value	: req.param('purchasedetails')[i].discountvalue
						}
						poDetail.upsert(purchaseDetail)
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
					
					log.info('Purchase order editted successfully.');
					response.message = 'Purchase order editted successfully.';
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
				log.info('Yes')
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
exports.getPo = function(req, res){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	var condition 	= "";
	var poId 		= req.param('poid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(poId!=null)
		if(condition === "")
			condition = "po_id='"+poId+"'";
	
		else
			condition = condition+" and po_id='"+poId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	poHeader.findAll({
		where	: [condition],
		include	: {model : poDetail}
	})
		.then(function(poDtls){
			if(poDtls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+poDtls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+poDtls.length+' results.';
				response.data 		= poDtls;
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
exports.cahngePoStatus = function(req, res){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poHeader.findOne({where : {po_id : req.param('poid')}})
	.then(function(poHeaderDet){
		poHeaderDet.status = req.param('status');
		poHeaderDet.save();
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