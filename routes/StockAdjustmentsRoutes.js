/**
 * @Filename	:	StockAdjustmentsRoutes.js
 * @Description	:	To write Routing middlewares for t_stock_adjustments Table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 10, 2015
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
var stockAdjustmentsService 	= require('../services/StockAdjustmentsService.js');
var messagesService 			= require('../services/MessagesService.js');
var constants					= require('../config/Constants.js');
var config 						= require('../config/config.js');
var slnogenService 				= require('../services/SlnoGenService.js');
var product 					= require('../models/Product.js');
var uom 						= require('../models/Uom.js');

module.exports = function(app, server) {
	app.post('/getstockadjustmentsdetails', getStockAdjustmentsDetails);
	app.post('/savestockadjustments', saveStockAdjustments);
	
	//For save / update stock adjustments
	function saveStockAdjustments(req, res){
		var adjustobj = {
				adjust_id					: req.param("adjustid"),
				product_id 					: req.param("productid"),
				company_id 					: req.param("companyid"),
				store_id 					: req.param("storeid"),
				adjust_date 				: req.param("adjustdate"),
				ref_number					: req.param("refnumber"),
				adjust_qty 					: req.param("adjustqty"),
				batch_no					: req.param("batchno"),
				uom_id						: req.param("uomid"),
				status						: req.param("status"),
				adjust_symbol 				: req.param("adjustsymbol"),
				adjust_reason 				: req.param("adjustreason"),
				actioned_by 				: req.param("actionedby"),
				actioned_dt 				: req.param("actioneddt")
				
			};
		
		if(req.param("adjustid")==null){
			
			var refkey	= 'ADJUST_REF';
			var slNoCondition = {
					company_id 			: adjustobj.company_id,
					ref_key 			: refkey,
					autogen_yn 			: 'Y',
					status 				: 'Active'
			};
			
			slnogenService.getSlnoValue(slNoCondition, function(sl){
			adjustobj.ref_number = sl.sno;
			stockAdjustmentsService.saveStockAdjustments(adjustobj, function(response){
			
			if(response.status){
				slnogenService.updateSequenceNo(sl.slid, adjustobj.actioned_dt, adjustobj.actioned_by);
			}
				
			res.send(response);
			});
			});
		}else{
			stockAdjustmentsService.saveStockAdjustments(adjustobj, function(response){
			
			//For Sent a Message
			if(req.param("status")!=null&&req.param("status")!=constants.STATUSAPPROVED){
				var messageobj={	
						company_id 				: req.param("companyid"),
						msg_type 				: 'N',
						msg_sender 				: config.STORE_EMAIL,
						msg_receivers 			: config.STORE_EMAIL,
						msg_subject 			: 'Reg - Stock Adjustments - '+req.param("status"),
						msg_body 				: 'Product Ref : '+req.param("productid")+'\nQty :'+req.param("adjustqty")+
												  '\nReason :'+req.param("adjustreason")+'\nSymbol :'+req.param("adjustsymbol"),
						client_ip 				: req.connection.remoteAddress,
						user_id 				: req.param("userid"),
						msg_status 				: 'Pending',
						msg_sent_dt 			: new Date()
					};
				messagesService.saveMessages(messageobj, function(result){
				});
			}
			res.send(response);
		});
		}
	}
	
	
	//For get stock adjustments details
	function getStockAdjustmentsDetails(req, res){
		var condition 			= "";
		var attr 				= "";
		var adjustid			=req.param("adjustid");
		var companyid			=req.param("companyid");
		var productid			=req.param("productid");
		var storeid				=req.param("storeid");
		var adjustsymbol		=req.param("adjustsymbol");
		var status				=req.param("status");
		var refnumber			=req.param("refnumber");
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : product, attributes : ['prod_code','prod_name']},
			                    {model : uom, attributes : ['uom_name']}]
		}
		
		if(adjustid!=null){
			condition ="adjust_id="+adjustid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="t_stock_adjustments.company_id='"+companyid+"'";
			}else {
				condition=condition+" and t_stock_adjustments.company_id='"+companyid+"'";
			}
		}
		if(productid!=null){
			if(condition === ""){
				condition="product_id='"+productid+"'";
			}else {
				condition=condition+" and product_id='"+productid+"'";
			}
		}
		if(refnumber!=null){
			if(condition === ""){
				condition="ref_number='%"+refnumber+"%'";
			}else {
				condition=condition+" and ref_number='%"+refnumber+"%'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(adjustsymbol!=null){
			if(condition === ""){
				condition="adjust_symbol='"+adjustsymbol+"'";
			}else {
				condition=condition+" and adjust_symbol='"+adjustsymbol+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['adjust_id','product_id','company_id','adjust_symbol'];
		}
		
		console.log('condition-->'+condition);
		
		stockAdjustmentsService.getStockAdjustmentsDetails(condition,attr,fetchAssociation, function(response){
			res.send(response);
		});
	}
}

