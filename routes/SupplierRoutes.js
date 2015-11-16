/**
 * File Name	:	SupplierRoutes.js
 * Description	:	To write Routing middlewares For Supplier.
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

var supplierService = require('../services/SupplierService.js');
var state			= require('../models/State.js');
var city			= require('../models/City.js');
var supplierType 	= require('../models/SupplierType.js');

module.exports = function(app, server){
	
	app.post('/savesupplierdetails',saveOrUpdateSupplierDetails);
	app.post('/getsupplierdetails', getSupplier);
	
	//For save / update supplier details
	function saveOrUpdateSupplierDetails(req, res){
		
		var supplier = {

				supplier_id		: req.param('supplierid'),
				supplier_code	: req.param('suppliercode'),
				supplier_name	: req.param('suppliername'),
				address			: req.param('address'),
				pincode			: req.param('pincode'),
				landline_no		: req.param('landlineno'),
				mobile_no		: req.param('mobileno'),
				fax_no			: req.param('faxno'),
				email_id		: req.param('emailid'),
				contact_person	: req.param('contactperson'),
				contact_no		: req.param('contactno'),
				remarks			: req.param('remarks'),
				credit_days		: req.param('creditdays'),
				cst_no			: req.param('cstno'),
				tin_no			: req.param('tinno'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
			
				company_id 		: req.param('companyid'),
				supp_type_id	: req.param('supptypeid'),
				state_id		: req.param('stateid'),
				city_id			: req.param('cityid'),
				payment_type	: req.param('paymenttype'),
				account_type	: req.param('accounttype')
			
		}
		supplierService.saveOrUpdateSupplierDetails(supplier, function(response){
			res.send(response);
		});
	}
	
	//For get supplier details based on user param
	function getSupplier(req, res){
		
		var fetchAssociation 	= "";
		var condition 			= "";
		var supId 				= req.param('supplierid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var supName				= req.param('suppliername');
		var selectedAttributes	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : state, attributes : ['state_name']},
			                    {model : city, attributes : ['city_name']},
			                    {model : supplierType, attributes : ['supp_type_name']}];
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['supplier_id','supplier_code','supplier_name'];
		}
		
		if(companyId != null){
			condition = "company_id="+companyId;
		}
		
		if(supId!=null){
			if(condition === ""){
				condition = "supplier_id='"+supId+"'";
			}		
			else{
				condition = condition+" and supplier_id='"+supId+"'";
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
		
		if(supName!=null){
			if(condition === ""){
				condition = "supplier_name='"+supName+"'";
			}		
			else{
				condition = condition+" and supplier_name='"+supName+"'";
			}
		}		
		
		supplierService.getSupplier(condition, selectedAttributes, fetchAssociation,function(response){
			res.send(response);
		});
	}
	
}