/**
 * File Name	:	PoDetails.js
 * Description	:	To write Business Logic For Purchase Order details.
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

var log = require('../config/logger').logger;
var appMsg			= require('../config/Message.js');
var poDetail = require('../models/PoDetail.js');
var poHeader= require('../models/PoHeader.js');

var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update Product details
exports.saveOrUpdatePoDetails = function(req, res){
	poDetail.upsert({
		po_dtlid		: req.param('podtlid'),
		po_id			: req.param('poid'),
		manufg_id		: req.param('manufgid'),
		prod_id			: req.param('prodid'),
		po_qty			: req.param('poqty'),
		bal_qty			: req.param('balqty'),
		uom_id			: req.param('uomid'),
		rate			: req.param('rate'),
		basic_value		: req.param('basicvalue'),
		discount_prcnt	: req.param('discountprcnt'),
		tax_id			: req.param('taxid'),
		tax_prnct		: req.param('taxprnct'),
		tax_value		: req.param('taxvalue'),
		purchase_value	: req.param('purchasevalue'),
		discount_value	: req.param('discountvalue')
	}).then(function(data){
		if(data){
			log.info('Purchase order details saved successfully.');
			response.message = 'Purchase order details saved successfully.';
			response.status  = true;
			res.send(response);
		} else{
			log.info('Purchase order details editted successfully.');
			response.message = 'Purchase order details editted successfully.';
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
}


//get all Product details
exports.getPoDetails = function(req, res){

	var condition 	= "";
	var poDetailsId = req.param('podtlid');
	var poId 	= req.param('poid');
	var status		= req.param('status');
	
	if(poId != null)
		condition = "po_id="+poId;
	
	if(poDetailsId!=null)
		if(condition === "")
			condition = "po_dtlid='"+poDetailsId+"'";
	
		else
			condition = condition+" and po_dtlid='"+poDetailsId+"'";
	
	if(status!=null)
		if(condition === "")
			condition = "status='"+status+"'";
	
		else
			condition = condition+" and status='"+status+"'";
	
	poDetail.findAll({
		where 	: [condition]
		
	})
		.then(function(poDetls){
			if(poDetls.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+poDetls.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+poDetls.length+' results.';
				response.data 		= poDetls;
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

//get all Product details
exports.deletePoDetails = function(req, res){
	poDetail.destroy({where : {po_dtlid		: req.param('podtlid')}})
	.then(function(data){
		if(data == '1'){
			log.info('Product removed.');
			response.status  	= true;
			response.message 	= 'Product removed.';
		} else{
			log.info('No Product found.');
			response.status  	= true;
			response.message 	= 'No Product found.';
		}
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