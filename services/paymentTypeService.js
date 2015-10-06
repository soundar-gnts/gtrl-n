/**
 * File Name	:	paymentTypeService.js
 * Description	:	To write Business Logic For Product Category.
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

var log = require('../config/logger').logger;
var PaymentType = require('../models/paymentType.js');
var response = {
		status	: Boolean,
		message : String
}

//insert or update Payment type
exports.saveOrUpdatePymentType = function(req, res){
	PaymentType.findOrCreate({where : {pymt_type_id : req.param('id')},
		defaults : {
			company_id		: req.param('companyid'),
		    pymt_type_name	: req.param('name'),
		    status			: req.param('status'),
			last_updated_dt	: new Date(),
			last_updated_by	: req.param('updatedby')
		}
	}).spread(function(type, created){
		if(created){
			log.info('Successfully Inserted.');
			response.message = 'Successfully Inserted.';
			response.status  = true;
			res.send(response);
		} else{
			type.company_id		= req.param('companyid');
			type.pymt_type_name	= req.param('name');
			type.status			= req.param('status');
			type.last_updated_dt= new Date();
			type.last_updated_by= req.param('updatedby');
			type.save();
			log.info('Successfully Editted.');
			response.message = 'Successfully Editted.';
			response.status  = true;
			res.send(response);
			
		}
	}).error(function(err){
		log.error(err);
		response.message = err;
		response.status  = false;
		res.send(response);
	})
}


//get all Payment type
exports.getAllPymentType = function(req, res){
	PaymentType.findAll()
		.then(function(type){
			if(type.length == 0){
				log.info('Empty payment type List.');
				response.message = 'Empty payment type List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('Payment type List Exist');
				response.message = type;
				response.status  = false;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

// get one Payment type
exports.getOnePymentType = function(req, res){
	PaymentType.findOne({where : {pymt_type_id : req.param('id')}})
		.then(function(type){
			if(!type){
				log.info('');
				response.message = 'Empty Payment type List.';
				response.status  = false;
				res.send(response);
			} else{
				log.info('');
				response.message = type;
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

//change status of Payment type
exports.inactiveOrActivePymentType = function(req, res){
	PaymentType.findOne({where : {pymt_type_id : req.param('id')}})
		.then(function(type){
			if(!type){
				log.info('Empty Payment type List.');
				response.message = 'Empty Payment type List.';
				response.status  = false;
				res.send(response);
			} else{
				if(type.status == 'Active')
					type.status = 'Inactive';
				else
					type.status = 'Active';
				type.save()
				log.info('Changed status');
				response.message = 'Changed status';
				response.status  = true;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}


//delete Payment type
exports.deletePymentType = function(req, res){
	PaymentType.findOne({where : {pymt_type_id : req.param('id')}})
		.then(function(type){
			if(!type){
				log.info('Empty Payment type List.');
				response.message = 'Empty Payment type List.';
				response.status  = false;
				res.send(response);
			} else{
				type.destroy()
				.then(function(cat){
					log.info('Deleted Successfully.');
					response.message = 'Deleted Successfully.';
					response.status  = false;
					res.send(response);
				});
			}
		})
		.error(function(err){
			log.error(err);
			response.message = err;
			response.status  = false;
			res.send(response);
		});
}

exports.demo = function(req, res){
	var id = req.param('id');
	var s = req.param('status');
	var condition = null;
	if(id!=null){
		condition = '{company_id:'+id+'}'
	}
	if(s!=null){
		if(condition==null){
			condition = '{status:'+s+'}'
		} else{
			condition = condition+',{status:'+s+'}'
		}
	}
	
	console.log(condition)
	PaymentType.findOne({
		  where: {
		    $or: [
		          condition
		    ]
	  }
		},{raw: true}).then(function(d){
			console.log(d);
		});
}