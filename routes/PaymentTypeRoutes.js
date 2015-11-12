/**
 * File Name	:	PaymentTypeRoutes.js
 * Description	:	To write Routing middlewares For Payment type.
 * Author		:	Haris K.A.
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
 * 
 */

var paymentTypeService = require('../services/PaymentTypeService.js');

module.exports = function(app, server){
	
	app.post('/savepaymenttypedetails', 	saveOrUpdatePymentType);
	app.post('/getpaymenttypedetails', 		getPymentType);
	
	//For get payment type list based on user param
	function getPymentType(req, res){

		var condition 			= "";
		var paymentTypeId 		= req.param('pymttypeid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var paymentName 		= req.param('pymttypename');
		var selectedAttributes	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['pymt_type_id','pymt_type_name']
		}
		
		if(companyId != null){
			condition = "company_id="+companyId;
		}
		
		if(paymentTypeId!=null){
			if(condition === ""){
				condition = "pymt_type_id='"+paymentTypeId+"'";
			}
			else{
				condition = condition+" and pymt_type_id='"+paymentTypeId+"'";
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
		
		if(paymentName!=null){
			if(condition === ""){
				condition = "pymt_type_name='"+paymentName+"'";
			}
			else{
				condition = condition+" and pymt_type_name='"+paymentName+"'";
			}
		}
		
		paymentTypeService.getPymentType(condition,selectedAttributes,function(result){
			res.send(result);
		});
		
	}
	
	//For save / update payment type
	function saveOrUpdatePymentType(req, res){
		var paytypeobj = {
				pymt_type_id	: req.param('pymttypeid'),
				company_id		: req.param('companyid'),
			    pymt_type_name	: req.param('pymttypename'),
			    status			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby')
			};
		paymentTypeService.saveOrUpdatePymentType(paytypeobj,function(result){
			res.send(result);
		});
	}
	
}