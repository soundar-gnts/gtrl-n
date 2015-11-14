/**
 * @Filename 		: ProductService.js 
 * @Description 	: To write Business Logic for Product. 
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

var product 			= require('../models/Product.js');
var productspec 		= require('../models/ProductSpec.js');
var productimage 		= require('../models/ProductImage.js');
var productbrand 		= require('../models/ProdBrand.js');

var log 				= require('../config/logger').logger;
var appMsg				= require('../config/Message.js');
var response 			= {
							status	: Boolean,
							message : String,
							data	: String
							};

var appmsg				= require('../config/Message.js');

var path 				= require('path');
var filename			= path.basename(__filename);


var getProducts = function(condition, selectedAttributes, fetchAssociation, callback){
	var response = {
			status	: Boolean,
			message : String,
			data	: String
	}

	
	product.findAll({
		where				: [condition],
		include				: fetchAssociation,
		attributes			: selectedAttributes
	})
		.then(function(prodct){
			if(prodct.length == 0){
				log.info(appMsg.LISTNOTFOUNDMESSAGE);
				response.message = appMsg.LISTNOTFOUNDMESSAGE;
				response.status  = false;
				callback(response);
			} else{
				log.info('About '+prodct.length+' results.');
				response.status  	= true;
				response.message 	= 'About '+prodct.length+' results.';
				response.data 		= prodct;
				callback(response);
			}
		})
		.error(function(err){
			log.error(err);
			response.status  	= false;
			response.message 	= appMsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
		});
}

//For get product specification list
var getProductSpec=function(condition, callback){
	
	productspec.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductSpec>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			
			log.info(filename+'>>getProductSpec>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductSpec>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}
//for get products images
var getProductImages=function(condition, callback){
	
	productimage.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductImages>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			log.info(filename+'>>getProductImages>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductImages>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}

//for get products images
var getProductBrands=function(condition, callback){
	
	productbrand.findAll({where : [condition]}).then(function(result){
		if(result.length === 0){
			log.info(filename+'>>getProductBrands>>'+appmsg.LISTNOTFOUNDMESSAGE);
			response.message = appmsg.LISTNOTFOUNDMESSAGE;
			response.status  = false;
			response.data	 = "";
			callback(response);
		} else{
			log.info(filename+'>>getProductBrands>>'+'About '+result.length+' results.');
			response.status  	= true;
			response.message 	= 'About '+result.length+' results.';
			response.data 		= result;
			callback(response);
		}
	}).error(function(err){
			log.info(filename+'>>getProductBrands>>');
			log.error(err);
			response.status  	= false;
			response.message 	= appmsg.INTERNALERRORMESSAGE;
			response.data  		= err;
			callback(response);
	});
}

var saveOrUpdateProduct = function(productObj, callback){
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(productObj.wish_id != null){
		product.upsert(productObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProduct>>'+appmsg.PRODUCTEDITSUCCESS);
			response.message = appmsg.PRODUCTEDITSUCCESS;
			response.status  = true;
			response.data  		= productObj.wish_id;
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
		product.create(productObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProduct>>'+appmsg.PRODUCTSAVESUCCESS);
			response.message = appmsg.PRODUCTSAVESUCCESS;
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

var saveOrUpdateProductSpec = function(productspecObj, callback){
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(productspecObj.prod_spec_id != null){
		productspec.upsert(productspecObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductSpec>>'+appmsg.PRODUCTSPECEDITSUCCESS);
			response.message = appmsg.PRODUCTSPECEDITSUCCESS;
			response.status  = true;
			response.data  		= productspecObj.prod_spec_id;
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
		productspec.create(productspecObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductSpec>>'+appmsg.PRODUCTSPECSAVESUCCESS);
			response.message = appmsg.PRODUCTSPECSAVESUCCESS;
			response.status  = true;
			response.data  		= data.prod_spec_id;
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

var saveOrUpdateProductImage = function(productimageObj, callback){
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(productimageObj.product_image_id != null){
		productimage.upsert(productimageObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductImage>>'+appmsg.PRODUCTIMAGEEDITSUCCESS);
			response.message = appmsg.PRODUCTIMAGEEDITSUCCESS;
			response.status  = true;
			response.data  		= productimageObj.product_image_id;
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
		productimage.create(productimageObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductImage>>'+appmsg.PRODUCTIMAGESAVESUCCESS);
			response.message = appmsg.PRODUCTIMAGESAVESUCCESS;
			response.status  = true;
			response.data  		= data.product_image_id;
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

var saveOrUpdateProductBrand = function(productbrandObj, callback){
	var response = {
			 status	: Boolean,
			 message : String,
			 data	: String
		}
	if(productbrandObj.prod_brand_id != null){
		productbrand.upsert(productbrandObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductBrand>>'+appmsg.PRODUCTBRANDEDITSUCCESS);
			response.message = appmsg.PRODUCTBRANDEDITSUCCESS;
			response.status  = true;
			response.data  		= wishlist.prod_brand_id;
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
		productbrand.create(productbrandObj)
		.then(function(data){						
			log.info(filename+'>>saveOrUpdateProductBrand>>'+appmsg.PRODUCTBRANDSAVESUCCESS);
			response.message = appmsg.PRODUCTBRANDSAVESUCCESS;
			response.status  = true;
			response.data  		= data.prod_brand_id;
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
//To save product details
var saveProductDetails = function(product, prodSpeclist, prodImagelist, prodBrandlist, callback) {
	
	saveOrUpdateProduct(product, function(p){
		if(p.status){
			if(prodSpeclist.length != null)
				prodSpeclist.forEach(function(prodSpec){
					saveOrUpdateProductSpec(prodSpec, function(result){
						log.info(result);
					});
				});
			
			if(prodImagelist.length != null)
				prodImagelist.forEach(function(prodImage){
					saveOrUpdateProductImage(prodImage, function(result){
						log.info(result);
					});
				});
			
			if(prodBrandlist.length != null)
				prodBrandlist.forEach(function(prodBrand){
					saveOrUpdateProductBrand(prodBrand, function(result){
						log.info(result);
					});
				});
			
			callback(p);
		} else{
			callback(p);
		}
	});
}

module.exports = {
		getProducts : getProducts,
		getProductSpec : getProductSpec,
		getProductImages : getProductImages,
		getProductBrands : getProductBrands,
		saveOrUpdateProduct : saveOrUpdateProduct,
		saveOrUpdateProductSpec : saveOrUpdateProductSpec,
		saveOrUpdateProductImage : saveOrUpdateProductImage,
		saveOrUpdateProductBrand : saveOrUpdateProductBrand,
		saveProductDetails : saveProductDetails
		
}