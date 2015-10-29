/**
 * @Filename 		: RptSalesService.js
 * @Description 	: To write Business Logic for Sales Reports. 
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

//For Sales Report
exports.getSalesRptDetails = function(req, res) {

	if(req.param("saleid")!=null){
	sequelize.query("select sh.bill_no,sh.bill_date ,st.store_code,st.store_name,sh.sale_type,cust.cust_code," +
			"cust.cus_first_name,cust.cus_last_name,sh.basic_total,sh.total_tax,sh.discount_prcnt, " +
			"sh.discount_value,sh.bill_value,sh.total_qty,sh.action_remarks,sd.sold_qty, " +
			"prod.prod_code,prod.prod_name,uom.uom_name,sd.rate,sd.basic_value,sd.discount_prcnt, " +
			"sd.discount_value,sd.tax_prnct,sd.tax_value " +
			"from t_sales_hdr sh,t_sale_dtl sd,m_store st,m_customer cust,m_product prod,m_uom uom " +
			"where sh.sale_id 		= sd.sale_id " +
			"and st.store_id 		= sh.store_id " +
			"and sh.customer_id 	= cust.cust_id " +
			"and prod.prod_id 		= sd.product_id " +
			"and sd.uom_id 			= uom.uom_id " +
			"and sh.sale_id 		= "+req.param("saleid"), { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getSalesRptDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("saleid");
			res.send(response);
		} else{
			log.info(filename+'>> getSalesRptDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getSalesRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getSalesRptDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("saleid");
			res.send(response);
	}
};

//For Sales Summary Report based on duration, store, customer, customer age group, customer group
exports.getSalesSummeryDetails = function(req, res) {
	
	var storeid 		= null;
	var customerid 		= null;
	var custgroupid 	= null;
	var agegroupid		= null;
	
	if(req.param("storeid")!=null){
		storeid			= req.param("storeid");
	}
	if(req.param("customerid")!=null){
		customerid		= req.param("customerid");
	}
	if(req.param("custgroupid")!=null){
		custgroupid		= req.param("custgroupid");
	}
	if(req.param("agegroupid")!=null){
		agegroupid		= req.param("agegroupid");
	}
	
	if(req.param("companyid")!=null){
		
		var query  = "select sh.sale_id,sh.bill_no,sh.bill_date,sh.basic_total,sh.total_tax,sh.discount_value," +
		"sh.bill_value,s.store_code,s.store_name,c.cust_code,c.cus_first_name,c.cus_last_name " +
		"from t_sales_hdr sh,m_store s,m_customer c  where " +
		"sh.store_id 		= s.store_id " +
		"and sh.customer_id = c.cust_id "+
		"and sh.store_id 	like COALESCE("+storeid+",'%') " +
		"and sh.customer_id like COALESCE("+customerid+",'%') " +
		"and c.cust_group_id like COALESCE("+custgroupid+",'%') " +
		"and c.age_group_id like COALESCE("+agegroupid+",'%') " +
		"and sh.company_id 	like COALESCE("+req.param("companyid")+",'%') ";
		
		if(req.param("startdate")!=null&&req.param("enddate")!=null){
		query += "and sh.bill_date 	between '"+req.param("startdate")+"' and '"+req.param("enddate")+"' " ;
		}
		
	sequelize.query(query, { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getSalesSummeryDetails >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("companyid");
			res.send(response);
		} else{
			log.info(filename+'>> getSalesSummeryDetails >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getSalesSummeryDetails >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getSalesSummeryDetails >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("companyid");
			res.send(response);
	}
};
