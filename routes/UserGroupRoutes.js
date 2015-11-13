/**
 * File Name	:	UserGroupRoutes.js
 * Description	:	To write Routing middlewares For User Group.
 * Author		:	Haris K.A.
 * Date			:	October 08, 2015
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

var userGroupService = require('../services/UserGroupService.js');

module.exports = function(app, server){
	
	app.post('/getusergroupdetails', 	getUserGroup);
	app.post('/saveusergroupdetails', 	saveOrUpdateUserGroupDetails);
	
	
	function getUserGroup(req, res){
		var condition 			= "";
		var groupId 			= req.param('groupid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var groupName 			= req.param('groupname');
		var selectedAttributes	= "";
		var fetchAssociation	= "";
		
		if(req.param('fetchassociation')=='yes'){
			fetchAssociation = [{model : userAccessTree}]
		}
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['group_id','group_name']
		}
		
		if(companyId != null)
			condition = "m_user_group.company_id="+companyId;
		
		if(groupId!=null)
			if(condition === "")
				condition = "m_user_group.group_id='"+groupId+"'";
		
			else
				condition = condition+" and m_user_group.group_id='"+groupId+"'";
		
		if(status!=null)
			if(condition === "")
				condition = "status='"+status+"'";
		
			else
				condition = condition+" and status='"+status+"'";
		
		if(groupName!=null)
			if(condition === "")
				condition = "group_name='"+groupName+"'";
		
			else
				condition = condition+" and group_name='"+groupName+"'";
		
		userGroupService.getUserGroup(condition, selectedAttributes, fetchAssociation, function(response){
			res.send(response);
		});
	}
	
	function saveOrUpdateUserGroupDetails(req, res){
		var uGroup = {
				group_id		: req.param('groupid'),
				group_name		: req.param('groupname'),
				company_id 		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
		}
		
		var uAccessTrees = [];
		if(req.param('accesstree').length != null)
			req.param('accesstree').forEach(function(accessTre){
				var uAccessTree = {
						acc_tree_id		: accessTre.acctreeid,
						company_id 		: req.param('companyid'),
						group_id 		: req.param('groupid'),
						screen_name		: accessTre.screenname,
						view_yn			: accessTre.viewyn,
						status 			: accessTre.status,
						last_updated_dt	: accessTre.lastupdateddt,
						last_updated_by	: accessTre.lastupdatedby
					}
					uAccessTrees.push(uAccessTree);
			});
		
		userGroupService.saveOrUpdateUserGroupDetails(uGroup, uAccessTrees, function(response){
			res.send(response);
		});
	}
}