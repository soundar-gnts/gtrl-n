/**
 * File Name	:	StoreService.js
 * Description	:	To write Business Logic For StoreService.
 * Author		:	Saranya G
 * Date			:	October 08, 2015
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

var store 		     = require('../models/Store.js');
var storeRegion		 = require('../models/StoreRegion.js');
var log 			 = require('../config/logger').logger;
var appMsg			 = require('../config/Message.js');
var path			 = require('path');
var fileName		 = path.basename(__filename);
var response 		 = {
							status	: Boolean,
							message : String,
							data	: String
						};

	//Store list based on user param
	exports.getStoreList = function(conditionQuery,attr,fetchAssociation,callback) {
		
		store.findAll({where : [conditionQuery],include : fetchAssociation,order: [['last_updated_dt', 'DESC']],attributes: attr})
		.then(function(storelist){
			if(storelist.length === 0){
				
				log.info(fileName+'.getStoreList - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message 	= appMsg.LISTNOTFOUNDMESSAGE;
				response.status  	= false;	
				response.data	 	= storelist;
				callback(response);
			} else{
				
				log.info(fileName+'.getStoreList - '+'About '+storelist.length+' results.');			
				response.status  	= true;
				response.message 	= 'About '+storelist.length+' results.';
				response.data 		= storelist;
				callback(response);
			}
			
		})
		.error(function(err){
				log.info(fileName+'.getStoreList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	};
	// Store region List
	exports.getStoreRegionList = function(condition,attr,callback) {
	
		storeRegion.findAll({where : [condition],order: [['last_updated_dt', 'DESC']],attributes: attr})
		.then(function(regionlist){
			if(regionlist.length === 0){
				
				log.info(fileName+'.getStoreRegionList - '+appMsg.LISTNOTFOUNDMESSAGE);
				response.message 	= appMsg.LISTNOTFOUNDMESSAGE;
				response.status  	= false;
				response.data	 	= regionlist;
				callback(response);
			} else{
				
				log.info(fileName+'.getStoreRegionList - '+'About '+regionlist.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+regionlist.length+' results.';
				response.data 		= regionlist;
				callback(response);
			}
			
		})
		.error(function(err){
				log.info(fileName+'.getStoreRegionList - '+appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status  	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				callback(response);
		});
	};
	
	//SaveOrUpdate StoreRegion Details
	exports.saveOrUpdateStoreRegion = function(storeregionobj, callback) {
	storeRegion.upsert(storeregionobj).then(
			function(data) {
				if (data) {
					log.info(fileName + '.saveOrUpdateStoreRegion - '
							+ appMsg.SAVEMESSAGE);
					response.message 	= appMsg.SAVEMESSAGE;
					response.status 	= true;
					response.data	 	= "";
					callback(response);
				} else {
					log.info(fileName + '.saveOrUpdateStoreRegion - '
							+ appMsg.UPDATEMESSAGE);
					response.message 	= appMsg.UPDATEMESSAGE;
					response.status 	= true;
					response.data	 	= "";
					callback(response);
				}

			}).error(
			function(err) {
				log.info(fileName + '.saveOrUpdateStoreRegion - '
						+ appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status 	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data 		= err;
				callback(response);
			});
}; 
	
	//SaveOrUpdate Store  Details
	exports.saveOrUpdateStore = function(storeobj, callback) {
	store.upsert(storeobj).then(
			function(data) {
				if (data) {

					log.info(fileName + '.saveOrUpdateStoreRegion - '
							+ appMsg.SAVEMESSAGE);
					response.message 	= appMsg.SAVEMESSAGE;
					response.status 	= true;
					response.data	 	= "";
					callback(response);
				} else {
					log.info(fileName + '.saveOrUpdateStoreRegion - '
							+ appMsg.UPDATEMESSAGE);
					response.message 	= appMsg.UPDATEMESSAGE;
					response.status 	= true;
					response.data	 	= "";
					callback(response);
				}

			}).error(
			function(err) {
				log.info(fileName + '.saveOrUpdateStoreRegion - '
						+ appMsg.INTERNALERRORMESSAGE);
				log.error(err);
				response.status 	= false;
				response.message 	= appMsg.INTERNALERRORMESSAGE;
				response.data 		= err;
				callback(response);
			});
}; 
