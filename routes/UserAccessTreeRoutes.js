/**
 * File Name	:	UserAccessTreeRoutes.js
 * Description	:	To write Routing middlewares For User Access Tree.
 * Author		:	Haris K.A.
 * Date			:	October 09, 2015
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

var userAccessTreeService 	= require('../services/UserAccessTreeService.js');
var userGroup 				= require('../models/UserGroup.js');

module.exports = function(app, server){
	
	app.post('/getuseraccesstreedetails', 	getUserAccessTree);
	app.post('/saveuseraccesstreedetails', userAccessTreeService.saveOrUpdateUserAccess);
	
	
	//For get user access tree 
	function getUserAccessTree(req, res){
		
		var condition 			= "";
		var accessTreeId		= req.param('acctreeid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var selectedAttributes	= "";
		var fetchAssociation 	= "";
		
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : userGroup, attributes : ['group_name']}]
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['acc_tree_id','group_id']
		}
		
		if(companyId != null){
			condition = "m_user_access_tree.company_id="+companyId;
		}
		
		if(accessTreeId != null){
			if(condition === ""){
				condition = "acc_tree_id='"+accessTreeId+"'";
			}		
			else{
				condition = condition+" and acc_tree_id='"+accessTreeId+"'";
			}
		}
		
		if(status != null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}		
		console.log("fetchAssociation-->"+fetchAssociation);
		userAccessTreeService.getUserAccessTree(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
}