/**
 * @Filename 		: StockTransferService.js
 * @Description 	: To write Business Logic for StockTransfers. 
 * @Author 			: Saranya G
 * @Date 			: October 09, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. All rights reserved.
 * 
 * This software is the confidential and proprietary information of GNTS
 * Technologies Pvt. Ltd.
 * 
 * Version 			Date 		Modified By 		Remarks
 * 
 * 
 */
var stocktranshdr  		= require('../models/StockTransferHdr.js');
var stocktransdtl  		= require('../models/StockTransferDtl.js');
var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response  			= {
							status	: Boolean,
							message : String,
							data	: String
							};

// To get Stock TransferHdr List based on user param

exports.getStocktransferHdr = function(req, res) {
	
	var condition 		= "";
	var transferid		= req.param("transferid");
	var transferrefno	= req.param("transferrefno");
	var companyid		= req.param("companyid");
	var fromStoreid		= req.param("fromStoreid");
	var to_store_id		= req.param("tostoreid");
	var transfer_ctgry	= req.param("transferctgry");
	var transfer_Status	= req.param("transferStatus");
	
	if(transferid!=null){
		condition ="transfer_id="+transferid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(fromStoreid!=null){
		if(condition === ""){
			condition="from_Store_id='"+fromStoreid+"'";
		}else {
			condition=condition+" and from_Store_id='"+fromStoreid+"'";
		}
	}
	if(tostoreid!=null){
		if(condition === ""){
			condition="to_store_id='"+tostoreid+"'";
		}else {
			condition=condition+" and to_store_id='"+tostoreid+"'";
		}
	}
	if(transferrefno!=null){
		if(condition === ""){
			condition="transfer_refno like '%"+transferrefno+"%'";
		}else {
			condition=condition+" and transfer_refno like '%"+transferrefno+"%'";
		}
	}
	if(transferctgry!=null){
		if(condition === ""){
			condition="transfer_ctgry like '%"+transferctgry+"%'";
		}else {
			condition=condition+" and transfer_ctgry like '%"+transferctgry+"%'";
		}
	}
	
	if(transferStatus!=null){
		if(condition === ""){
			condition="transfer_Status='"+transferStatus+"'";
		}else {
			condition=condition+" and transfer_Status='"+transferStatus+"'";
		}
	}
	
	stocktranshdr.findAll({where : [condition],order: [['actioned_dt', 'DESC']]})
	
	.then(function(result) {
		if(result.length === 0){
			log.info('No data found.');
			response.message = appMsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			res.send(response);
		} else{
			
			log.info('About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
};

//To get Stock TransferDtl List based on user param

exports.getStocktransferDtl = function(req, res) {
	
		var condition 		= "";
		var transferid		= req.param("transferid");
		var transferdtlid	= req.param("transferdtlid");
		var productid		= req.param("productid");
		var batchno			= req.param("batchno");	
		var status			= req.param("status");
	
		if(transferdtlid!=null){
			condition ="transfer_dtlid="+transferdtlid;
		}
		
		if(transferid!=null){
			if(condition === ""){
				condition="transfer_id='"+transferid+"'";
			}else {
				condition=condition+" and transfer_id='"+transferid+"'";
			}
		}
		
		if(productid!=null){
			if(condition === ""){
				condition="product_id='"+productid+"'";
			}else {
				condition=condition+" and product_id='"+productid+"'";
			}
		}
		
		if(batchno!=null){
			if(condition === ""){
				condition="batch_no like '%"+batchno+"%'";
			}else {
				condition=condition+" and batch_no like '%"+batchno+"%'";
			}
		}
	
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		
		stocktransdtl.findAll({where : [condition]})
		
		.then(function(result) {
			if(result.length === 0){
				log.info('No data found.');
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				response.data	 = "";
				res.send(response);
			} else{
				
				log.info('About '+result.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+result.length+' results.';
				response.data 		= result;
				res.send(response);
			}
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
	};

/*
// To Save/Update StockTransferHdr and  Detail

	exports.saveTransferDetails = function(req, res) {
		
		stocktranshdr.upsert({
				
			transfer_id					: req.param("transferid"),
			company_id 					: req.param("companyid"),
			transfer_refno 				: req.param("transferrefno"),
			from_Store_id 				: req.param("fromStoreid"),
			to_store_id 				: req.param("tostoreid"),
			transfer_ctgry 				: req.param("transferctgry"),
			transfer_remarks 			: req.param("transferremarks"),	
			transfer_Status 			: req.param("transferStatus"),
			basic_total 				: req.param("basictotal"),
			total_tax 					: req.param("totaltax"),
			total_value 				: req.param("totalvalue"),
			action_remarks 				: req.param("actionremarks"),
			actioned_by 				: req.param("actionedby"),
			actioned_dt 				: req.param("actioneddt"),
			transfered_by 				: req.param("transferedby"),
			
			
		}).then(function(st){
			for(var i=0;i<req.param('stocktranslist').length;i++){
				stocktransdtl.upsert({
					transfer_dtlid 			: req.param('stocktranslist')[i].transferdtlid,
					transfer_id 			: st.transferid,
					product_id 				: req.param('stocktranslist')[i].productid,
					batch_no				: req.param('stocktranslist')[i].batchno,
					received_qty 			: req.param('stocktranslist')[i].receivedqty,
					rate 					: req.param('stocktranslist')[i].rate,				
					basic_value				: req.param('stocktranslist')[i].basicvalue,
					discount_prcnt			: req.param('stocktranslist')[i].discountprcnt,
					tax_id					: req.param('stocktranslist')[i].taxid,
					tax_prnct				: req.param('stocktranslist')[i].taxprnct,
					tax_value				: req.param('stocktranslist')[i].taxvalue,
					remarks					: req.param('stocktranslist')[i].remarks,
					status					: req.param('stocktranslist')[i].status,
					
					
				}).error(function(err) {
					res.send(err);
				});
			}
			
				log.info('Saved Successfully.');
				response.message = 'Saved Successfully.';
				response.status  = true;
				response.data	 = "";
				res.send(response);
			
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
			
	};
*/
// To Save/Update StockTransfer Detail
	
	exports.saveStockTransDtls = function(req, res) {
		
		stocktransdtl.upsert({
			transfer_dtlid 			: req.param('transferdtlid'),
			transfer_id 			: req.param('transferid'),
			product_id 				: req.param('productid'),
			batch_no				: req.param('batchno'),
			received_qty 			: req.param('receivedqty'),
			rate 					: req.param('rate'),				
			basic_value				: req.param('basicvalue'),
			discount_prcnt			: req.param('discountprcnt'),
			tax_id					: req.param('taxid'),
			tax_prnct				: req.param('taxprnct'),
			tax_value				: req.param('taxvalue'),
			remarks					: req.param('remarks'),
			status					: req.param('status'),
			
			
		}).then(function(data){
			if(data){
				log.info('Saved Successfully.');
				response.message = 'Saved Successfully.';
				response.status  = true;
				response.data	 = "";
				res.send(response);
			}
			else{
				log.info('Updated Successfully.');
				response.message = 'Updated Successfully.';
				response.status  = true;
				response.data	 = "";
				res.send(response);
			}
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
			
	}
	
//To Delete StockTransfer Detail
	
	exports.deleteStockTransferDtl = function(req, res) {
		if(req.param("transferdtlid")!=null){
			stocktransdtl.destroy({where:{
				
				transfer_dtlid			: req.param("transferdtlid")		
				
		}}).then(function(data){
			if(data){
				log.info('Deleted Successfully.');
				response.message = 'Deleted Successfully.';
				response.status  = true;
				response.data	 = "";
				res.send(response);
			}
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
		}else{
			response.status  	= false;
			response.message 	= 'JSON Error - Key Not found';
			response.data  		= "";
			res.send(response);
		}
	};
	

	// To Save/Update StockTransferHdr and  Detail

		exports.saveTransferDetails = function(req, res) {
			var stocktrans={	
					transfer_id					: req.param("transferid"),
					company_id 					: req.param("companyid"),
					transfer_refno 				: req.param("transferrefno"),
					from_Store_id 				: req.param("fromStoreid"),
					to_store_id 				: req.param("tostoreid"),
					transfer_ctgry 				: req.param("transferctgry"),
					transfer_remarks 			: req.param("transferremarks"),	
					transfer_Status 			: req.param("transferStatus"),
					basic_total 				: req.param("basictotal"),
					total_tax 					: req.param("totaltax"),
					total_value 				: req.param("totalvalue"),
					action_remarks 				: req.param("actionremarks"),
					actioned_by 				: req.param("actionedby"),
					actioned_dt 				: req.param("actioneddt"),
					transfered_by 				: req.param("transferedby")
					}
			
			stocktranshdr.upsert().then(function(st){
				for(var i=0;i<req.param('stocktranslist').length;i++){
					stocktransdtl.upsert({
						transfer_dtlid 			: req.param('stocktranslist')[i].transferdtlid,
						transfer_id 			: st.transferid,
						product_id 				: req.param('stocktranslist')[i].productid,
						batch_no				: req.param('stocktranslist')[i].batchno,
						received_qty 			: req.param('stocktranslist')[i].receivedqty,
						rate 					: req.param('stocktranslist')[i].rate,				
						basic_value				: req.param('stocktranslist')[i].basicvalue,
						discount_prcnt			: req.param('stocktranslist')[i].discountprcnt,
						tax_id					: req.param('stocktranslist')[i].taxid,
						tax_prnct				: req.param('stocktranslist')[i].taxprnct,
						tax_value				: req.param('stocktranslist')[i].taxvalue,
						remarks					: req.param('stocktranslist')[i].remarks,
						status					: req.param('stocktranslist')[i].status,
						
						
					}).error(function(err) {
						res.send(err);
					});
				}
				
					log.info('Saved Successfully.');
					response.message = 'Saved Successfully.';
					response.status  = true;
					response.data	 = "";
					res.send(response);
				
				
			}).error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
				
		};
