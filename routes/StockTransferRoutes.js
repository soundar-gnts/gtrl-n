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
	app.post('/getstocktransferhdr', stockTransferService.getStocktransferHdr);
	app.post('/getstocktransferdtl', stockTransferService.getStocktransferDtl);	
	app.post('/savetransferdetails', saveTransferDetails);
	
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
			total_value 				: req.param("totalvalue"),
			action_remarks 				: req.param("actionremarks"),
			actioned_by 				: req.param("actionedby"),
			actioned_dt 				: req.param("actioneddt"),
			transfered_by 				: req.param("transferedby")
			};
	var transferDetails 	= [];
	var detailsLength 		= 0;
	
	for(var i = 0; i < req.param('stocktranslist').length; i++){
		var transferdtl = {	transfer_dtlid 			: req.param('stocktranslist')[i].transferdtlid,
							transfer_id 			: req.param("transferid"),
							product_id 				: req.param('stocktranslist')[i].productid,
							transfer_qty            : req.param('stocktranslist')[i].transferqty,
							uom_id					: req.param('stocktranslist')[i].uomid,
							batch_no				: req.param('stocktranslist')[i].batchno,
							received_qty 			: req.param('stocktranslist')[i].receivedqty,
							rate 					: req.param('stocktranslist')[i].rate,				
							basic_value				: req.param('stocktranslist')[i].basicvalue,
							discount_prcnt			: req.param('stocktranslist')[i].discountprcnt,
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
		slnogenService.getSlnoValu(slNoCondition, function(sl){
			
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