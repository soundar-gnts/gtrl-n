/**
 * File Name	:	TaxRoutes.js
 * Description	:	To write Routing middlewares For Tax.
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

var taxService 		= require('../services/TaxService.js');
var state 			= require('../models/State.js');

module.exports = function(app, server){
	
	app.post('/savetaxdetails', saveOrUpdateTax);
	app.post('/gettaxdetails', 	getTax);
	
	//For save / update tax details
	function saveOrUpdateTax(req, res){
		var tax = {
				tax_id			: req.param('taxid'),
				tax_name		: req.param('taxname'),
				company_id 		: req.param('companyid'),
				state_id		: req.param('stateid'),
				cst				: req.param('cst'),
				lst				: req.param('lst'),
				surcharge		: req.param('surcharge'),
				tax_on_mrp		: req.param('taxonmrp'),
				tax_symbol		: req.param('taxsymbol'),
				service_tax		: req.param('servicetax'),
				mrp_inclusive	: req.param('mrpinclusive'),
				for_sales_yn	: req.param('forsalesyn'),
				for_purchase_yn	: req.param('forpurchaseyn'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
		}
		taxService.saveOrUpdateTax(tax, function(result){
			res.send(result);
		});
	}
	
	//For get tax list based on user param
	function getTax(req, res){
		
		var condition 			= "";
		var fetchAssociation 	= "";
		var taxId 				= req.param('taxid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var taxName 			= req.param('taxname');
		var stateId 			= req.param('stateid');
		var selectedAttributes	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['tax_id','tax_name']
		}
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : state, attributes : ['state_name']}]
		}
		
		
		if(companyId != null){
			condition = "company_id="+companyId;
		}
		
		if(taxId!=null){
			if(condition === ""){
				condition = "tax_id='"+taxId+"'";
			}
			else{
				condition = condition+" and tax_id='"+taxId+"'";
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
		
		if(taxName!=null){
			if(condition === null){
				condition = "tax_name='"+taxName+"'";
			}		
			else{
				condition = condition+" and tax_name='"+taxName+"'";
			}
		}
		
		if(stateId!=null){
			if(condition === null){
				condition = "state_id='"+stateId+"'";
			}		
			else{
				condition = condition+" and state_id='"+stateId+"'";
			}
		}
		
		taxService.getTax(condition, selectedAttributes,fetchAssociation, function(result){
			res.send(result);
		});
	}
	
}