/**
 * @Filename 		: RptStockTransfersService.js
 * @Description 	: To write Business Logic for StockTransfers Reports. 
 * @Author 			: Soundar C
 * @Date 			: October 18, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var stocktranshdr  		= require('../models/StockTransferHdr.js');
var stocktransdtl  		= require('../models/StockTransferDtl.js');
var log 				= require('../config/logger').logger;
var appmsg				= require('../config/Message.js');
var path				= require('path');
var filename			= path.basename(__filename);
var response  			= { status	: Boolean,
							message : String,
							data	: String
							};

exports.getStockTransferRptDetails = function(req, res) {
	var condition	= "";
	
	stocktranshdr.findAll({where : [condition],order: [['actioned_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getStockTransferRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>>getStockTransferRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getStockTransferRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
};