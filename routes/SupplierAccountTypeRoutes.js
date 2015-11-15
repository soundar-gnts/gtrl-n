/**
 * File Name	:	SupplierAccountType.js
 * Description	:	To write Routing middlewares For Supplier Account Type.
 * Author		:	Haris K.A.
 * Date			:	October 07, 2015
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

var supplierAccountTypeService = require('../services/SupplierAccountTypeService.js');

module.exports = function(app, server){
	
	app.post('/savesupplieraccounttypedetails', saveOrUpdateSupplierAccountType);
	app.post('/getsupplieraccounttypedetails', 	getSupplierAccountType);
	
	//For save /update supplier account type
	function saveOrUpdateSupplierAccountType(req, res){
		
		var supplierAccType = {

				supp_acct_id	: req.param('suppacctid'),
				supp_acct_name	: req.param('suppacctname'),
				company_id 		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
			
		}
		
		supplierAccountTypeService.saveOrUpdateSupplierAccountType(supplierAccType, function(response){
			res.send(response);
		});
	}
	
	//For get Supplier account type based on user param
	function getSupplierAccountType(req, res){
		
		var condition 	= "";
		var suppAcctId	= req.param('suppacctid')
		var companyId 	= req.param('companyid');
		var status		= req.param('status');
		var name 		= req.param('suppacctname');
		var selectedAttributes	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['supp_acct_id','supp_acct_name']
		}
		
		if(companyId != null){
			condition = "company_id="+companyId;
		}
		
		if(suppAcctId!=null){
			if(condition === ""){
				condition = "supp_acct_id='"+suppAcctId+"'";
			}		
			else{
				condition = condition+" and supp_acct_id='"+suppAcctId+"'";
			}
		}
		
		if(status!=null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}		
		if(name!=null){
			if(condition === null){
				condition = "supp_acct_name='"+name+"'";
			}		
			else{
				condition = condition+" and supp_acct_name='"+name+"'";
			}
		}		
		
		supplierAccountTypeService.getSupplierAccountType(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
	
}