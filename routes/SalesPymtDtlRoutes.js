/**
 * @Filename	:	SalesPymtDtlRoutes.js
 * @Description	:	To write Routing middlewares for Sales Payment Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 26, 2015
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
var salesPymtDtlService = require('../services/SalesPymtDtlService.js');
module.exports = function(app, server) {
	app.post('/getsalespymtdetails', 	getSalesPymtDetails);
	app.post('/savesalespymtdetails', 	saveSalesPymtDetails);
	app.post('/deletesalespymtdetails', deleteSalesPymtDetails);
	
	function getSalesPymtDetails(req, res){
	
		var condition 			= "";
		var salepymtid			= req.param("salepymtid");
		var saleid				= req.param("saleid");
		var billtype			= req.param("billtype");
		var cardtypeid			= req.param("cardtypeid");
		var voucherid			= req.param("voucherid");
		if(salepymtid!=null){
			condition ="sale_pymtid="+salepymtid;
		}
		if(saleid!=null){
			if(condition === ""){
				condition="sale_id='"+saleid+"'";
			}else {
				condition=condition+" and sale_id='"+saleid+"'";
			}
		}
		if(billtype!=null){
			if(condition === ""){
				condition="bill_type='"+billtype+"'";
			}else {
				condition=condition+" and bill_type='"+billtype+"'";
			}
		}
		if(cardtypeid!=null){
			if(condition === ""){
				condition="card_type_id='"+cardtypeid+"'";
			}else {
				condition=condition+" and card_type_id='"+cardtypeid+"'";
			}
		}
		
		if(voucherid!=null){
			if(condition === ""){
				condition="voucher_id='"+voucherid+"'";
			}else {
				condition=condition+" and voucher_id='"+voucherid+"'";
			}
		}
		
		salesPymtDtlService.getSalesPymtDetails(condition, function(response){
			res.send(response);
		});
	}
	
	function saveSalesPymtDetails(req, res){
		
		var salesPymntDetails = {
				sale_pymtid				: req.param("salepymtid"),
				sale_id 				: req.param("saleid"),
				bill_type 				: req.param("billtype"),
				payment_mode 			: req.param("paymentmode"),
				card_type_id 			: req.param("cardtypeid"),
				card_no 				: req.param("cardno"),
				approval_no 			: req.param("approvalno"),
				voucher_id 				: req.param("voucherid"),
				paid_amount 			: req.param("paidamount")
				
			}
		salesPymtDtlService.saveSalesPymtDetails(salesPymntDetails, function(response){
			res.send(response);
		});
	}
	
	function deleteSalesPymtDetails(req, res){
		
		var condition = "sale_pymtid='"+req.param("salepymtid")+"'";
		salesPymtDtlService.deleteSalesPymtDetails(condition, function(response){
			res.send(response);
		});
	}
}

