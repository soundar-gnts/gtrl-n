/**
 * @Filename 		: RptInventoryService.js
 * @Description 	: To write Business Logic for Inventory  Reports. 
 * @Author 			: Soundar C
 * @Date 			: October 19, 2015
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

//For get Stock summery report based on user param
exports.getStockSummeryRptDetails = function(req, res) {

	var storeid 	= null;
	var productid	= null;
	if(req.param("storeid") !=null){
		storeid 	= req.param("storeid");
	}
	if(req.param("productid") !=null){
		productid 	= req.param("productid");
	}
	
	if(req.param("companyid")!=null){
	sequelize.query("select  prod.prod_code,prod.prod_name,st.store_code,st.store_name,ss.batch_no,ss.curr_stock " +
			"from t_stock_summary ss,m_product prod,m_store st " +
			"where prod.prod_id 	= ss.product_id " +
			"and st.store_id 		= ss.store_id " +
			"and ss.company_id 		like COALESCE("+req.param("companyid")+",'%') " +
			"and ss.store_id 		like COALESCE("+storeid+",'%') " +
			"and ss.product_id 		like COALESCE("+productid+",'%')", { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getStockSummeryRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("companyid");
			res.send(response);
		} else{
			log.info(filename+'>> getStockSummeryRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getStockSummeryRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getStockSummeryRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("companyid");
			res.send(response);
	}
};


//For get Stock Ledger report based on user param
exports.getStockLedgerRptDetails = function(req, res) {

	var storeid 	= null;
	var productid	= null;
	if(req.param("storeid") !=null){
		storeid 	= req.param("storeid");
	}
	if(req.param("productid") !=null){
		productid 	= req.param("productid");
	}
	
	if(req.param("companyid")!=null){
	sequelize.query("select leg.ledger_date,prod.prod_code,prod.prod_name,st.store_code,st.store_name, " +
			"leg.batch_no,leg.open_qty,leg.in_qty,leg.out_qty,leg.close_qty,uom.uom_name, " +
			"leg.ref_no,leg.ref_date,leg.ref_remarks " +
			"from t_stock_ledger leg,m_product prod,m_store st,m_uom uom " +
			"where prod.prod_id 	= leg.product_id " +
			"and st.store_id 		= leg.store_id " +
			"and uom.uom_id 		= leg.uom_id " +
			"and leg.company_id 	like COALESCE("+req.param("companyid")+",'%') " +
			"and leg.store_id 		like COALESCE("+storeid+",'%') " +
			"and leg.product_id 	like COALESCE("+productid+",'%') " +
			"order by leg.stock_ledid desc", { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getStockLedgerRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("companyid");
			res.send(response);
		} else{
			log.info(filename+'>> getStockLedgerRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getStockLedgerRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getStockLedgerRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("companyid");
			res.send(response);
	}
};
