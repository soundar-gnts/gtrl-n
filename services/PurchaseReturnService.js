/**
 * File Name	:	PurchaseReturnService.js
 * Description	:	To write Business Logic For User.
 * Author		:	Saranya G
 * Date			:	October 09, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 
 */

var purchaseReturnHdr 	= require('../models/PurchaseReturnHdr.js');
var purchaseReturnDtl = require('../models/PurchaseReturnDtl.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
//SaveOrUpdate Voucher and VoucherType Details

	exports.savePurchaseReturnDetails = function(req, res){
		
		purchaseReturnHdr.upsert(
			{
				return_id			: req.param('returnid'),
				company_id			: req.param('companyid'),
				po_id 				: req.param('poid'),
				retrun_ref_no 		: req.param('retrunrefno'),
				return_date 		: req.param('returndate'),
				store_id 			: req.param('storeid'),
				supplier_id 		: req.param('supplierid'),
				amount_payble 		: req.param('amountpayble'),
				outstanding_amount 	: req.param('outstandingamount'),
				return_type 		: req.param('returntype'),
				payment_mode 		: req.param('paymentmode'),
				discount_prcnt 		: req.param('discountprcnt'),
				discount_value 		: req.param('discountvalue'),
				return_reason 		: req.param('returnreason'),
				cancel_remark 		: req.param('cancelremark'),
				status		   		: req.param('status'),
				last_updated_dt		: req.param('lastupdateddt'),
				last_updated_by		: req.param('lastupdatedby'),
			
	   
			})			
			.then(function(pr){
		
					for(var i=0;i<req.param('returnlist').length;i++){
						
						purchaseReturnDtl.upsert({
							return_dtlid		: req.param('returnlist')[i].returndtlid,
							return_id			: req.param('returnlist')[i].returnid,
							company_id 			: req.param('returnlist')[i].companyid,
							product_id 			: req.param('returnlist')[i].productid,
							return_qty 			: req.param('returnlist')[i].returnqty,
							uom_id 				: req.param('returnlist')[i].uomid,
							rate 				: req.param('returnlist')[i].rate,
							basic_value 		: req.param('returnlist')[i].basicvalue,	
							discount_prcnt 		: req.param('returnlist')[i].discountprcnt,
							discount_value 		: req.param('returnlist')[i].discountvalue,
							tax_id 				: req.param('returnlist')[i].taxid,
							tax_prnct 			: req.param('returnlist')[i].taxprnct,
							tax_value 			: req.param('returnlist')[i].taxvalue,
													
					        
							})
				
					}
				})
		
			.error(function(err){
				res.send(err);
			});
		
			if(req.param('returnid') == null)
			{
			res.send("Inserted Successfully ");
			}
			else
			{
			res.send("Updated Successfully");
			}
	} 

	//SavePurchaseReturn Status

	exports.updatePurchaseReturnStats = function(req, res) {
	
		var status 	= req.param("status");		
		if(status==="Approved"){
			purchaseReturnHdr.upsert(
					{
						return_id			: req.param('returnid'),
						status		   		: req.param('status')
					})
			.then(function(pr){
				
			})
			
			}
		
		
	}
