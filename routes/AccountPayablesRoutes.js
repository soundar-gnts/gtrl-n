/**
 * @Filename : AccountPayablesRoutes.js
 * @Description : To write Routing middlewares for Account Payables related
 *              Table.
 * @Author : SOUNDAR C
 * @Date : October 10, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version Date Modified By Remarks
 * 
 * 
 */
var accountPayablesService 	= require('../services/AccountPayablesService.js');
var accounts 				= require('../models/Accounts.js');
var messagesService 		= require('../services/MessagesService.js');
var constants				= require('../config/Constants.js');
var config 					= require('../config/config.js');
var slnogenService 			= require('../services/SlnoGenService.js');

module.exports = function(app, server) {
	
	app.post('/getaccountpayablesdetails', getAccountPayablesDetails);
	app.post('/saveaccountpayables', saveAccountPayables);
	
	// To get Account Payables List based on user param
	function getAccountPayablesDetails(req, res){
		var attr 				= "";
		var condition 			= "";
		var accpaybleid			= req.param("accpaybleid");
		var companyid			= req.param("companyid");
		var storeid				= req.param("storeid");
		var accountid			= req.param("accountid");
		var billno				= req.param("billno");
		var status				= req.param("status");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : accounts, attributes : ['account_name']}];
		}
		
		if(accpaybleid!=null){
			condition ="accpayble_id="+accpaybleid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="t_account_payables.company_id='"+companyid+"'";
			}else {
				condition=condition+" and t_account_payables.company_id='"+companyid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(accountid!=null){
			if(condition === ""){
				condition="account_id='"+accountid+"'";
			}else {
				condition=condition+" and account_id='"+accountid+"'";
			}
		}
		if(billno!=null){
			if(condition === ""){
				condition="bill_no like '%"+billno+"%'";
			}else {
				condition=condition+" and bill_no like '%"+billno+"%'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="t_account_payables.status='"+status+"'";
			}else {
				condition=condition+" and t_account_payables.status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['accpayble_id','bill_no','invoice_amount','paid_amount','balance_amount'];
		}
		
		accountPayablesService.getAccountPayablesDetails(condition,attr,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	// To Save Save/Update AccountPayables Details
	function saveAccountPayables(req, res){
		
		var accpayobj = {
				accpayble_id			: req.param("accpaybleid"),
				company_id 				: req.param("companyid"),
				store_id 				: req.param("storeid"),
				entry_date 				: req.param("entrydate"),
				account_id 				: req.param("accountid"),
				bill_no 				: req.param("billno"),
				bill_date 				: req.param("billdate"),
				grn_no 					: req.param("grnno"),
				invoice_amount 			: req.param("invoiceamount"),
				paid_amount 			: req.param("paidamount"),
				balance_amount 			: req.param("balanceamount"),
				remarks 				: req.param("remarks"),
				prepared_by 			: req.param("preparedby"),
				actioned_by 			: req.param("actionedby"),
				status 					: req.param("status"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby")
				
			};
		
		
		if(req.param("accpaybleid")==null){
			
			var refkey	= 'ACC_PAY_REF';
			var slNoCondition = {
					company_id 			: accpayobj.company_id,
					ref_key 			: refkey,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			};
			
			slnogenService.getSlnoValue(slNoCondition, function(sl) {
				accpayobj.ref_number = sl.sno;
				accountPayablesService.saveAccountPayables(accpayobj, function(result) {

					if (result.status) {
						slnogenService.updateSequenceNo(sl.slid,
								accpayobj.last_updated_dt, accpayobj.last_updated_by);
					}

					res.send(result);
				});
			});
			
		}else{
					
		accountPayablesService.saveAccountPayables(accpayobj,function(result){
			
			// For Sent a Message
			if(req.param("status")!=null&&req.param("status")!=constants.STATUSAPPROVED){
				var messageobj={	
						company_id 				: req.param("companyid"),
						msg_type 				: 'N',
						msg_sender 				: config.ACCOUNTS_EMAIL,
						msg_receivers 			: config.ACCOUNTS_EMAIL,
						msg_subject 			: 'Reg - Account Payable - '+req.param("status"),
						msg_body 				: 'Bill Number : '+req.param("billno")+'\nAmount :'+req.param("invoiceamount")+
												  '\nRemarks :'+req.param("remarks")+'\nBill Date :'+req.param("billdate"),
						client_ip 				: req.connection.remoteAddress,
						user_id 				: req.param("userid"),
						msg_status 				: 'Pending',
						msg_sent_dt 			: new Date()
					};
				messagesService.saveMessages(messageobj, function(result){
				});
			}
			res.send(result);
		});
	 }
	}
}

