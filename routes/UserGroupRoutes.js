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
var userGroup 				= require('../models/UserGroup.js');

module.exports = function(app, server){
	
	app.post('/saveusergroupdetails', 		saveOrUpdateUserGroup);
	app.post('/getusergroupdetails', 		getUserGroup);
	app.post('/getuseraccesstreedetails', 	getUserAccessTree);
	
	//For save or update user group
	function saveOrUpdateUserGroup(req, res){
		var uGroup = {
				group_id		: req.param('groupid'),
				group_name		: req.param('groupname'),
				company_id 		: req.param('companyid'),
				status 			: req.param('status'),
				last_updated_dt	: req.param("lastupdateddt"),
				last_updated_by	: req.param('lastupdatedby'),
		}
		
		var uAccessTrees = [];
		for(var i = 0; i < req.param('accesstree').length; i++){
			var uAccessTree = {
				acc_tree_id		: req.param('accesstree')[i].acctreeid,
				company_id 		: req.param('companyid'),
				group_id 		: req.param('groupid'),
				screen_name		: req.param('accesstree')[i].screenname,
				view_yn			: req.param('accesstree')[i].viewyn,
				status 			: req.param('accesstree')[i].status,
				last_updated_dt	: req.param('accesstree')[i].lastupdateddt,
				last_updated_by	: req.param('accesstree')[i].lastupdatedby
			}
			uAccessTrees.push(uAccessTree);
		}
		userGroupService.saveOrUpdateUserGroup(uGroup,uAccessTrees,function(result){
			res.send(result);
		});
		
	}
	
	//For get user group list based on user param
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
		
		if(companyId != null){
			condition = "m_user_group.company_id="+companyId;
		}
		
		if(groupId!=null){
			if(condition === ""){
				condition = "m_user_group.group_id='"+groupId+"'";
			}		
			else{
				condition = condition+" and m_user_group.group_id='"+groupId+"'";
			}
		}
		
		if(status!=null){
			if(condition === ""){
				condition = "status='"+status+"'";
			}		
			else{
				condition = condition+" and status='"+status+"'";
			}
		}
		
		if(groupName!=null){
			if(condition === ""){
				condition = "group_name='"+groupName+"'";
			}		
			else{
				condition = condition+" and group_name='"+groupName+"'";
			}
		}		
		userGroupService.getUserGroup(condition,selectedAttributes,fetchAssociation,function(result){
			res.send(result);
		});
	}
	
	//For get user access tree based on user param
	function getUserAccessTree(req, res){
		var condition 			= "";
		var accessTreeId		= req.param('acctreeid');
		var groupId 			= req.param('groupid');
		var companyId 			= req.param('companyid');
		var status				= req.param('status');
		var selectedAttributes	= "";
		var fetchAssociation 	= "";
		
		if(req.param('isfulllist') == null || req.param('isfulllist').toUpperCase() == 'P'){
			selectedAttributes = ['acc_tree_id','group_id']
		}
		if(req.param('fetchassociation')=='y'){
			fetchAssociation = [{model : userGroup, attributes : ['group_name']}]
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
		
		if(groupId != null){
			if(condition === ""){
				condition = "group_id='"+groupId+"'";
			}		
			else{
				condition = condition+" and group_id='"+groupId+"'";
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
		
		userGroupService.getUserAccessTree(condition,selectedAttributes,fetchAssociation,function(result){
			res.send(result);
		});
	}
}