/**
 * @Filename	:	StockAdjustmentsRoutes.js
 * @Description	:	To write Routing middlewares for t_stock_adjustments Table.
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
var stockAdjustmentsService = require('../services/StockAdjustmentsService.js');
module.exports = function(app, server) {
	app.post('/getstockadjustmentsdetails', getStockAdjustmentsDetails);
	app.post('/savestockadjustments', saveStockAdjustments);
	
	//For save / update stock adjustments
	function saveStockAdjustments(req, res){
		var adjustobj = {
				adjust_id					: req.param("adjustid"),
				product_id 					: req.param("productid"),
				company_id 					: req.param("companyid"),
				store_id 					: req.param("storeid"),
				adjust_date 				: req.param("adjustdate"),
				adjust_qty 					: req.param("adjustqty"),
				batch_no					: req.param("batchno"),
				uom_id						: req.param("uomid"),
				status						: req.param("status"),
				adjust_symbol 				: req.param("adjustsymbol"),
				adjust_reason 				: req.param("adjustreason"),
				actioned_by 				: req.param("actionedby"),
				actioned_dt 				: req.param("actioneddt")
				
			};
		stockAdjustmentsService.saveStockAdjustments(adjustobj, function(response){
			res.send(response);
		});
	}
	
	
	//For get stock adjustments details
	function getStockAdjustmentsDetails(req, res){
		var condition 			= "";
		var attr 				= "";
		var adjustid			=req.param("adjustid");
		var companyid			=req.param("companyid");
		var productid			=req.param("productid");
		var storeid				=req.param("storeid");
		var adjustsymbol		=req.param("adjustsymbol");
		var status				=req.param("status");

		
		if(adjustid!=null){
			condition ="adjust_id="+adjustid;
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
		if(adjustsymbol!=null){
			if(condition === ""){
				condition="adjust_symbol='"+adjustsymbol+"'";
			}else {
				condition=condition+" and adjust_symbol='"+adjustsymbol+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['adjust_id','product_id','company_id','adjust_symbol'];
		}
		
		stockAdjustmentsService.getStockAdjustmentsDetails(condition,attr, function(response){
			res.send(response);
		});
	}
}

