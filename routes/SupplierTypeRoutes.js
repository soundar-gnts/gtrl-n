/**
 * File Name	:	SupplierType.js
 * Description	:	To write Routing middlewares For Supplier Type.
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

var supplierTypeService = require('../services/SupplierTypeService.js');

module.exports = function(app, server){
	
	app.post('/savesuppliertypedetails',saveOrUpdateSupplierType);
	app.post('/getsuppliertypedetails', getSupplierType);
	
	function saveOrUpdateSupplierType(req, res){
		
		var supplierType = {

				supp_type_id	: req.param('supptypeid'),
				supp_type_name	: req.param('supptypename'),
				company_id 		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
			
		}
		supplierTypeService.saveOrUpdateSupplierType(supplierType, function(response){
			res.send(response);
		});
	}
	
	function getSupplierType(req, res){
		
		var condition 	= "";
		var suppTypeId 	= req.param('supptypeid');
		var companyId 	= req.param('companyid');
		var status		= req.param('status');
		var name 		= req.param('supptypename');
		var selectedAttributes	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['supp_type_id','supp_type_name']
		}
		
		if(companyId != null)
			condition = "company_id="+companyId;
		
		if(suppTypeId!=null)
			if(condition === "")
				condition = "supp_type_id='"+suppTypeId+"'";
		
			else
				condition = condition+" and supp_type_id='"+suppTypeId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		if(name!=null)
			if(condition === null)
				condition = "supp_type_name='"+name+"'";
		
			else
				condition = condition+" and supp_type_name='"+name+"'";
		
		
		supplierTypeService.getSupplierType(condition, selectedAttributes, function(response){
			res.send(response);
		});
	}
}