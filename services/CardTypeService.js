/**
 * File Name	:	CardTypeService.js
 * Description	:	To write Business Logic For CardType.
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

var cardtype 	= require('../models/CardType.js');
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');

var response = {
		status	: Boolean,
		message : String,
		data	: String
};

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
			.then(function(data){
				if(data){
					log.info('Card Type Saved successfully.');
					response.message = 'Card Type saved successfully.';
					response.status  = true;
					
				}
				else{
					log.info('Card Type Updated successfully.');
					response.message = 'Card Type Updated successfully.';
					response.status  = true;
					
				}
				res.send(response);
				
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
	}; 

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
		
		cardtype.findAll({where : [condition],order: [['last_updated_dt', 'DESC']]})
		.then(function(cardtypelist){
			if(cardtypelist.length === 0){
				
				log.info('No data found.');
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data 	 = "";
				
			} else{
				
				log.info('About '+cardtypelist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+cardtypelist.length+' results.';
				response.data 		= cardtypelist;
				
			}
			res.send(response);
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	};

