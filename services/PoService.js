/**
 * File Name	:	PoService.js
 * Description	:	To write Business Logic For Purchase order header.
 * Author		:	Haris K.A.
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
 * 
 */

var path				= require('path');
var fileName			= path.basename(__filename);
var log 				= require('../config/logger').logger;
var APPMSG				= require('../config/Message.js');
var CONSTANT			= require('../config/Constants.js');

var poHeader			= require('../models/PoHeader.js');
var poDetail			= require('../models/PoDetail.js');
var product				= require('../models/Product.js');
var supplier			= require('../models/Supplier.js');

var slnogenService 		= require('../services/SlnoGenService.js');
var messageService 		= require('../services/MessagesService.js');

//get all Purchase order header details
var getPo = function(condition, selectedAttributes, fetchAssociation, callback){
	log.info(fileName+'.getPo');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poHeader.findAll({
		where		: [condition],
		include		: fetchAssociation,
		attributes	: selectedAttributes
	})
	.then(function(poDtls){
		if(poDtls.length == 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+poDtls.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+poDtls.length+' results.';
			response.data 		= poDtls;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

//get all Purchase order detail details
var getPoDetails = function(condition, selectedAttributes, callback){

	log.info(fileName+'.getPoDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	poDetail.findAll({
		where 		: [condition],
		attributes	: selectedAttributes
		
	})
	.then(function(poDetls){
		if(poDetls.length == 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			callback(response);
		} else{
			log.info('About '+poDetls.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+poDetls.length+' results.';
			response.data 		= poDetls;
			callback(response);
		}
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

// save or update poHeader function
var saveOrUpdatePoHeader = function(poHdr, callback){
	
	log.info(fileName+'.saveOrUpdatePoHeader');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if purchase order id exist then update otherwise create poheader table 
	if(poHdr.po_id != null){
		poHeader.upsert(poHdr)
		.then(function(data){
			log.info(APPMSG.POEDITSUCCESS);
			response.message 	= APPMSG.POEDITSUCCESS;
			response.data  		= poHdr.po_id;
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
		poHeader.create(poHdr)
		.then(function(data){
			log.info(APPMSG.POSAVESUCCESS);
			response.message	= APPMSG.POSAVESUCCESS;
			response.data  		= data.po_id;
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

//save or update poDetails function
var saveOrUpdatePoDetails = function(poDtl, callback) {

	log.info(fileName+'.saveOrUpdatePoDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	//if purchase details id exist then update otherwise create poDetail table 
	if(poDtl.po_dtlid != null){
		poDetail.upsert(poDtl)
		.then(function(data){
			log.info(APPMSG.PODETAILEDITSUCCESS);
			response.message	= APPMSG.PODETAILEDITSUCCESS;
			response.data  		= poDtl.po_dtlid;
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
		poDetail.create(poDtl)
		.then(function(data){
			log.info(APPMSG.PODETAILSAVESUCCESS);
			response.message	= APPMSG.PODETAILSAVESUCCESS;
			response.data  		= data.po_dtlid;
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

var deletePoDetails = function(condition, callback){
	log.info(fileName+'.deletePoDetails');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	poDetail.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Products removed.');
			response.status  	= true;
			response.message 	= data+' Products removed.';
			callback(response);
		} else{
			log.info('No Product found.');
			response.status  	= false;
			response.message 	= 'No Product found.';
			callback(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

//insert or update Purchase order details
var saveOrUpdatePo = function(slid, purchaseOrder, purchaseDetails, purchaseDeleteDetailsIds, callback){
	log.info(fileName+'.saveOrUpdatePo');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	
	saveOrUpdatePoHeader(purchaseOrder, function(header){
		//if true data inserted/updated successfully else error
		if(header.status){
			//if slid exist, serial number generated, so need to update slnoGen table 
			if(slid != null)
				slnogenService.updateSequenceNo(slid, purchaseOrder.last_updated_dt, purchaseOrder.last_updated_by);
			console.log('header.status : '+header.status);
			//log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			//log.info(salesDetails.length+' Sales detail is going to update');
			
			//if delete details id exist need to hard delete in poDetail Table
			if(purchaseDeleteDetailsIds != null)
				purchaseDeleteDetailsIds.forEach(function(poDelDetail){
					deletePoDetails("po_dtlid='"+poDelDetail.po_dtlid+"'", function(result){
						log.info(result);
					});
				});
			
			//if purchase details exist need to add/update in poDetail Table
			if(purchaseDetails != null)
				purchaseDetails.forEach(function(purchaseDetail){
					purchaseDetail.po_id = header.data;
					saveOrUpdatePoDetails(purchaseDetail, function(result){
						console.log(result);
					});
				});
				
			
			callback(header);
		} else{
			console.log('header.status'+header.status);
			callback(header);
		}
	});
}

// Cancel, Approve and Reject service (po_hdr)
var changePoStatus = function(purchaseOrder, callback){
	log.info(fileName+'.changePoStatus');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	var condition = "po_id='"+purchaseOrder.po_id+"'";
	getPo(condition, '', '', function(data){
		//if true data exist else error
		if(data.status){
			//if approved cannot do rejection & cancel operation else can
			if(data.data[0].status == CONSTANT.STATUSAPPROVED && (purchaseOrder.status == CONSTANT.STATUSREJECTED||purchaseOrder.status == CONSTANT.STATUSCANCELLED)){
				log.info('Purchase order is already'+CONSTANT.STATUSAPPROVED);
				response.status  	= true;
				response.message 	= 'Purchase order is already'+CONSTANT.STATUSAPPROVED;
				callback(result);
			} else
				saveOrUpdatePoHeader(purchaseOrder, function(result){
					if(result.status){
						
						//insert into message table when status is Pending/Cancelled/Approved/Rejected
						if(purchaseOrder.status == CONSTANT.STATUSCANCELLED || purchaseOrder.status == CONSTANT.STATUSAPPROVED || purchaseOrder.status == CONSTANT.STATUSREJECTED || purchaseOrder.status == CONSTANT.STATUSPENDING){
							var msgObj = {
									company_id 			: data.data[0].company_id,
									//msg_type			: dataTypes.STRING,
									//msg_sender			: dataTypes.STRING,
									//msg_receivers		: dataTypes.STRING,
									//msg_cc				: dataTypes.STRING,
									//msg_subject			: dataTypes.STRING,
									//msg_body			: dataTypes.STRING,
									//client_ip			: dataTypes.STRING,
									//user_id				: dataTypes.INTEGER,
									//msg_response		: dataTypes.STRING,
									//msg_status			: dataTypes.STRING,
									//msg_sent_dt			: dataTypes.DATE

							}
							messageService.saveMessages(msgObj, function(rslt){
								log.info(rslt);
							});
						}
						
						log.info('Purchase order is '+purchaseOrder.status);
						response.status  	= true;
						response.message 	= 'Purchase order is '+purchaseOrder.status;
						callback(result);
					} else
						callback(result);
				});
		} else
			callback(data);
	});
	
}

//For update balance qty
var updatePODetailBalanceQty=function(poid,prodid,qty,mode){
	log.info(fileName+'.updatePODetailBalanceQty');
	poDetail.findOne({where:[{po_id:poid,prod_id:prodid}]})
	.then(function(result){
		if(result!=null){
			var balqty=0;
			if(result.bal_qty!=null){
				balqty=result.bal_qty;
			}
			if(mode=='DELETE'){
				balqty = balqty-qty;
			}else{
				balqty = balqty+qty;
			}
			poDetail.update({bal_qty:balqty},{where : {po_dtlid:result.po_dtlid}}).then(function(data){
				poDetail.sum('bal_qty', { where: { po_id: poid } }).then(function(sum) {
					console.log(fileName+'>>updatePODetailBalanceQty>> Sum of bal qty--->'+sum);
					if(sum<=0){
						poHeader.update({status:'Closed'},{where : {po_id:poid}}).then(function(data){}).error(function(err){
							console.log(err);
						});
					}
					
				}).error(function(err){
					console.log(err);
				});
								
			}).error(function(err){
				console.log(err);
			});
			
		}
	});
}

module.exports = {
	getPo					: getPo,
	getPoDetails			: getPoDetails,
	saveOrUpdatePoHeader	: saveOrUpdatePoHeader,
	saveOrUpdatePoDetails	: saveOrUpdatePoDetails,
	deletePoDetails			: deletePoDetails,
	saveOrUpdatePo			: saveOrUpdatePo,
	changePoStatus			: changePoStatus,
	updatePODetailBalanceQty: updatePODetailBalanceQty
}
