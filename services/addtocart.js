
var path		= require('path');
var fileName	= path.basename(__filename);
var log 		= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var soHeader	= require('../models/SalesOrderHeader.js');
var soDetail	= require('../models/SalesOrderDetail.js');
var common		= require('../services/CommonService.js');





//add to cart
exports.saveOrUpdatecart = function(salesOrder, salesDetails, salesDeleteDetailsIds, res){
	log.info(fileName+'.saveOrUpdateSalesOrderFn');
	
	var refkey = 'SO_NO';
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	if(salesOrder.salesorder_id != null){
		salesOrder.status = 'Completed'
		soHeader.upsert(salesOrder)
		.then(function(data){
			
			log.info(salesDeleteDetailsIds.length+' Sales detail is going to remove.');
			log.info(salesDetails.length+' Sales detail is going to update');
			
			//delete sales details from sales order detail table.
			for(var i = 0; i < salesDeleteDetailsIds.length; i++)
				deleteSalesOrderDetailsFn("salesorder_dtl_id='"+salesDeleteDetailsIds[i].salesorder_dtl_id+"'");
			
			//update/save new sales details into sales order table.
			for(var i = 0; i < salesDetails.length; i++)
				saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
			
			log.info(appMsg.SALESORDEREDITSUCCESS);
			response.message 	= appMsg.SALESORDEREDITSUCCESS;
			response.data  		= salesOrder.salesorder_id;
			response.status  	= true;
			res.send(response);
			
		}).error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERROR;
			response.data  		= err;
			res.send(response);
		});
	} else{
		
		//send otp to mobile number
		
		slnogenService.getSlnoValue(salesOrder.company_id, req.param('storeid'), refkey, 'y', 'Active', function(slno){
			if(sl == null){

				salesOrder.otp_code			= common.generateOTP(4);
				salesOrder.sal_ordr_number	= sl.sno;
				soHeader.create(salesOrder)
				.then(function(data){
					
					for(var i = 0; i < salesDetails.length; i++){
						salesDetails[i].salesorder_id = data.salesorder_id;
						saveOrUpdateSalesOrderDetailsFn(salesDetails[i]);
					}
					slnogenService.updateSequenceNo(sl.slid,req.param('lastupdateddt'),req.param('lastupdatedby'));
					log.info(appMsg.SALESORDERSAVESUCCESS);
					response.message	= appMsg.SALESORDERSAVESUCCESS;
					response.data  		= data.salesorder_id;
					response.status 	= true;
					res.send(response);
				})
				.error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= appMsg.INTERNALERROR;
					response.data  		= err;
					res.send(response);
				});
				
			} else{
			log.info('Sales order saved successfully.');
			response.message	= 'Sales order saved successfully.';
			response.data  		= data.salesorder_id;
			response.status 	= true;
			res.send(response);}
		});
		
	}
	
}