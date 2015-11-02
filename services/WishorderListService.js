/**
 * @Filename 		: WishorderListService.js 
 * @Description 	: To write Business Logic for t_wishorder_list. 
 * @Author 			: SOUNDAR C 
 * @Date 			: October 17, 2015
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
var wishorderlist = require('../models/WishorderList.js');
var log = require('../config/logger').logger;
var response = {
		status	: Boolean,
		message : String,
		data	: String
};
var appmsg			= require('../config/Message.js');
var sequelize		= require('../config/sequelize.js');

var path 			= require('path');
var filename		= path.basename(__filename);

// To get Wishorder List based on user param
exports.getWishorderList = function(req, res) {
	var condition 		= "";
	var wishid			=req.param("wishid");
	var companyid		=req.param("companyid");
	var productid		=req.param("productid");
	var customerid		=req.param("customerid");
	var status			=req.param("status");
	if(wishid!=null){
		condition ="wish_id="+wishid;
	}
	if(companyid!=null){
		if(condition === ""){
			condition="company_id='"+companyid+"'";
		}else {
			condition=condition+" and company_id='"+companyid+"'";
		}
	}
	if(productid!=null){
		if(condition === ""){
			condition="product_id='"+productid+"'";
		}else {
			condition=condition+" and product_id='"+productid+"'";
		}
	}
	if(customerid!=null){
		if(condition === ""){
			condition="customer_id='"+customerid+"'";
		}else {
			condition=condition+" and customer_id='"+customerid+"'";
		}
	}
	if(status!=null){
		if(condition === ""){
			condition="status='"+status+"'";
		}else {
			condition=condition+" and status='"+status+"'";
		}
	}
	
	wishorderlist.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getWishorderList>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= false;
			response.data	 	= "";
			res.send(response);
		} else{
			
			log.info(filename+'>>getWishorderList>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>>getWishorderList>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
}

//To  Save/Update Wishorder List Details
exports.saveWishorderList = function(req, res){	
	var response = {
					 status	: Boolean,
					 message : String,
					 data	: String
					};	
	var wishlist = {
					wish_id					: req.param("wishid"),
					company_id 				: req.param("companyid"),
					customer_id 			: req.param("customerid"),
					product_id 				: req.param("productid"),
					status 					: req.param("status"),
					rating 					: req.param("rating")
				   };							
	
	if(req.param('wishid')!=null){
	
		wishorderlist.upsert(wishlist)
		.then(function(data){						
			log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTREMOVESUCCESS);
			response.message = appmsg.WISHLISTREMOVESUCCESS;
			response.status  = true;
			res.send(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
	} else{	
		
		wishorderlist.findOne({where : {customer_id : wishlist.customer_id, product_id : wishlist.product_id, company_id : wishlist.company_id, status : 'Active'}})
		.then(function(d){
			if(d){
				log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTALREADYSAVESUCCESS);
				response.message = appmsg.WISHLISTALREADYSAVESUCCESS;
				response.status  = false;
				response.wishid  = d.wish_id;
				res.send(response);
			} else{
				wishorderlist.create(wishlist)
		    	.then(function(data){
				log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTSAVESUCCESS);
				response.message = appmsg.WISHLISTSAVESUCCESS;
				response.status  = true;
				response.wishid  = data.wish_id;
				res.send(response);
			})
			.error(function(err){
				log.error(err);
				response.status  	= false;
				response.message 	= appmsg.INTERNALERRORMESSAGE;
				response.data  		= err;
				res.send(response);
			});	
			}
			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
		});
		
		
	}
}

//For Show wishlist products
exports.getWishList = function(req, res) {
	var status = null;
	if(req.param("status")!=null){
		status = req.param("status");
	}
	
	if(req.param("companyid")!=null&&req.param("customerid")!=null){
	sequelize.query("select  w.wish_id wishid,p.prod_name prodname ,p.prod_code prodcode,p.mrp mrp,w.rating rating," +
			" w.product_id productid,w.customer_id customerid," +
			"(select i.product_image from m_product_image i where i. prod_id = w.product_id LIMIT 1 ) productimage " +
			"from t_wishorder_list w,m_product p " +
			"where p.prod_id 		= w.product_id " +
			" and w.status like COALESCE('"+status+"','%')"+
			" and w.customer_id 	= "+req.param("customerid")+
			" and w.company_id 		= "+req.param("companyid"), { type: sequelize.QueryTypes.SELECT})

	.then(function(result) {
		if(result.length === 0){
			log.info(filename+'>> getWishList >> '+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = req.param("customerid");
			res.send(response);
		} else{
			log.info(filename+'>> getWishList >> '+'About '+result.length+' results.');		
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			res.send(response);
		}
	}).error(function(err){
			log.info(filename+'>> getWishList >> '+appmsg.INTERNALERRORMESSAGE);
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			res.send(response);
	});
	}else{
			log.info(filename+'>> getWishList >> '+appmsg.INTERNALERRORMESSAGE);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= req.param("customerid");
			res.send(response);
	}
};

