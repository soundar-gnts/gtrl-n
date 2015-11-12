/**
 * @Filename	:	WishorderListRoutes.js
 * @Description	:	To write Routing middlewares For Wishorder List table.
 * @Author		:	SOUNDAR C
 * @Date		:	October 17, 2015
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
var wishorderListService = require('../services/WishorderListService.js');
module.exports = function(app, server) {
	app.post('/getwishorderlist', getWishorderList);
	app.post('/savewishorderlist', saveWishorderList);
	app.post('/getwishlist', wishorderListService.getWishList);
	function getWishorderList(req, res){
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
		
		wishorderListService.getWishorderList(condition, function(response){
			res.send(response);
		});
	}
	
	function saveWishorderList(req, res){
		var wishlist = {
					wish_id					: req.param("wishid"),
					company_id 				: req.param("companyid"),
					customer_id 			: req.param("customerid"),
					product_id 				: req.param("productid"),
					status 					: req.param("status"),
					rating 					: req.param("rating")
				}
		wishorderListService.wishListAddOrRemove(wishlist, function(response){
			res.send(response);
		});
	}
}

