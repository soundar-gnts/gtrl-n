/**
 * @Filename	:	TxnsTypeRoutes.js
 * @Description	:	To write Routing middlewares For Transaction Type table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 06, 2015
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
var txnsTypeService = require('../services/TxnsTypeService.js');
module.exports = function(app, server) {
	app.post('/gettxnstypedetails', getTxnsTypeDetails);
	app.post('/savetxnstype', saveTxnsType);
	
	// To get full Transaction Type List
	function getTxnsTypeDetails(req, res){
		var attr 			= "";
		var condition 		= "";
		var transtypeid		= req.param("transtypeid");
		var companyid		= req.param("companyid");
		var transtypename	= req.param("transtypename");
		var status			= req.param("status");
		if(transtypeid!=null){
			condition ="trans_type_id="+transtypeid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(transtypename!=null){
			if(condition === ""){
				condition="trans_type_name like '%"+transtypename+"%'";
			}else {
				condition=condition+" and trans_type_name like '%"+transtypename+"%'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['trans_type_id','trans_type_name','cr_dr'];
		}
		txnsTypeService.getTxnsTypeDetails(condition,attr, function(result){
			res.send(result);
		});
		
	}
	// To Save Transaction Type
	function saveTxnsType(req, res){
		var txnstypeobj={
				trans_type_id		: req.param("transtypeid"),
				company_id 			: req.param("companyid"),
				trans_type_name		: req.param("transtypename"),
				cr_dr				: req.param("crdr"),
				status				: req.param("status"),
				last_updated_dt 	: req.param("lastupdateddt"),
				last_updated_by 	: req.param("lastupdatedby")
			};
		txnsTypeService.saveTxnsType(txnstypeobj,function(result){
			res.send(result);
		});
	}
}

