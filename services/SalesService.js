/**
 * @Filename 		: SalesService.js
 * @Description 	: To write Business Logic for Product Sales. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 16, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 0.1				19-10-2015	Haris K.A.			
 * 
 */
var log					= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var path	 			= require('path');
var fileName			= path.basename(__filename);
var saleDtl 			= require('../models/SaleDtl.js');
var saleHdr 			= require('../models/SaleHeader.js');
var salesDeliveryDetail = require('../models/SalesDeliveryDetail.js');

var productSerialCodesService 	= require('../services/ProductSerialCodesService.js');
var salesPymtDtlService			= require('../services/SalesPymtDtlService.js');
var stockLedgerService 			= require('../services/StockLedgerService.js');
var messageService 				= require('../services/MessagesService.js');
var pushNotfctnService			= require('../services/PushNotificationService.js');
var accountReceivableService 	= require('../services/AccountReceivableService.js');
var accountService 				= require('../services/AccountsService.js');


// get sales header function.
var getSales = function(condition, fetchAssociation, selectedAttributes, callback){
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saleHdr.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(saleHdrs){
			if(saleHdrs.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info('About '+saleHdrs.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+saleHdrs.length+' results.';
				response.data 		= saleHdrs;
				callback(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

//get sales details function
var getSalesDetails = function(condition, selectedAttributes, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saleDtl.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
	.then(function(saleDtls){
		if(saleDtls.length == 0){
			log.info(appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+saleDtls.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+saleDtls.length+' results.';
			response.data 		= saleDtls;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
	
}

//save or update sales header
var saveOrUpdateSalesHeader = function(sales, callback){
	log.info(fileName+'.saveOrUpdateSalesHeader');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if sales header id exist then update, else create new entry
	if(sales.sale_id != null){
		saleHdr.upsert(sales)
		.then(function(data){
			log.info(APPMSG.SALESEDITSUCCESS);
			response.message 	= APPMSG.SALESEDITSUCCESS;
			response.data  		= sales.sale_id;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		saleHdr.create(sales)
		.then(function(data){
			log.info(APPMSG.SALESSAVESUCCESS);
			response.message	= APPMSG.SALESSAVESUCCESS;
			response.data  		= data.sale_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

//save or update sales details function
var saveOrUpdateSalesDetails = function(salesDetail, callback) {

	log.info(fileName+'.saveOrUpdateSalesDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if sales order detail id exist then update, else create new entry
	if(salesDetail.sale_dtlid != null){
		saleDtl.upsert(salesDetail)
		.then(function(data){
			log.info(APPMSG.SALESDETAILSEDITSUCCESS);
			response.message	= APPMSG.SALESDETAILSEDITSUCCESS;
			response.data  		= salesDetail.salesorder_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		saleDtl.create(salesDetail)
		.then(function(data){
			log.info(APPMSG.SALESDETAILSSAVESUCCESS);
			response.message	= APPMSG.SALESDETAILSSAVESUCCESS;
			response.data  		= data.salesorder_id;
			response.status 	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

//delete sale detail function
var deleteSaleDetails = function(condition, callback){
	log.info(fileName+'.deleteSaleDetailsFn');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	saleDtl.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Sale details removed.');
			response.status  	= true;
			callback(response);
		} else{
			log.info('No Sales details found.');
			response.status  	= true;
			callback(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

//Add and edit sale details
var saveOrUpdateSales = function(slid, sales, salesDetails, salesDeleteDetailsIds, callback){
	log.info(fileName+'.saveOrUpdateSalesFn');
	
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saveOrUpdateSalesHeader(sales, function(response){
		if(response.status){
			
			//if slid exist, serial number generated, so need to update slnoGen table 
			if(slid != null)
				slnogenService.updateSequenceNo(slid, sales.last_updated_dt, sales.last_updated_by);
			
			//check any selected product need to edit or is there any new product, if yes then edit/create
			if(salesDetails != null){
				log.info(salesDetails.length+' Sale detail is going to save/update');
				salesDetails.forEach(function(salesDetail){
					
					/*
					 * check whether status is Billed or Approved. \
					 * 		if yes
					 * 			1. update product serial code table, the corresponding entry as SOLD.
					 * 			2. Insert 1 entry to stock ledger table.
					 * 			3. Insert/Update Stock summary table.
					 */
					if(sales.status == CONSTANT.STATUSBILLED || sales.status == CONSTANT.STATUSAPPROVED){
						
						productSerialCodesService.updateProductSerialCodes(
								sales.company_id,
								sales.sale_id,
								salesDetail.product_id,
								sales.store_id,
								sales.batch_no,
								'Sold');
						
						//To update stock ledger and summary
	 					stockLedgerService.insertStockLedger(
	 							salesDetail.product_id,
	 							sales.company_id,
	 							sales.store_id,
	 							sales.batch_no,
	 							0,						//in_qty = 0
	 							salesDetail.total_qty,	//out_qty = total qty.
	 							salesDetail.uom_id,
	 							sales.bill_no,
	 							sales.bill_date,
	 							"Sales Goods - Bill Number : "+sales.bill_no+'-'+sales.action_remarks);
					}
						
					salesDetail.sale_id = response.data;
					saveOrUpdateSalesDetails(salesDetail, function(result){
						log.info(result);
					})
				});
			}
			
			//check any selected product is need to remove, if yes then remove
			if(salesDeleteDetailsIds != null){
				log.info(salesDetails.length+' Sale detail is going to save/update');
				salesDeleteDetailsIds.forEach(function(salesDeleteDetailsId){
					deleteSaleDetails("sale_dtlid='"+salesDeleteDetailsIds.sale_dtlid+"'", function(result){
						log.info(result);
					});
				});
			}
			
			//check whether status is Billed or Approved. if yes insert sales payment details.
			if(sales.status == CONSTANT.STATUSBILLED || sales.status == CONSTANT.STATUSAPPROVED){
				var salesPymntDetails = {
					sale_id 				: response.data,
//					bill_type 				: req.param("billtype"),
//					payment_mode 			: req.param("paymentmode"),
//					card_type_id 			: req.param("cardtypeid"),
//					card_no 				: req.param("cardno"),
//					approval_no 			: req.param("approvalno"),
//					voucher_id 				: req.param("voucherid"),
//					paid_amount 			: req.param("paidamount")
				}
				salesPymtDtlService.saveSalesPymtDetails(salesPymntDetails, function(result){
					log.info(result);
				});
			}
			
			/*
			 * check whether status is Deliverready/Delivered/Approved.
			 * 		if yes
			 * 			1. Insert Message table.
			 * 			2. Insert Push notification table.
			 */
			if(sales.status == CONSTANT.STATUSDELIVERYREADY || sales.status == CONSTANT.STATUSDELIVERED || sales.status == CONSTANT.STATUSAPPROVED){
				var msgObj = {
						company_id 			: sales.company_id,
						//msg_type			: dataTypes.STRING,
						//msg_sender			: dataTypes.STRING,
						//msg_receivers		: dataTypes.STRING,
						//msg_cc				: dataTypes.STRING,
						//msg_subject			: dataTypes.STRING,
						//msg_body			: dataTypes.STRING,
						//client_ip			: dataTypes.STRING,
						user_id			:	sales.customer_id,
						//msg_response		: dataTypes.STRING,
						//msg_status			: dataTypes.STRING,
						//msg_sent_dt			: dataTypes.DATE

				}
				messageService.saveMessages(msgObj, function(result){
					log.info(result);
				});
				
				var pushNotfictn = {
						company_id 				: sales.company_id,
//						phone_no 				: req.param("phoneno"),
//						message 				: req.param("message"),
//						ref_date 				: req.param("refdate"),
						user_id 				: sales.customer_id,
						last_updated_dt 		: sales.last_updated_dt,
						last_updated_by 		: sales.last_updated_by
				
					}
					pushNotfctnService.savePushNotification(pushNotfictn, function(result){
						log.info(result);
					});
				
			}
			
			/*
			 * check whether status is Deliverready.
			 * 		if yes
			 * 			1. Insert Sales delivery detail table.
			 */
			if(sales.status == CONSTANT.STATUSDELIVERYREADY){
//				saveOrUpdateSalesDeliveryDetailsFn(salesDelvryDetail, function(result){
//					log.info(result);
//				});
			}
					
			/*
			 * check whether sales type is wholesale/corporate/mobile and status is approved
			 * 		if yes
			 * 		1. create account table if not exist.
			 * 		2. insert/update account receivable table.
			 */
			if(sales.status == CONSTANT.STATUSAPPROVED && (sales.sale_type == CONSTANT.SALES_TYPE_WHOLESALE || sales.sale_type == CONSTANT.SALES_TYPE_CORPORATE || sales.sale_type == CONSTANT.SALES_TYPE_MOBILE)){
//				var accountReceivable = {
//						accrcble_id				: req.param("accrcbleid"),
//						company_id 				: req.param("companyid"),
//						store_id 				: req.param("storeid"),
//						entry_date 				: req.param("entrydate"),
//						account_id 				: req.param("accountid"),
//						invoice_no 				: req.param("invoiceno"),
//						invoice_date 			: req.param("invoicedate"),	
//						invoice_amount 			: req.param("invoiceamount"),
//						paid_amount 			: req.param("paidamount"),
//						balance_amount 			: req.param("balanceamount"),
//						remarks 				: req.param("remarks"),
//						prepared_by 			: req.param("preparedby"),
//						actioned_by 			: req.param("actionedby"),
//						status 					: req.param("status"),
//						last_updated_dt 		: req.param("lastupdateddt"),
//						last_updated_by 		: req.param("lastupdatedby")
//				}
//				var condition = "company_id='"+companyid+"' and client_id = '"+clientid+"'";
//				accountService.getAccountsDetails(condition, '', function(result){
//					if(result.status){
//						// check account table for an account of sales related customer.
//						if(result.data.length != 0){
//							log.info('Account Already Exist.');
//							accountReceivable.account_id = result.data[0].account_id;
//							accountReceivableService.saveOrUpdateAccountReceivable(accountReceivable, function(data){
//								if(data.status){
//									log.info(appmsg.ACCOUNTRECEIVABLESAVESUCCESS);
//								} else{
//									log.info(data.data);
//								}
//							});
//						} else{
//							log.info('A new Account need to create.')
//							var account = {
//									//account_id					: req.param("accountid"),
//									company_id 					: req.param("companyid"),
//									//store_id 					: req.param("storeid"),
//									account_group 				: req.param("accountgroup"),
//									account_name 				: req.param("accountname"),
//									account_dt 					: req.param("accountdt"),
//									finance_year 				: req.param("financeyear"),
//									generate_voucher_yn 		: req.param("generatevoucheryn"),
//									//employee_id 				: req.param("employeeid"),
//									bank_id 					: req.param("bankid"),
//									bank_branch_id 				: req.param("bankbranchid"),
//									//supplier_id 				: req.param("supplierid"),
//									client_id 					: req.param("clientid"),
//									acct_type_id 				: req.param("accttypeid"),
//									od_amoun 					: req.param("odamount"),
//									open_balance 				: req.param("openbalance"),
//									parked_amount 				: req.param("parkedamount"),
//									current_balance 			: req.param("currentbalance"),
//									aproveauth 					: req.param("aproveauth"),
//									parent_account_id 			: req.param("parentaccountid"),
//									selfapprv_yn 				: req.param("selfapprvyn"),
//									remarks 					: req.param("remarks"),
//									status 						: req.param("status"),
//									last_updated_dt 			: req.param("lastupdateddt"),
//									last_updated_by 			: req.param("lastupdatedby")
//							}
//							accountService.saveAccounts(account, function(data){
//								if(data.status){
//									log.info(appmsg.ACCOUNTSAVESUCCESS);
//									accountReceivable.account_id = data.data;
//									accountReceivableService.saveOrUpdateAccountReceivable(accountReceivable, function(data){
//										if(data.status){
//											log.info(appmsg.ACCOUNTRECEIVABLESAVESUCCESS);
//										} else{
//											log.info(data.data);
//										}
//									});
//								} else{
//									// account table data insert error
//								}
//							});
//						}
//					} else{
//						// account table data fetch error
//					}
//				});
			}
			/**TODO
			 * if sales status is approved/billed
			 * 		goto product serial code table then change status to sold - Completed.
			 * 		goto salespayment detail table then insert - Completed.
			 * 		stock ledger function - Completed.
			**/
			
			/**TODO
			 * if sales type is whole/corporate/mobile and status is approved/deliveryready/delivered
			 * 		pushnotification - Completed.
			 * 		message - Completed.
			**/
			
			/**TODO
			 * if sales status is deliveryready
			 * 		insert/update details into delivery detail table
			**/
			
			/**TODO
			 * if sales type is whole/corporate/mobile and status is approved
			 * 		check account table with customer id if not create
			 * 		use account id to account receivable table
			**/ 
			
			log.info(appMsg.SALESSAVESUCCESS);
			response.message	= appMsg.SALESSAVESUCCESS;
			response.data  		= data.sale_id;
			response.status 	= true;
			callback(response);
			
		} else{
			callback(response);
		}
	});
}

var changeSalesStatus = function(){
	/**TODO
	 * if sales type is whole/corporate/mobile and status is approved
	 * check account table with customer id if not create
	 * use account id to account receivable table
	**/ 
	
}


var getSaleDetail=function(productid,batchno,callback){
	console.log(productid);
	saleDtl.findOne({where:[{product_id:productid,batch_no:batchno}]})
	.then(function(result){
		callback(result);
	});
}




var saveOrUpdateSalesDeliveryDetailsFn = function(salesDelvryDetail, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesDelvryDetail.delivery_dtlid != null){
		salesDeliveryDetail.upsert(salesDelvryDetail)
		.then(function(data){
			log.info(appMsg.SALESDELIVERYDETAILSEDITSUCCESS);
			response.message 	= appMsg.SALESDELIVERYDETAILSEDITSUCCESS;
			response.data  		= salesDelvryDetail.delivery_dtlid;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		salesDeliveryDetail.create(salesDelvryDetail)
		.then(function(data){
			log.info(appMsg.SALESDELIVERYDETAILSSAVESUCCESS);
			response.message 	= appMsg.SALESDELIVERYDETAILSSAVESUCCESS;
			response.data  		= data.delivery_dtlid;
			response.status  	= true;
			callback(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

var SalesDeliveryDetailsFn = function(condition, selectedAttributes, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	salesDeliveryDetail.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
	.then(function(saleDelvery){
		if(saleDelvery.length == 0){
			log.info(appMsg.LISTNOTFOUNDMESSAGE);
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+saleDelvery.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+saleDelvery.length+' results.';
			response.data 		= saleDelvery;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= appMsg.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
	
}


module.exports = {
		getSales							: getSales,
		getSalesDetails						: getSalesDetails,
		saveOrUpdateSalesHeader				: saveOrUpdateSalesHeader,
		saveOrUpdateSalesDetails			: saveOrUpdateSalesDetails,
		deleteSaleDetails					: deleteSaleDetails,
		saveOrUpdateSales					: saveOrUpdateSales,
		changeSalesStatus					: changeSalesStatus,
		saveOrUpdateSalesDeliveryDetailsFn	: saveOrUpdateSalesDeliveryDetailsFn,
		SalesDeliveryDetailsFn				: SalesDeliveryDetailsFn,
		
		getSaleDetail 						: getSaleDetail
}