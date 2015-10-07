/**
 * File Name	:	m_card_type_service.js
 * Description	:	To write Business Logic For User.
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
 */

var cardtype = require('../models/m_card_type.js');


//SaveOrUpdate Cardtype Details

	exports.saveOrUpdateCardType = function(req, res){
		cardtype.upsert({
			
			card_type_id		: req.param('cardtypeid'),
			company_id			: req.param('companyid'),
			card_type			: req.param('cardtype'),
			service_charge 		: req.param('servicecharge'),
			status				: req.param('status'),
			last_updated_dt		: new Date(),
			last_updated_by		: req.param('lastupdatedby') 
			})
			.error(function(err){
				res.send(err);
			});
		if(req.param('cardtypeid') == null)
			{
			res.send("Inserted Successfully ");
			}
		else
			{
			res.send("Updated Successfully");
			}
	} 

//Card Type LIST

	exports.getCardTypeList = function(req, res) {
		
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
		
		cardtype.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]}).then(function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
		});
		}

