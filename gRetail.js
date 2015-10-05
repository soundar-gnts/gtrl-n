/**
 * File Name	:	gRetail.js
 * Description	:	Configuration file.
 * Author		:	Haris K.A.
 * Date			:	October 03, 2015
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

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');

var app = express(); 
var server = http.createServer(app)

// all environments
app.set('port', process.env.PORT || 2000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
require('./routes/userRoutes.js')(app, server);
require('./routes/CompanyRoutes.js')(app, server);
require('./routes/ManufacturerRoutes.js')(app, server);
require('./routes/BrandRoutes.js')(app, server);

server.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});