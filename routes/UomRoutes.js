/**
 * File Name	:	UomRoutes.js
 * Description	:	To write Routing middlewares For Uom.
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

var uomService = require('../services/UomService.js');

module.exports = function(app, server){
	
	app.post('/saveuomdetails', saveOrUpdateUom);
	app.post('/getuomdetails', 	getUom);
	
	//For save or update UOM
	function saveOrUpdateUom(req, res){
		var oumobj = {
				uom_id			: req.param('uomid'),
				uom_name		: req.param('uomname'),
				company_id 		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby')
			};
		uomService.saveOrUpdateUom(oumobj,function(result){
			res.send(result);
		});
		
	}
	
	//For get UOM List based on user param
	function getUom(req, res){
		var condition 			= "";
		var uomId 				= req.param('uomid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var uomName 			= req.param('uomname');
		var selectedAttributes	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['uom_id','uom_name']
		}
		
		if(companyId != null)
			condition = "company_id="+companyId;
		
		if(uomId!=null)
			if(condition === "")
				condition = "uom_id='"+uomId+"'";
		
			else
				condition = condition+" and uom_id='"+uomId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		if(uomName!=null)
			if(condition === "")
				condition = "uom_name='"+uomName+"'";
		
			else
				condition = condition+" and uom_name='"+uomName+"'";
		
		uomService.getUom(condition,selectedAttributes,function(result){
			res.send(result);
		});
	}
}