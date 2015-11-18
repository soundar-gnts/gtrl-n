/**
 * @Filename	:	StockLedgerRoutes.js
 * @Description	:	To write Routing middlewares for Stock Ledger related Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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
var stockLedgerService 		= require('../services/StockLedgerService.js');
var product 				= require('../models/Product.js');
var store 		     		= require('../models/Store.js');

module.exports = function(app, server) {
	
	app.post('/getstockledgerdetails', getStockLedgerDetails);
	app.post('/savestockledger', saveStockLedger);
	
	//To get stock ledger list based on user param
	function getStockLedgerDetails(req, res){
		var condition 			= "";
		var stockledid			= req.param("stockledid");
		var companyid			= req.param("companyid");
		var productid			= req.param("productid");
		var storeid				= req.param("storeid");
		var batchno				= req.param("batchno");
		var islatest			= req.param("islatest");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : product, attributes : ['prod_code','prod_name']},
			                    {model : store, attributes : ['store_code','store_name']}]
		}
		
		if(stockledid!=null){
			condition ="stock_ledid="+stockledid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="t_stock_ledger.company_id='"+companyid+"'";
			}else {
				condition=condition+" and t_stock_ledger.company_id='"+companyid+"'";
			}
		}
		if(productid!=null){
			if(condition === ""){
				condition="product_id='"+productid+"'";
			}else {
				condition=condition+" and product_id='"+productid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="t_stock_ledger.store_id='"+storeid+"'";
			}else {
				condition=condition+" and t_stock_ledger.store_id='"+storeid+"'";
			}
		}
		
		if(batchno!=null){
			if(condition === ""){
				condition="batch_no='"+batchno+"'";
			}else {
				condition=condition+" and batch_no='"+batchno+"'";
			}
		}
		
		if(islatest!=null){
			if(condition === ""){
				condition="is_latest='"+islatest+"'";
			}else {
				condition=condition+" and is_latest='"+islatest+"'";
			}
		}
		stockLedgerService.getStockLedgerDetails(condition,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	//For save or update stock ledger
	function saveStockLedger(req, res){
		var ledgerobj = {
				stock_ledid					: req.param("stockledid"),
				ledger_date 				: req.param("ledgerdate"),
				product_id 					: req.param("productid"),
				company_id 					: req.param("companyid"),
				store_id 					: req.param("storeid"),
				batch_no 					: req.param("batchno"),
				open_qty 					: req.param("openqty"),
				in_qty 						: req.param("inqty"),
				out_qty 					: req.param("outqty"),
				close_qty 					: req.param("closeqty"),
				uom_id 						: req.param("uomid"),
				is_latest 					: req.param("islatest"),
				ref_no 						: req.param("refno"),
				ref_date 					: req.param("refdate"),
				ref_remarks 				: req.param("refremarks")
				
			};
		stockLedgerService.saveStockLedger(ledgerobj,function(result){
			res.send(result);
		});
	}
}

