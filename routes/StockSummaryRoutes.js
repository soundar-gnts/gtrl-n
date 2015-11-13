/**
 * @Filename	:	StockSummaryRoutes.js
 * @Description	:	To write Routing middlewares for Stock Summary related Table.
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
var stockSummaryService = require('../services/StockSummaryService.js');
module.exports = function(app, server) {
	
	app.post('/getstocksummarydetails', getStockSummaryDetails);
	app.post('/savestocksummary', saveStockSummary);
	
	//For get the stock summery based on user param
	function getStockSummaryDetails(req, res){
		var condition 		= "";
		var stockid			=req.param("stockid");
		var companyid		=req.param("companyid");
		var productid		=req.param("productid");
		var storeid			=req.param("storeid");
		var batchno			=req.param("batchno");
		if(stockid!=null){
			condition ="stock_id="+stockid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
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
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		
		if(batchno!=null){
			if(condition === ""){
				condition="batch_no='"+batchno+"'";
			}else {
				condition=condition+" and batch_no='"+batchno+"'";
			}
		}
		stockSummaryService.getStockSummaryDetails(condition,function(result){
			res.send(result);
		});
	}
	
	// To Save/Update Stock Summary Details
	function saveStockSummary(req, res){
		var summaryobj = {
				stock_id					: req.param("stockid"),
				product_id 					: req.param("productid"),
				company_id 					: req.param("companyid"),
				store_id 					: req.param("storeid"),
				batch_no 					: req.param("batchno"),
				curr_stock 					: req.param("currstock"),
				last_sold_dt 				: req.param("lastsolddt"),
				last_sold_qty 				: req.param("lastsoldqty")
				
			};
		stockSummaryService.saveStockSummary(summaryobj,function(result){
			res.send(result);
		});
	}
	
}

