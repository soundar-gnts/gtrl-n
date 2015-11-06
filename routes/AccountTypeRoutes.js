/**
 * @Filename	:	AccountTypeRoutes.js
 * @Description	:	To write Routing middlewares for m_account_type Table.
 * @Author		:	SOUNDAR C
 * @Date		:	November 06, 2015
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
var accountTypeService = require('../services/AccountTypeService.js');
module.exports = function(app, server) {
	app.post('/getaccounttypedetails', getAccountTypeDetails);
	app.post('/saveaccounttype', saveAccountType);
	app.post('/deleteaccounttype', accountTypeService.deleteAccountType);
	
	//For Save/Update Account Type
	function saveAccountType(req, res){
		var accounttypeobj={	
					acct_type_id			: req.param("accttypeid"),
					company_id 				: req.param("companyid"),
					account_type 			: req.param("accounttype"),
					status 					: req.param("status"),
					last_updated_dt 		: req.param("lastupdateddt"),
					last_updated_by 		: req.param("lastupdatedby")
				};
		
		accountTypeService.saveAccountType(accounttypeobj, function(result){
			res.send(result);
		});
	}
	// To get Account Type List based on user param
	function getAccountTypeDetails(req, res){
		
		var condition 			= "";
		var accttypeid			= req.param("accttypeid");
		var companyid			= req.param("companyid");
		var accounttype			= req.param("accounttype");
		var status				= req.param("status");
		
		if(accttypeid!=null){
			condition ="acct_type_id="+accttypeid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(accounttype!=null){
			if(condition === ""){
				condition="account_type='"+accounttype+"'";
			}else {
				condition=condition+" and account_type='"+accounttype+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		
		accountTypeService.getAccountTypeDetails(condition, function(result){
			res.send(result);
		});
		
	}
	
}

