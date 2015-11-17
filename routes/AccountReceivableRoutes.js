/**
 * File Name	:	AccountReceivableRoutes.js
 * Description	:	To write Routing middlewares For AccountReceivableRoutes.
 * Author		:	Saranya G.
 * Date			:	October 10, 2015
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
var accountreceivableservice 	= require('../services/AccountReceivableService.js');
var accounts 			 		= require('../models/Accounts.js');
var messagesService 			= require('../services/MessagesService.js');
var constants					= require('../config/Constants.js');
var config 						= require('../config/config.js');
var slnogenService 				= require('../services/SlnoGenService.js');


module.exports = function(app, server){
	
	app.post('/getaccountreceivabledetails',getAccountReceivableDetails);
	app.post('/saveaccountreceivables',		saveAccountReceivables);
	
	function getAccountReceivableDetails(req, res){
		
		var selectedAttributes 	= "";
		var condition 			= "";
		var accountid			= req.param("accountid");
		var accrcbleid			= req.param("accrcbleid");
		var companyid			= req.param("companyid");
		var storeid				= req.param("storeid");
		var invoiceno			= req.param("invoiceno");
		var status				= req.param("status");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : accounts, attributes : ['account_name']}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['accrcble_id','entry_date','account_id']
		}
		
		if(accrcbleid!=null){
			condition ="accrcble_id="+accrcbleid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(accountid!=null){
			if(condition === ""){
				condition="account_id='"+accountid+"'";
			}else {
				condition=condition+" and account_id='"+accountid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(invoiceno!=null){
			if(condition === ""){
				condition="invoice_no like '%"+invoiceno+"%'";
			}else {
				condition=condition+" and invoice_no like '%"+invoiceno+"%'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		console.log("fetchAssociation-->"+fetchAssociation);
		accountreceivableservice.getAccountReceivableDetails(condition, selectedAttributes,fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	function saveAccountReceivables(req, res){
		
		var accountReceivable = {
				accrcble_id				: req.param("accrcbleid"),
				company_id 				: req.param("companyid"),
				store_id 				: req.param("storeid"),
				entry_date 				: req.param("entrydate"),
				account_id 				: req.param("accountid"),
				invoice_no 				: req.param("invoiceno"),
				invoice_date 			: req.param("invoicedate"),	
				invoice_amount 			: req.param("invoiceamount"),
				paid_amount 			: req.param("paidamount"),
				balance_amount 			: req.param("balanceamount"),
				remarks 				: req.param("remarks"),
				prepared_by 			: req.param("preparedby"),
				actioned_by 			: req.param("actionedby"),
				status 					: req.param("status"),
				last_updated_dt 		: req.param("lastupdateddt"),
				last_updated_by 		: req.param("lastupdatedby")
				
			}
		
		if(req.param("accrcbleid")==null){
			
			var refkey	= 'ACC_RECV_REF';
			var slNoCondition = {
					company_id 			: accountReceivable.company_id,
					ref_key 			: refkey,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			};
			
			slnogenService.getSlnoValue(slNoCondition, function(sl) {
				accountReceivable.ref_number = sl.sno;
				
				accountreceivableservice.saveAccountReceivables(accountReceivable, function(response){

					if (response.status) {
						slnogenService.updateSequenceNo(sl.slid,
								accountReceivable.last_updated_dt, accountReceivable.last_updated_by);
					}

					res.send(response);
				});
				
			});
			
		}else{
		
		accountreceivableservice.saveAccountReceivables(accountReceivable, function(response){
			
			//For Sent a Message
			if(req.param("status")!=null&&req.param("status")!=constants.STATUSAPPROVED){
				var messageobj={	
						company_id 				: req.param("companyid"),
						msg_type 				: 'N',
						msg_sender 				: config.ACCOUNTS_EMAIL,
						msg_receivers 			: config.ACCOUNTS_EMAIL,
						msg_subject 			: 'Reg - Account Receivables - '+req.param("status"),
						msg_body 				: 'Invoice Number : '+req.param("invoiceno")+'\nAmount :'+req.param("invoiceamount")+
												  '\nRemarks :'+req.param("remarks")+'\nInvoice Date :'+req.param("invoicedate"),
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
		}
	}
}