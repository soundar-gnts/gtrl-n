/**
 * @Filename 		: m_slno_gen_service.js 
 * @Description 	: To write Business Logic for m_slno_gen type. 
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
var slnogen = require('../models/m_slno_gen.js');

// To get full Serial No Generation List
exports.getSlnoGenDetails = function(req, res) {
	slnogen.findAll({
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




// To Save Serial No Generation
exports.saveSlnoGen = function(req, res) {
	slnogen.create({
		slno_id				: req.param("slnoid"),
		company_id 			: req.param("companyid"),
		slno_gen_level 		: req.param("slnogenlevel"),
		store_id 			: req.param("storeid"),
		ref_key 			: req.param("refkey"),
		key_desc 			: req.param("keydesc"),
		autogen_yn 			: req.param("autogenyn"),
		prefix_key 			: req.param("prefixkey"),
		prefix_cncat 		: req.param("prefixcncat"),
		suffix_key 			: req.param("suffixkey"),
		suffix_cncat 		: req.param("suffixcncat"),
		curr_seqno 			: req.param("currseqno"),
		last_seqno 			: req.param("lastseqno"),
		status 				: req.param("status"),
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


