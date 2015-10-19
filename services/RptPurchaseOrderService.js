/**
 * @Filename 		: RptPurchaseOrderService.js
 * @Description 	: To write Business Logic for Purchase Order Reports. 
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


exports.getPurchaseOrderRptDetails = function(req, res) {

	if(req.param("poid")!=null){
	sequelize.query("select poh.po_no,poh.po_date, st.store_name,sup.supplier_name,poh.invoice_addr,poh.shipping_addr, " +
			"poh.po_remark,poh.basic_total,poh.total_value,poh.total_tax,poh.total_discount," +
			"prod.prod_code,prod.prod_name,pod.po_qty,uom.uom_name,pod.rate,pod.basic_value,pod.discount_prcnt," +
			"pod.discount_value,pod.tax_prnct,pod.tax_value " +
			"from t_po_hdr poh, t_po_dtl pod,m_store st,m_supplier sup,m_product prod,m_uom uom " +
			"where poh.po_id 		= pod.po_id " +
			"and st.store_id 		= poh.store_id " +
			"and sup.supplier_id 	= poh.supplier_id " +
			"and uom.uom_id 		= pod.uom_id " +
			"and prod.prod_id 		= pod.prod_id " +
			"and poh.po_id 			="+req.param("poid"), { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getPurchaseOrderRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>> getPurchaseOrderRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getPurchaseOrderRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getPurchaseOrderRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("poid");
			res.send(response);
	}
};