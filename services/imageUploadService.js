/**
 * File Name	:	imageUploadService.js
 * Description	:	Handling image upload functionality.
 * Author		:	Haris K.A.
 * Date			:	October 06, 2015
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

var log = require('../config/logger').logger;
var fs = require("fs");

exports.imageUpload = function(path, filename){
	fs.readFile( path, function (err, data) {
		fs.writeFile(filename, data, function (err) {
			if(err){
				log.error(err);
				
			} else{
				log.info('Image Uploaded Successfully');
			}
		});
	});
}