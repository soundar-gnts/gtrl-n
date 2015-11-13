/**
 * File Name	:	VoucherService.js
 * Description	:	To write Business Logic For Voucher and VoucherType.
 * Author		:	Saranya G
 * Date			:	October 06, 2015
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

var voucher 		= require('../models/Voucher.js');
var voucherType		= require('../models/VoucherType.js');
var APPMSG			= require('../config/Message.js');
var log 			= require('../config/logger').logger;
var path			= require('path');
var fileName		= path.basename(__filename);

//get voucher list
var getVoucher = function(condition, selectedAttribute, callback) {
	log.info(fileName+'.getVoucherList - ');
	var response 		= {
		status	: Boolean,
		message : String,
		data	: String
	}
	
	voucher.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: selectedAttribute})
	.then(function(voucherlist){
		if(voucherlist.length === 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			log.info('About '+voucherlist.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+voucherlist.length+' results.';
			response.data 		= voucherlist;
			callback(response);
		}
	})
	.error(function(err){
		log.info(APPMSG.INTERNALERRORMESSAGE);
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}
	
// Voucher Type List
var getVoucherType = function(condition, selectedAttribute, callback) {
	log.info(fileName+'.getVoucherTypeList - ');
	var response 		= {
		status	: Boolean,
		message : String,
		data	: String
	}
		
	voucherType.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: selectedAttribute})
	.then(function(vouchertypelist){
		if(vouchertypelist.length === 0){
			log.info(APPMSG.LISTNOTFOUNDMESSAGE);
			response.message = APPMSG.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			log.info('About '+vouchertypelist.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+vouchertypelist.length+' results.';
			response.data 		= vouchertypelist;
			callback(response);
		}
	})
	.error(function(err){
		log.info(APPMSG.INTERNALERRORMESSAGE);
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}

//save or update voucher
var saveOrUpdateVoucher = function(vouchr, callback){
	log.info(fileName+'.saveOrUpdateVoucher - ');
	var response 		= {
			status	: Boolean,
			message : String,
			data	: String
		}
	if(vouchr.voucher_id != null){
		voucher.upsert(vouchr)
		.then(function(data){
			log.info(APPMSG.VOUCHEREDITSUCCESS);
			response.message= APPMSG.VOUCHEREDITSUCCESS;
			response.status = true;
			response.data  	= vouchr.voucher_id;
			callback(response);
		}).error(function(err){
			log.info(APPMSG.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		voucher.create(vouchr)
		.then(function(data){
			log.info(APPMSG.VOUCHERSAVESUCCESS);
			response.message= APPMSG.VOUCHERSAVESUCCESS;
			response.status = true;
			response.data  	= data.voucher_id;
			callback(response);
		}).error(function(err){
			log.info(APPMSG.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}
	
//SaveOrUpdate Voucher Type Details	
var saveOrUpdateVoucherType = function(voucherType, callback){
	log.info(fileName+'.saveOrUpdateVoucherType - ');
	var response 		= {
		status	: Boolean,
		message : String,
		data	: String
	}
	if(voucherType.voucher_type_id != null){
		voucherType.upsert(voucherType)	
		.then(function(data){
			log.info(APPMSG.VOUCHERTYPEEDITSUCCESS);
			response.message= APPMSG.VOUCHERTYPEEDITSUCCESS;
			response.status = true;
			response.data  	= voucherType.voucher_type_id;
			callback(response);
		})
		.error(function(err){
			log.info(APPMSG.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		voucherType.create(voucherType)	
		.then(function(data){
			log.info(APPMSG.VOUCHERTYPESAVESUCCESS);
			response.message= APPMSG.VOUCHERTYPESAVESUCCESS;
			response.status = true;
			response.data  	= data.voucher_type_id;
			callback(response);
		})
		.error(function(err){
			log.info(APPMSG.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= APPMSG.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

module.exports = {
	getVoucher : getVoucher,
	getVoucherType : getVoucherType,
	saveOrUpdateVoucher : saveOrUpdateVoucher,
	saveOrUpdateVoucherType : saveOrUpdateVoucherType
}