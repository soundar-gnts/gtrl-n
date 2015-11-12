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

var appmsg			= require('../config/Message.js');
var sequelize		= require('../config/sequelize.js');

var path 			= require('path');
var filename		= path.basename(__filename);

// To get Wishorder List based on user param
var getWishorderList = function(condition, callback) {
	var response = {
		status	: Boolean,
		message : String,
		data	: String
	}
	
	wishorderlist.findAll({where : [condition]}).then(function(result) {
		if(result.length === 0){
			log.info(filename+'>>getWishorderList>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message 	= appmsg.LISTNOTFOUNDMESSAGE;
			response.status  	= true;
			response.data	 	= "";
			callback(response);
		} else{
			
			log.info(filename+'>>getWishorderList>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getWishorderList>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}

var saveWishorderList = function(wishlist, callback){
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(wishlist.wish_id != null){
		wishorderlist.upsert(wishlist)
		.then(function(data){						
			log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTREMOVESUCCESS);
			response.message = appmsg.WISHLISTREMOVESUCCESS;
			response.status  = true;
			response.data  		= wishlist.wish_id;
			callback(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	} else{
		wishorderlist.create(wishlist)
		.then(function(data){						
			log.info(filename+'>>saveWishorderList>>'+appmsg.WISHLISTREMOVESUCCESS);
			response.message = appmsg.WISHLISTREMOVESUCCESS;
			response.status  = true;
			response.data  		= data.wish_id;
			callback(response);			
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
	}
}

var deleteWishOrderList = function(condition, callback){
	log.info(fileName+'.deleteWishOrderList');
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}
	wishorderlist.destroy({where : [condition]})
	.then(function(data){
		
		if(data >= '1'){
			log.info(data+' Wishlist removed.');
			response.status  	= true;
			response.message 	= data+' Wishlist removed.';
			callback(response);
		} else{
			log.info('No Wishlist found.');
			response.status  	= false;
			response.message 	= 'No Wishlist found.';
			callback(response);
		}
		
	})
	.error(function(err){
		log.error(err);
		response.status  	= false;
		response.message 	= APPMSG.INTERNALERRORMESSAGE;
		response.data  		= err;
		callback(response);
	});
}
//To  Save/Update Wishorder List Details

var wishListAddOrRemove = function(wishlist, callback){
	log.info(filename+'>>wishListAddOrRemove>>');
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	console.log(wishlist)
	var condition="company_id = '"+wishlist.company_id+"'and product_id = '"+wishlist.product_id+"' and customer_id = '"+wishlist.customer_id+"' and status='Active'";
	getWishorderList(condition, function(result){
		if(result.status){
			
			if(result.data[0]){
				result.data[0].status = 'Inactive';
				console.log(result.data);
				saveWishorderList(result.data[0].dataValues, function(data){
					if(data.status){
						log.info(appmsg.WISHLISTREMOVESUCCESS);
						response.message = appmsg.WISHLISTREMOVESUCCESS;
						response.status  = true;
						callback(response);	
					} else{
						callback(data);
					}
				});
			} else{
				saveWishorderList(wishlist, function(data){
					if(data.status){
						log.info(appmsg.WISHLISTSAVESUCCESS);
						response.message = appmsg.WISHLISTSAVESUCCESS;
						response.status  = true;
						response.wishid  = data.data;
						callback(response);
					} else{
						callback(data);
					}
				});
			}
		} else{
			callback(result);
		}
	});
}


//For Show wishlist products
var getWishList = function(req, res) {
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
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
module.exports = {
		getWishorderList : getWishorderList,
		saveWishorderList : saveWishorderList,
		deleteWishOrderList : deleteWishOrderList,
		wishListAddOrRemove : wishListAddOrRemove,
		getWishList : getWishList
}
