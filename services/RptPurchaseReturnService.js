/**
 * @Filename 		: RptPurchaseReturnService
 * @Description 	: To write Business Logic for Purchase Return Reports. 
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

//For Individual Purchase Return 
exports.getPurchaseRerurnRptDetails = function(req, res) {
	
	if(req.param("returnid")!=null){
	sequelize.query("select prh.retrun_ref_no,prh.return_date,prh.amount_payble,prh.outstanding_amount,prh.return_type," +
			"prh.return_reason,prh.batch_no,st.store_code,st.store_name,sup.supplier_code,sup.supplier_name," +
			"prod.prod_code,prod.prod_name,prd.return_qty,uom.uom_name,prd.rate,prd.basic_value " +
			"from t_purchase_return_hdr prh,t_purchase_return_dtl prd,m_store st,m_supplier sup,m_product prod, m_uom uom " +
			"where prh.return_id 	= prd.return_id " +
			"and prh.store_id 		= st.store_id " +
			"and prh.supplier_id 	= sup.supplier_id " +
			"and prd.product_id 	= prod.prod_id " +
			"and prd.uom_id 		= uom.uom_id " +
			"and prh.return_id 		= "+req.param("returnid"), { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getPurchaseRerurnRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			log.info(filename+'>> getPurchaseRerurnRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getPurchaseRerurnRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getPurchaseRerurnRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("returnid");
			res.send(response);
	}
};

//For Purchase Return Summary Report based on duration, store,supplier,status,return no,batch no
exports.getPurchaseReturnSummaryDetails = function(req, res) {
	
	var storeid 		= null;
	var supplierid 		= null;
	var returntype		= "%";
	var batchno			= "%";
	var status			= "%";
	
	if(req.param("storeid")!=null){
		storeid		= req.param("storeid");
	}
	if(req.param("supplierid")!=null){
		supplierid	= req.param("supplierid");
	}
	if(req.param("returntype")!=null){
		returntype	= req.param("returntype");
	}
	if(req.param("batchno")!=null){
		batchno		= req.param("batchno");
	}
	if(req.param("status")!=null){
		status		= req.param("status");
	}
	
	if(req.param("companyid")!=null){
		
		var query  = "select ph.return_id,ph.retrun_ref_no,ph.return_date,st.store_code,st.store_name, " +
				"sup.supplier_code,sup.supplier_name,ph.amount_payble,ph.outstanding_amount, " +
				"ph.return_type,ph.payment_mode,ph.discount_value,ph.return_reason,ph.batch_no, ph.status " +
				"from t_purchase_return_hdr ph,m_store st,m_supplier sup  " +
				"where st.store_id 		= ph.store_id  " +
				"and sup.supplier_id 	= ph.supplier_id  " +
				"and ph.company_id 		like COALESCE("+req.param("companyid")+",'%') " +
				"and ph.store_id 		like COALESCE("+storeid+",'%') " +
				"and ph.supplier_id 	like COALESCE("+supplierid+",'%') " +
				"and ph.return_type		like COALESCE('"+returntype+"','%') " +
				"and ph.batch_no		like COALESCE('"+batchno+"','%') " +
				"and ph.status 			like COALESCE('"+status+"','%') ";
		
				if(req.param("startdate")!=null&&req.param("enddate")!=null){
				query += "and ph.return_date 	between '"+req.param("startdate")+"' and '"+req.param("enddate")+"' " ;
				}
		
	sequelize.query(query, { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getPurchaseReturnSummaryDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("companyid");
			res.send(response);
		} else{
			log.info(filename+'>> getPurchaseReturnSummaryDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getPurchaseReturnSummaryDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getPurchaseReturnSummaryDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("companyid");
			res.send(response);
	}
};
