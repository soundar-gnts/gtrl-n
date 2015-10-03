
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
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
app.get('/users', user.list);

require('./routes/userRoutes.js')(app, server);

server.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});