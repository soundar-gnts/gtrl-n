/**
 * @Filename 		: BankService.js 
 * @Description 	: To write Business Logic for Bank. 
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

var bank 			= require('../models/Bank.js');
var bankBranch 		= require('../models/BankBranch.js');
var appMsg			= require('../config/Message.js');
var log 			= require('../config/logger').logger;
var path 			= require('path');
var fileName		= path.basename(__filename);
var response 		= {
						status	: Boolean,
						message : String,
						data	: String
					};

// To Get Bank full LIST
exports.getBankDetails = function(conditionQuery,attr,callback) {
	
	bank.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info(fileName+'.getBankDetails -  No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getBankDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
			log.error(fileName+'.getBankDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
};

//To Get Bank Branchfull LIST
exports.getBankBranchDetails = function(conditionQuery,attr,callback) {
	
	bankBranch.findAll({where : [conditionQuery],attributes: attr,order: [['last_updated_dt', 'DESC']]})
	.then(function(result){
		if(result.length === 0){
			
			log.info(fileName+'.getBankBranchDetails - No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data 	 = "";
			callback(response);
		} else{
			
			log.info(fileName+'.getBankBranchDetails - About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	})
	.error(function(err){
			log.error(fileName+'.getBankBranchDetails - ');
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
};

//To Save Bank List
exports.saveBankDetails = function(bankobj, bankbranchlist, callback) {

	if (bankobj.bank_id == null) {
		bank.create(bankobj).then(function(p) {
			for (var i = 0; i < bankbranchlist.length; i++) {
				bankbranchlist[i].bank_id = p.bank_id;
				bankBranch.upsert(bankbranchlist[i]).error(function(err) {
					callback(err);
				});

			}
			log.info(fileName + '>> saveBankDetails >> ' + appMsg.SAVEMESSAGE);
			response.message = appMsg.SAVEMESSAGE;
			response.status = true;
			callback(response);

		}).error(function(err) {
			log.error(fileName + '>> saveBankDetails >> ' + err);
			response.status 	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data 		= err;
			callback(response);
		});
	} else {

		bank.upsert(bankobj).then(
				function(p) {
					for (var i = 0; i < bankbranchlist.length; i++) {
						bankBranch.upsert(bankbranchlist[i]).error(
								function(err) {
									callback(err);
								});

					}
					log.info(fileName + '>> saveBankDetails >> '
							+ appMsg.UPDATEMESSAGE);
					response.message 	= appMsg.UPDATEMESSAGE;
					response.status 	= true;
					callback(response);

				}).error(function(err) {
			log.error(fileName + '>>saveBankDetails >> ');
			log.error(err);
			response.status 	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data 		= err;
			callback(response);
		});
	}

}


