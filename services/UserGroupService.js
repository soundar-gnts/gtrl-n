/**
 * File Name	:	UserGroupService.js
 * Description	:	To write Business Logic For User Group.
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

var log			= require('../config/logger').logger;
var appMsg		= require('../config/Message.js');
var userGroup 	= require('../models/UserGroup.js');
var user 		= require('../models/User.js');
var response = {
		status	: Boolean,
		message : String,
		data	: String
}

//insert or update User Group
exports.saveOrUpdateUserGroup = function(req, res){
	var uGroup = {
			group_id		: req.param('groupid'),
			group_name		: req.param('groupname'),
			company_id 		: req.param('companyid'),
			status 			: req.param('status'),
			last_updated_dt	: req.param("lastupdateddt"),
			last_updated_by	: req.param('lastupdatedby'),
		}
	userGroup.findOne({where : {group_id : req.param('groupid')}})
	.then(function(group){
		if(!group){
			userGroup.create(uGroup)
			.then(function(g){
				var flag = false;
				log.info('new groupid is '+g.group_id);
				log.info('group id add to '+req.param('empids').length+' users');
				log.info(req.param('empids'));
				for(var i = 0; i < req.param('empids').length; i++){
					
					user.findOne({where : {employee_id : req.param('empids')[i].empid}})
					.then(function(usr){
						log.info('group id of userid '+usr.user_id+' is changed to '+g.group_id);
						usr.group_id = g.group_id;
						usr.save();
					})
				}

				log.info('User group saved successfully.');
				response.message = 'User group saved successfully.';
				response.status  = true;
				res.send(response);

			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= 'Internal error.';
				response.data  		= err;
				res.send(response);
			});
		} else{
			userGroup.upsert(uGroup)
			.then(function(g){
				log.info('editted group id is '+req.param('groupid'));
				user.findAll({where : {group_id : req.param('groupid')}})
				.then(function(users){
					log.info(users.length+' users found which having this group.')
					for(var i = 0; i < users.length; i++){
						var flag = false;
						for(var j = 0; j < req.param('empids').length; j++){
							if(users[i].employee_id == req.param('empids')[j].empid){
								log.info('No need to update userid '+users[i].user_id);
								flag = true;
								req.param('empids').splice(j,1);
							}
								
						}
						if(!flag){
							log.info('Need to update userid '+users[i].user_id)
							users[i].group_id = null;
							users[i].save();
						}
						
					}
					
					log.info(req.param('empids').length+' new users found to update group id.');
					log.info(req.param('empids'));
					for(var i = 0; i < req.param('empids').length; i++){
						user.findOne({where : {employee_id : req.param('empids')[i].empid}})
						.then(function(usr){
							log.info('group id of userid '+usr.user_id+' is changed to '+req.param('groupid'));
							usr.group_id = req.param('groupid');
							usr.save();
						})
					}
					log.info('User group editted successfully.');
					response.message = 'User group editted successfully.';
					response.status  = true;
					res.send(response);
					
				}).error(function(err){
					log.error(err);
					response.status  	= false;
					response.message 	= 'Internal error.';
					response.data  		= err;
					res.send(response);
				});
			})
		}
	}).error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= 'Internal error.';
		response.data  		= err;
		res.send(response);
	});
}


//get all User Group
exports.getUserGroup = function(req, res){

	var condition 	= "";
	var groupId 	= req.param('groupid');
	var companyId 	= req.param('companyid');
	var status		= req.param('status');
	var groupName 	= req.param('groupname');
	
	if(companyId != null)
		condition = "company_id="+companyId;
	
	if(groupId!=null)
		if(condition === "")
			condition = "group_id='"+groupId+"'";
	
		else
			condition = condition+" and group_id='"+groupId+"'";
	
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
	
	userGroup.findAll({where : [condition]})
		.then(function(groups){
			if(groups.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				res.send(response);
			} else{
				log.info('About '+groups.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+groups.length+' results.';
				response.data 		= groups;
				res.send(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= 'Internal error.';
			response.data  		= err;
			res.send(response);
		});
}
