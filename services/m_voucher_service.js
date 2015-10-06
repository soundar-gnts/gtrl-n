/**
 * File Name	:	m_voucher_service.js
 * Description	:	To write Business Logic For User.
 * Author		:	Saranya G
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
 */

var voucher = require('../models/m_voucher.js');

//Voucher List

exports.voucherList = function(req, res){

	voucher.findAll({where : {status : "Active"}})
	.then(function(result){
		if(result){
			res.send(result);
		} else{
			res.send("failure");
		}
	})
	.error(function(err){
		res.send(err);
	});
}


//Insert into m_voucher table

exports.saveOrUpdateVoucher = function(req, res){
	voucher.findOrCreate({where: {
		voucher_id: req.param('voucherid')},
		defaults: {
			company_id : req.param('companyid'),
			voucher_type_id:req.param('vouchertypeid'),
			voucher_code:req.param('vouchercode'),
			discount_level:req.param('discountlevel'),
			discount_value:req.param('discountValue'),
			prod_cat_id:req.param('prodcatid'),
			min_bill_value:req.param('minbillvalue'),
			region_id:req.param('regionid'),		
			status: req.param('status'),
			last_updated_dt : new Date(),
			last_updated_by : 'Saranya'
			}
		})
.spread(function(result, created) {
if(created)
	{
	console.log("Successfully Inserted");
	res.send("Successfully Inserted");
	}
else
	{
	result.company_id = req.param('companyid');
	result.voucher_type_id = req.param('vouchertypeid');
	result.voucher_code = req.param('vouchercode');
	result.discount_level = req.param('discountlevel');
	result.discount_value = req.param('discountValue');
	result.prod_cat_id = req.param('prodcatid');
	result.min_bill_value = req.param('minbillvalue');
	result.region_id = req.param('regionid');
	result.status = req.param('status');
	result.last_updated_dt = new Date();
	result.last_updated_by = 'Saranya';
	result.save();
	console.log("Successfully Updated")
	res.send("Successfully Updated");
	}
 
})
}
