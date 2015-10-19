/**
 * @Filename 		: RptPurchaseService.js
 * @Description 	: To write Business Logic for Purchase Reports. 
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


exports.getPurchaseRptDetails = function(req, res) {

	if(req.param("purchaseid")!=null){
	sequelize.query("select ph.invoice_no,ph.invoice_date,st.store_code,st.store_name,ph.batch_no,sup.supplier_code, " +
			"sup.supplier_name ,ph.payment_date,ph.invoice_amount,ph.outstanding_amount,ph.grn_type, " +
			"ph.payment_mode,ph.discount_prcnt,ph.discount_value,ph.action_remarks,ph.actioned_by, " +
			"prod.prod_code,prod.prod_name,pd.invoice_qty,pd.rate,uom.uom_name,tax.tax_name,pd.tax_prnct, " +
			"pd.tax_value,pd.discount_value " +
			"from t_purchase_hdr ph,t_purchase_dtl pd,m_store st,m_supplier sup,m_product prod, " +
			"m_uom uom,m_tax tax " +
			"where ph.purchase_id 		= pd.purchase_id " +
			"and ph.Store_id 			= st.store_id " +
			"and sup.supplier_id 		= ph.supplier_id " +
			"and prod.prod_id 			= pd.product_id " +
			"and uom.uom_id 			= pd.uom_id " +
			"and tax.tax_id 			= pd.tax_id " +
			"and ph.purchase_id 		="+req.param("purchaseid"), { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getPurchaseRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>> getPurchaseRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getPurchaseRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getPurchaseRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("purchaseid");
			res.send(response);
	}
};