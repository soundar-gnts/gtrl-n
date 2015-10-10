/**
 * @Filename	:	PurchaseHdr.js
 * @Description	:	To write Model Object for t_purchase_hdr table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 09, 2015
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

var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var purchasehdr = model.define('t_purchase_hdr', {

	purchase_id : {
		type 			: dataTypes.INTEGER,
		primaryKey 		: true,
		autoIncrement 	: true
	},
	
	po_id				: dataTypes.INTEGER,
	company_id			: dataTypes.INTEGER,
	invoice_no			: dataTypes.STRING,
	invoice_date		: dataTypes.DATE,
	store_id			: dataTypes.INTEGER,
	document_type		: dataTypes.STRING,
	batch_no			: dataTypes.STRING,
	supplier_id			: dataTypes.INTEGER,
	payment_date		: dataTypes.DATE,
	invoice_amount		: dataTypes.INTEGER,
	outstanding_amount	: dataTypes.INTEGER,
	grn_type			: dataTypes.STRING,
	payment_mode		: dataTypes.STRING,
	discount_prcnt		: dataTypes.INTEGER,
	discount_value		: dataTypes.INTEGER,
	cancel_remark		: dataTypes.STRING,
	status				: dataTypes.STRING,
	action_remarks		: dataTypes.STRING,
	actioned_by			: dataTypes.STRING,
	actioned_dt			: dataTypes.DATE,
	last_updated_dt		: dataTypes.DATE,
	last_updated_by		: dataTypes.STRING
}, {
	timestamps 			: false,
	freezeTableName 	: true,
	tableName 			: 't_purchase_hdr'
});
module.exports = purchasehdr;