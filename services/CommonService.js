/**
 * File Name	:	CommonService.js
 * Description	:	Common functionalities.
 * Author		:	Haris K.A.
 * Date			:	October 14, 2015
 * 
 * Copyright (C) 2015 GNTS Technologies Pvt. Ltd. 
 * All rights reserved.   
 *
 * This software is the confidential and proprietary information 
 * of GNTS Technologies Pvt. Ltd.
 * 
 * Version       Date           	Modified By             Remarks
 * 0.1         October 03, 2015      Saranya G
 * 
 */


//generate OTP
exports.generateOTP = function(digit){
	return(Math.random().toString().substr(2,digit));
}