/**
 * @Filename 		: RptStockTransfersService.js
 * @Description 	: To write Business Logic for Stock Transfers Reports. 
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
var log 				= require('../config/logger').logger;
var appmsg				= require('../config/Message.js');
var path				= require('path');
var filename			= path.basename(__filename);
var response  			= { status	: Boolean,
							message : String,
							data	: String
							};
var sequelize			 = require('../config/sequelize.js');


exports.getStockTransferRptDetails = function(req, res) {

	if(req.param("transferid")!=null){
	sequelize.query("SELECT sth.transfer_refno,sth.transfer_date,sth.transfer_ctgry,sth.transfer_remarks," +
			"sth.basic_total,sth.total_tax,sth.total_value,prod.prod_code,prod.prod_name," +
			"std.transfer_qty,std.received_qty,uom.uom_name,std.remarks,std.batch_no,std.rate," +
			"std.basic_value,std.discount_prcnt,std.tax_value,fs.store_name fromstore,ts.store_name " +
			"FROM t_stock_transfer_hdr sth,t_stock_transfer_dtl std,m_product prod,m_uom uom,m_store fs,m_store ts " +
			"where sth.transfer_id 	= std.transfer_id " +
			"and prod.prod_id 		= std.product_id " +
			"and uom.uom_id 		= std.uom_id " +
			"and fs.store_id 		= sth.from_Store_id " +
			"and ts.store_id 		= sth.to_store_id " +
			"and sth.transfer_id 	="+req.param("transferid"), { type: sequelize.QueryTypes.SELECT})

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
	}else{
			log.info(filename+'>> getStockTransferRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("transferid");
			res.send(response);
	}
};