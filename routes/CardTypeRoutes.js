/**
 * File Name	:	CardTypeRoutes.js
 * Description	:	To write Routing middlewares For Cardtype.
 * Author		:	Saranya G
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

var cardTypeService = require('../services/CardTypeService.js');
module.exports = function(app, server){
		app.post('/saveorupdatecardtype', saveOrUpdateCardType);
		app.post('/getcardtypelist', getCardTypeList);
		
		//SaveOrUpdate Card Type Details
		function saveOrUpdateCardType(req, res){
			cardtypeobj={
					card_type_id		: req.param('cardtypeid'),
					company_id			: req.param('companyid'),
					card_type			: req.param('cardtype'),
					service_charge 		: req.param('servicecharge'),
					status				: req.param('status'),
					last_updated_dt		: new Date(),
					last_updated_by		: req.param('lastupdatedby') 
					};
			
			cardTypeService.saveOrUpdateCardType(cardtypeobj, function(result){
				res.send(result);
			});
			
		}
		//Card Type LIST
		function getCardTypeList(req, res){
			var attr 			= "";
			var condition 		= "";
			var companyId 		= req.param("companyid");
			var cardTypeId 		= req.param("cardtypeid");
			var cardType		= req.param("cardtype");
			var status			= req.param("status");
			
			if(companyId!=null){
				condition ="company_id="+companyId;
				}
			
			if(status!=null){
				if(condition === ""){
					condition="status='"+status+"'";
				}else {
					condition=condition+" and status='"+status+"'";
				}
			}
			if(cardTypeId!=null){
				if(condition === ""){
					condition="card_type_id='"+cardTypeId+"'";
				}else {
					condition=condition+" and card_type_id = '"+cardTypeId+"'";
				}
				
			}
			if(cardType!=null){
				if(condition === ""){
					condition="card_type like '%"+cardType+"%'";
				}else {
					condition=condition+" and card_type like '%"+cardType+"%'";
				}
				
			}
			
			if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
				attr=['card_type_id','card_type'];
			}
			
			cardTypeService.getCardTypeList(condition,attr, function(result){
				res.send(result);
			});
			
		}
		
};

