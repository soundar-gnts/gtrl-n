/**
 * @Filename 		: m_txns_type_service.js 
 * @Description 	: To write Business Logic for transaction type. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 03, 2015
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
var txnstype = require('../models/m_txns_type.js');

// To get full Transaction Type List
exports.getTxnsTypeDetails = function(req, res) {
	txnstype.findAll({
		where : {
			company_id : req.param('companyid')
		}
	}).then(function(err, result) {
		if (err)
			res.send(err);
		else
			res.send(result);
	})
}




// To Save Transaction Type
exports.saveTxnsType = function(req, res) {
	txnstype.create({
		trans_type_id		: req.param("transtypeid"),
		company_id 			: req.param("companyid"),
		trans_type_name		: req.param("transtype_name"),
		cr_dr				: req.param("crdr"),
		status				: req.param("status"),
		last_updated_dt 	: req.param("lastupdateddt"),
		last_updated_by 	: req.param("lastupdatedby")
	}).then(function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send('Successfully Added.');
		}
	});
		
}


