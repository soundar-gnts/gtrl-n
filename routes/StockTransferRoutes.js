/**
 * @Filename 		: StockTranferRoutes 
 * @Description 	: To write Business Logic for BankRoutes. 
 * @Author 			: Arun Jeyaraj R
 * @Date 			: October 05, 2015
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

var stockTransferService 	= require('../services/StockTransferService.js');
var config 					= require('../config/config.js');
var CONSTANT				= require('../config/Constants.js');
var slnogenService 			= require('../services/SlnoGenService.js');
var messagesService 		= require('../services/MessagesService.js');

module.exports = function(app, server){
	app.post('/getstocktransferhdr', getStocktransferHdr);
	app.post('/getstocktransferdtl', getStocktransferDtl);	
	app.post('/savetransferdetails', saveTransferDetails);
	
//To get Stock TransferDtl List based on user param	
function getStocktransferDtl(req, res){
	var condition 		= "";
	var transferid		= req.param("transferid");
	var transferdtlid	= req.param("transferdtlid");
	var productid		= req.param("productid");
	var batchno			= req.param("batchno");	
	var status			= req.param("status");

	if(transferdtlid!=null){
		condition ="transfer_dtlid="+transferdtlid;
	}
	
	if(transferid!=null){
		if(condition === ""){
			condition="transfer_id='"+transferid+"'";
		}else {
			condition=condition+" and transfer_id='"+transferid+"'";
		}
	}
	
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	
	if(batchno!=null){
		if(condition === ""){
			condition="batch_no like '%"+batchno+"%'";
		}else {
			condition=condition+" and batch_no like '%"+batchno+"%'";
		}
	}

	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	stockTransferService.getStocktransferDtl(condition, function(response){
		res.send(response);
	});
	
}
	
// To get Stock TransferHdr List based on user param
function getStocktransferHdr(req, res){
	var condition 		= "";
	var transferid		= req.param("transferid");
	var transferrefno	= req.param("transferrefno");
	var companyid		= req.param("companyid");
	var fromStoreid		= req.param("fromstoreid");
	var tostoreid		= req.param("tostoreid");
	var transferctgry	= req.param("transferctgry");
	var transferStatus	= req.param("transferstatus");
	
	if(transferid!=null){
		condition ="transfer_id="+transferid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(fromStoreid!=null){
		if(condition === ""){
			condition="from_Store_id='"+fromStoreid+"'";
		}else {
			condition=condition+" and from_Store_id='"+fromStoreid+"'";
		}
	}
	if(tostoreid!=null){
		if(condition === ""){
			condition="to_store_id='"+tostoreid+"'";
		}else {
			condition=condition+" and to_store_id='"+tostoreid+"'";
		}
	}
	if(transferrefno!=null){
		if(condition === ""){
			condition="transfer_refno like '%"+transferrefno+"%'";
		}else {
			condition=condition+" and transfer_refno like '%"+transferrefno+"%'";
		}
	}
	if(transferctgry!=null){
		if(condition === ""){
			condition="transfer_ctgry like '%"+transferctgry+"%'";
		}else {
			condition=condition+" and transfer_ctgry like '%"+transferctgry+"%'";
		}
	}
	
	if(transferStatus!=null){
		if(condition === ""){
			condition="transfer_Status='"+transferStatus+"'";
		}else {
			condition=condition+" and transfer_Status='"+transferStatus+"'";
		}
	}
	
	stockTransferService.getStocktransferHdr(condition, function(response){
		res.send(response);
	});
}
	
	
	
//For Save / Update Stock Transfer Details
function saveTransferDetails(req, res){
	
	var trnsferhdr  =	{
 			transfer_id					: req.param("transferid"),
			company_id 					: req.param("companyid"),
			transfer_refno 				: req.param("transferrefno"),
			transfer_date				: req.param("transferdate"),
			from_Store_id 				: req.param("fromStoreid"),
			to_store_id 				: req.param("tostoreid"),
			transfer_ctgry 				: req.param("transferctgry"),
			transfer_remarks 			: req.param("transferremarks"),	
			transfer_Status 			: req.param("transferStatus"),
			basic_total 				: req.param("basictotal"),
			total_tax 					: req.param("totaltax"),
			total_discount				: req.param("totaldiscount"),
			total_value 				: req.param("totalvalue"),
			action_remarks 				: req.param("actionremarks"),
			actioned_by 				: req.param("actionedby"),
			actioned_dt 				: req.param("actioneddt"),
			transfered_by 				: req.param("transferedby")
			};
	var transferDetails 	= [];
	var detailsLength 		= 0;
	
	for(var i = 0; i < req.param('stocktranslist').length; i++){
		var transferdtl = {
							transfer_dtlid 			: req.param('stocktranslist')[i].transferdtlid,
							transfer_id 			: req.param("transferid"),
							product_id 				: req.param('stocktranslist')[i].productid,
							transfer_qty            : req.param('stocktranslist')[i].transferqty,
							uom_id					: req.param('stocktranslist')[i].uomid,
							batch_no				: req.param('stocktranslist')[i].batchno,
							received_qty 			: req.param('stocktranslist')[i].receivedqty,
							rate 					: req.param('stocktranslist')[i].rate,				
							basic_value				: req.param('stocktranslist')[i].basicvalue,
							discount_prcnt			: req.param('stocktranslist')[i].discountprcnt,
							discount_value			: req.param('stocktranslist')[i].discountvalue,
							tax_id					: req.param('stocktranslist')[i].taxid,
							tax_prnct				: req.param('stocktranslist')[i].taxprnct,
							tax_value				: req.param('stocktranslist')[i].taxvalue,
							remarks					: req.param('stocktranslist')[i].remarks,
							status					: req.param('stocktranslist')[i].status,
		 				}
		 	transferDetails.push(transferdtl);
		 }
	
	/*  */
	if(req.param("autogenyn").toLowerCase() == 'y' && req.param('transferStatus') == CONSTANT.STATUSPENDING && req.param('transferrefno') == null){
		var slNoCondition = {
				company_id 			: req.param("companyid"),
				ref_key 			: CONSTANT.TRANSFER_SERIAL_NO,
				autogen_yn 			: 'Y',
				status 				: 'Active'
		}
		slnogenService.getSlnoValue(slNoCondition, function(sl){
			
			trnsferhdr.transfer_refno = sl.sno;
			stockTransferService.saveTransferDetails(sl.slid, trnsferhdr, transferDetails, function(response){
				
				//TO DO : Move inside the Service.
				//For Sent a Message
				if(req.param("transferStatus")!=null&&req.param("transferStatus")!='Draft'){
					var messageobj={	
							company_id 				: req.param("companyid"),
							msg_type 				: 'N',
							msg_sender 				: config.STOCK_TRANS_EMAIL,
							msg_receivers 			: config.STOCK_TRANS_EMAIL,
							msg_subject 			: 'Reg - Stock Transfer - '+req.param("transferStatus"),
							msg_body 				: 'Stock Transfer Ref No : '+req.param("transferrefno")+'</br> Status :'+req.param("transferStatus"),
							client_ip 				: req.connection.remoteAddress,
							user_id 				: req.param("userid"),
							msg_status 				: 'Pending',
							msg_sent_dt 			: new Date()
						};
					messagesService.saveMessages(messageobj, function(result){
					});
				}
				res.send(response);
			});
				
		});
	} else{
		console.log("transferDetails.length-->"+transferDetails.length);
		stockTransferService.saveTransferDetails(null, trnsferhdr, transferDetails, function(response){
			res.send(response);
		});
	}
	
	/*  */

	}
}