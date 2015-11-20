/**
 * @Filename	:	SerialNoGenRoutes.js
 * @Description	:	To write Routing middlewares For Serial Number Generation.
 * @Author		:	SOUNDAR C
 * @Date		:	October 06, 2015
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
var slnoGenService = require('../services/SlnoGenService.js');
module.exports = function(app, server) {
	app.post('/getslnogendetails', getSlnoGenDetails);
	app.post('/updatesequenceno', slnoGenService.updateSequenceNo);
	
	//To get the serial no list based on user param
	function getSlnoGenDetails(req, res){
		var attr 			= "";
		var condition 		= "";
		var slnoid			= req.param("slnoid");
		var companyid		= req.param("companyid");
		var storeid			= req.param("storeid");
		var refkey			= req.param("refkey");
		var status			= req.param("status");
		var autogenyn		= req.param("autogenyn");
		if(slnoid!=null){
			condition ="slno_id="+slnoid;
		}
		if(companyid!=null){
			if(condition === ""){
				condition="company_id='"+companyid+"'";
			}else {
				condition=condition+" and company_id='"+companyid+"'";
			}
		}
		if(storeid!=null){
			if(condition === ""){
				condition="store_id='"+storeid+"'";
			}else {
				condition=condition+" and store_id='"+storeid+"'";
			}
		}
		if(refkey!=null){
			if(condition === ""){
				condition="ref_key like '"+refkey+"'";
			}else {
				condition=condition+" and ref_key like '"+refkey+"'";
			}
		}
		if(status!=null){
			if(condition === ""){
				condition="status='"+status+"'";
			}else {
				condition=condition+" and status='"+status+"'";
			}
		}
		/*if(req.param('isfulllist')==null||req.param('isfulllist').toUpperCase()=='P'){
			attr=['prefix_key','prefix_cncat','suffix_key','suffix_cncat','curr_seqno'];
		}*/
		slnoGenService.getSlnoGenDetails(condition,attr,function(result){
			res.send(result);
		});
	}
}

