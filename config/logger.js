/**
 * File Name	:	logger.js
 * Description	:	A logger object setting file to setup log file for the application.
 * Author		:	Haris K.A.
 * Date			:	October 05, 2015
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

var logger = require('winston'); 										// used npm package winston
logger.add(logger.transports.File, { filename: './log/gRetail.log' });	// set up a Logfile
exports.logger=logger;




